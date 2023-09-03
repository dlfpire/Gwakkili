"use client";
import React, { useEffect, useState } from "react";

import BoardAPI from "@/lib/api/BoardAPI";

import Post from "./Post";
import Styles from "./PostList.module.css";
import { BoardListItem } from "@/lib/type/boardType";
import { BoardInfo } from "@/lib/Function/boardFunction";
import { useRouter } from "next/navigation";
type BoardName = {
  boardName: string;
};

function PostList({ boardName }: BoardName) {
  const [articles, setArticles] = useState<BoardListItem>();
  const router = useRouter();
  
  let boardType: number = 0;
  
  let boardLink: string = BoardInfo.getBoardName(boardName);

  if (boardName === "자유") {boardLink = `./Free`; boardType = 1;}
  if (boardName === "QnA") {boardLink = `./QnA`;boardType = 2;}
  if (boardName === "지식") {boardLink = `./Knowledge`;boardType = 3;}
  if (boardName === "취업/진로") {boardLink = `./Career`;boardType = 4;}
  if (boardName === "홍보") {boardLink = `./Promotion`;boardType = 5;}
  if (boardName === "취미") {boardLink = `./Hobby`;boardType = 6;}

  useEffect(() => {
    BoardAPI.listArticle(boardType, 1, 5, 5, 1)
      .then((data) => setArticles(data.data))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {}, []);

  return (
    <div className={Styles.postList}>
      <div className={Styles.boardTitle} onClick={()=>router.push(boardLink)}>{boardName}</div>
      {articles && articles.list.map((content) => (
        <Post content={content} key={content.boardId} boardLink={boardLink} />
      ))}
    </div>
  );
}

export default PostList;
