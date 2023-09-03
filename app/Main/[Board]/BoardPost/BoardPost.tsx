"use client";
import React from "react";
import { FiThumbsUp } from "react-icons/fi";
import { MdOutlineComment } from "react-icons/md";
import { BoardDetail } from "@/lib/type/boardType";
import { useRouter } from "next/navigation";

import Styles from "./BoardPost.module.css";

type PropsType = {
  content: BoardDetail;
  boardLink: string;
};
function BoardPost({ content, boardLink }: PropsType) {
  const router = useRouter();

  const titleClickEvent = (boardId: number) => {
    router.push(`/Main/${boardLink}/${boardId}`);
  };

  const detailDate = (a: string) => {
    const milliSeconds = +new Date() - +new Date(a);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  return (
    <div
      className={Styles.post}
      onClick={() => {
        titleClickEvent(content.boardId ? content.boardId : 1);
      }}
    >
      <div className={Styles.postUser}>
        <div className={Styles.userLeft}>
          <p className={Styles.title}>{content.title}</p>
          <p className={Styles.nickname}>{content.userNickname}</p>
          <p style={{ fontSize: ".6rem", opacity: ".75" }}>
            {detailDate(content.createdAt)}
          </p>
        </div>

        <div className={Styles.cnt}>
          <FiThumbsUp />
          {content.likeCnt}
          <MdOutlineComment size="1rem" /> {content.commentCnt}
        </div>
      </div>

      <p className={Styles.content}>{content.body}</p>

      <div className={Styles.postHash}>
        {content.tags &&
          content.tags.map((item, i) => (
            <p className={Styles.hashTag} key={i}>{`#${item}`}</p>
          ))}
      </div>
    </div>
  );
}

export default BoardPost;
