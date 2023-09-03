"use client";

import React, { useEffect, useState } from "react";
import UserAPI from "@/lib/api/BoardAPI";
import { useRouter, useSearchParams } from "next/navigation";
import "./MyChat.css";

export default function MyChat() {
  const [myChatData, setMyChatData] = useState<
    {
      board_id: number;
      board_title: string;
      board_type: string;
      boardtype_id: number;
      body: string;
      nickname: string;
      created_at: string;
      id: number;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordSize = 8;

  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());
  const id = queryParams.get("id");

  useEffect(() => {
    loadMyChatData(currentPage, Number(id));
  }, [currentPage, id]);
  //데이터 가져오가ㅣ
  const loadMyChatData = (page: number, userId: number) => {
    UserAPI.MyChatLoad(page, recordSize, userId)
      .then((response) => {
        console.log(response);
        setMyChatData(response.data.list);
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
    const boardPath = getBoardPath(comment.board_type);
    if (boardPath) {
      router.replace(`/Main/${boardPath}/${comment.board_id}`);
    }
  };
  return (
    <div className="MyChatCSS">
      <div className="Myheader">
        <header>
          <h1>내가 작성한 댓글</h1>
        </header>
      </div>
      <div className="MyChatnav">
        <nav>
          <label>과끼리에서 직접 작성한 댓글들의 기록을 보여줍니다.</label>
        </nav>
      </div>

      <div className="MySelect">
        <section>
          <hr />
          <ul>
            {myChatData.map((comment) => (
              <li key={comment.id} onClick={() => handleCommentClick(comment)}>
                <div className="comment-box">
                  <p className="comment-type">{comment.board_type}</p>
                  <p className="comment-title">제목: {comment.board_title}</p>
                  <p className="comment-date">작성일자: {comment.created_at}</p>
                  <p className="comment-body">내가 쓴 댓글: {comment.body}</p>
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
