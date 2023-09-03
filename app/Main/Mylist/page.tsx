"use client";

import React, { useEffect, useState } from "react";
import UserAPI from "@/lib/api/BoardAPI";
import { useRouter, useSearchParams } from "next/navigation";
import "./Mylist.css";

export default function Mylist() {
  const [mylistData, setMyListData] = useState<
    {
      body: string;
      category_id: number;
      comment_cnt: number;
      created_at: string;
      id: number;
      like_cnt: number;
      report_cnt: number;
      title: string;
      type: string;
      user_id: number;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordSize = 8;

  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());
  const id = queryParams.get("id");
  console.log("id:", id);

  console.log(id);
  useEffect(() => {
    if (id !== null) {
      // id 값이 null이 아닐 경우에만 데이터 요청
      loadMylistData(currentPage, Number(id));
    }
  }, [currentPage, id]); // targetUserId는 제거

  //데이터 가져오가
  const loadMylistData = (page: number, userId: number) => {
    setMyListData([]);
    UserAPI.MylistLoad(page, recordSize, userId) // userId를 활용
      .then((response) => {
        console.log(response);
        setMyListData(response.data.list);
      })
      .catch((error) => {
        console.error("채팅 데이터를 가져오는 중 오류 발생:", error);
      });
  };
  //페이지이동
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  //클릭시 페이지이동
  const getBoardPath = (board_Type: string) => {
    // 게시판 타입에 따라 URL 경로를 반환
    switch (board_Type) {
      case "자유 게시판":
        return "Free";
      case "지식 게시판":
        return "Knowledge";
      case "홍보 게시판":
        return "Promotion";
      case "취업/진로 게시판":
        return "Career";
      case "취미 게시판":
        return "Hobby";
      case "Q&A 게시판":
        return "QnA";
      default:
        return "";
    }
  };

  const router = useRouter();
  const handleCommentClick = (comment: any) => {
    console.log(comment);
    // 댓글을 클릭하면 해당 보드의 ID와 타입에 따라 적절한 경로로 이동
    const boardPath = getBoardPath(comment.type);
    if (boardPath) {
      router.replace(`/Main/${boardPath}/${comment.id}`);
    }
  };
  return (
    <div className="MylistCSS">
      <div className="Myheader">
        <header>
          <h1>나의 게시글</h1>
        </header>
      </div>
      <div className="Mylistnav">
        <nav>
          <label>과끼리에서 직접 작성한 게시물들을 보여줍니다.</label>
        </nav>
      </div>

      <div className="MySelect">
        <section>
          <hr />
          <ul>
            {mylistData.map((comment) => (
              <li key={comment.id} onClick={() => handleCommentClick(comment)}>
                <div className="comment-box">
                  <p className="comment-type">{comment.type}</p>
                  <p className="comment-title">제목: {comment.title}</p>
                  <p className="comment-date">작성일자: {comment.created_at}</p>
                  <p className="comment-body">내용: {comment.body}</p>
                  <p className="comment-like">좋아요 수 :{comment.like_cnt}</p>
                  <p className="comment-report">
                    신고 수 :{comment.report_cnt}
                  </p>
                  <p className="comment-cnt">댓글 수 :{comment.comment_cnt}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagediv">
            <button
              className="pagebutton1"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전 페이지
            </button>
            <button
              className="pagebutton"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음 페이지
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
