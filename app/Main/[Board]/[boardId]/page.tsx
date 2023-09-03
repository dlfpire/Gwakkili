"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./BoardId.module.css";
import ErrorPage from "next/error";
import { useEffect, useState } from "react";
import BoardAPI from "@/lib/api/BoardAPI";
import CommentAPI from "@/lib/api/CommentAPI";
import { readPostType } from "@/lib/type/postType";
import { MdThumbUp, MdOutlineComment } from "react-icons/md";
import { FiThumbsUp } from "react-icons/fi";
import { AiTwotoneAlert } from "react-icons/ai";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import Comment from "./Comment";
import CommentList from "./CommentList";
import { CommentType } from "@/lib/type/CommentType";
import { BoardInfo } from "@/lib/Function/boardFunction";
import Image from "next/image";

const page = () => {
  const router = useRouter();
  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardId = parts[parts.length - 1];
  const [article, setArticle] = useState<readPostType>();
  const [commentList, setCommentList] = useState<CommentType>();

  const boardLink = parts[parts.length - 2];

  let boardName: string = BoardInfo.getBoardName(boardLink);
  let boardType: number = BoardInfo.getBoardId(boardLink);

  if (BoardInfo.URL_Check(boardLink)) return <ErrorPage statusCode={404} />;

  const getComment = () => {
    if (article) {
      CommentAPI.readComment(parseInt(boardId), article.board.commentCnt)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const getPost = () => {
    BoardAPI.readPost(parseInt(boardId))
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getComment();
  }, [article]);

  console.log(article);

  const likeUpEvent = () => {
    BoardAPI.postLike(parseInt(boardId))
      .then(() => {
        alert("추천되었습니다.");
        BoardAPI.readPost(parseInt(boardId))
          .then((res) => {
            setArticle(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => alert(err));
  };

  const reportEvent = () => {
    if (window.confirm("정말 신고하시겠습니까?")) {
      BoardAPI.reportPost(parseInt(boardId))
        .then(() => {
          alert("신고되었습니다");
        })
        .catch((err) => alert(err));
    }
  };
  const DeleteEvent = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      BoardAPI.PostDelete(parseInt(boardId)).then(() => {
        alert("글을 삭제되었습니다");
        router.push(`/Main/${boardLink}`)
      });
    }
  };

  const CollectonEvent = () => {
    router.push(`/Main/${boardLink}/${boardId}/Update`);
  };

  const starEvent = () => {
    BoardAPI.starPost(boardId)
      .then(() => {
        alert("북마크 했습니다");
        getPost();
      })
      .catch((err) => alert("이미 북마크된 게시물입니다"));
  };

  return (
    <div className={styles.layout}>
      <div>
        <div className={styles.boardss}>
          <div className={styles.boardernm}>{boardName}</div>
        </div>

        <div className={styles.postman}>
          <div className={styles.timeset} style={{ fontSize: ".7rem" }}>
            <div className={styles.content}>
              <div className={styles.title}>{article?.board.title}</div>
              <div className={styles.nicktime}>
                <h4> {article?.board.userNickname}</h4>
                <p>
                  {article && BoardInfo.GetDetailDate(article.board.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <button className={styles.bTn2} onClick={likeUpEvent}>
                {article?.board.isLike ? <MdThumbUp /> : <FiThumbsUp />}
              </button>
              <button className={styles.starPost} onClick={starEvent}>
                {article?.board.isBookmarked ? (
                  <IoBookmarkSharp />
                ) : (
                  <IoBookmarkOutline />
                )}
              </button>
              <button
                className={styles.bTn1}
                onClick={reportEvent}
                disabled={article?.board.isMyBoard}
              >
                <AiTwotoneAlert />
              </button>
              {article && article.board.isMyBoard && (
                <div>
                  <button className={styles.fix} onClick={CollectonEvent}>
                    수정
                  </button>
                  <button className={styles.delete} onClick={DeleteEvent}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.boardbody}>
            {article &&
              article.board.imagesUrl &&
              article.board.imagesUrl?.length > 0 &&
              article.board.imagesUrl.map((item, i) => (
                <div className={styles.imgbox}>
                  <Image src={item} alt="" fill key={item + i} />
                </div>
              ))}
            {article?.board.body}
          </div>

          <div className={styles.hashtag}>
            {article?.board.tags.map((item, index) => (
              <p key={index}>#{item.name}</p>
            ))}
          </div>
        </div>

        {
          <div className={styles.messag}>
            <div className={styles.postman123}>
              <div className={styles.likeIcon}>
                {article?.board.isLike ? <MdThumbUp /> : <FiThumbsUp />}
                {article?.board.likeCnt}
              </div>
              <MdOutlineComment /> {article && article?.board.commentCnt}
            </div>
            <Comment boardId={parseInt(boardId)} getPost={getPost} />
            {article && commentList && (
              <CommentList
                commentList={commentList.list}
                boardId={article.board.id}
                commentCnt={article.board.commentCnt}
                getComment={getPost}
              />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default page;
