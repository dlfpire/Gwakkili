"use client";

import React from "react";
import { FiThumbsUp } from "react-icons/fi";
import { MdOutlineComment } from "react-icons/md";
import Styles from "./Post.module.css";
import { BoardDetail } from "@/lib/type/boardType";
import { useRouter } from "next/navigation";
import { BoardInfo } from "@/lib/Function/boardFunction";

function Post({ content, boardLink }: { content: BoardDetail,boardLink : string }) {
  const router = useRouter();
  


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
    <div className={Styles.post} onClick={() => router.push(`/Main/${boardLink}/${content.boardId}`)}>
      <div className={Styles.postUser}>
        <div className={Styles.userLeft}>
          <p>{content.userNickname} </p>
          <p>{detailDate(content.createdAt)}</p>
        </div>
        <div className={Styles.postInfo}>
          <FiThumbsUp />
          {content.likeCnt}
          <MdOutlineComment size="1rem" /> {content.commentCnt}
        </div>
      </div>
      <p className={Styles.postContent}>
        {content.title.length > 10
  ? `${content.title.slice(0,10)}...`
  : content.title}
  
  </p>
    </div>

  )
}

export default Post;
