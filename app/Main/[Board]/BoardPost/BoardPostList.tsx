"use client";
import React from "react";
import { useEffect, useState } from "react";

import BoardPost from "./BoardPost";
import styles from "./BoardPostList.module.css";
import { BoardListItem } from "@/lib/type/boardType";
import BoardAPI from "@/lib/api/BoardAPI";

type PropsType = {
  SortType: string;
  boardType: number;
  boardPage: number;
  boardLink: string;
};

function BoardPostList({
  SortType,
  boardType,
  boardPage,
  boardLink,
}: PropsType) {
  const [articles, setArticles] = useState<BoardListItem>();
  let sort: number = 1;
  if (SortType === "최신순") sort = 1;
  if (SortType === "추천순") sort = 2;

  useEffect(() => {
    BoardAPI.listArticle(boardType, boardPage, 10, 10, sort)
      .then((res) => setArticles(res.data))
      .catch((error) => console.log("error", error));
  }, [boardPage, sort]);

  return (
    <div className={styles.BoardPostList}>
      {articles &&
        articles.list.map((content) => (
          <BoardPost
            content={content}
            boardLink={boardLink}
            key={content.boardId}
          />
        ))}
    </div>
  );
}

export default BoardPostList;
