"use client";
import React, { ReactElement, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./MainApp.module.css";
import PostList from "./MainPost/PostList";
import BoardAPI from "@/lib/api/BoardAPI";
import { HotPost, readPostType } from "@/lib/type/postType";
import { GetAPI } from "@/app/fetchAPI";
import BoardList from "./Header/BoardList";
import { FaHotjar } from "react-icons/fa";
import { Router } from "next/router";
export default function MainApp(): ReactElement {
  const [article, setArticle] = useState<HotPost>();
  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardId = parts[parts.length - 1];
  let boardLink: string;
  let boardLink2: string;
  let boardLink3: string;

  const gethotEvent = () => {
    BoardAPI.GethotPost()
      .then((res) => {
        console.info(res);
        setArticle(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  if (article && article?.list[0].type === "자유 게시판") {
    boardLink = `./Free`;
  }
  if (article && article?.list[0].type === "QnA 게시판") {
    boardLink = `./QnA`;
  }
  if (article && article?.list[0].type === "지식 게시판") {
    boardLink = `./Knowledge`;
  }
  if (article && article?.list[0].type === "취업/진로 게시판") {
    boardLink = `./Career`;
  }
  if (article && article?.list[0].type === "홍보 게시판") {
    boardLink = `./Promotion`;
  }
  if (article && article?.list[0].type === "취미 게시판") {
    boardLink = `./Hobby`;
  }
  
  if (article && article?.list[1].type === "자유 게시판") {
    boardLink2 = `./Free`;
  }
  if (article && article?.list[1].type === "QnA 게시판") {
    boardLink2 = `./QnA`;
  }
  if (article && article?.list[1].type === "지식 게시판") {
    boardLink2 = `./Knowledge`;
  }
  if (article && article?.list[1].type === "취업/진로 게시판") {
    boardLink2 = `./Career`;
  }
  if (article && article?.list[1].type === "홍보 게시판") {
    boardLink2 = `./Promotion`;
  }
  if (article && article?.list[1].type === "취미 게시판") {
    boardLink2 = `./Hobby`;
  }
  
  if (article && article?.list[2].type === "자유 게시판") {
    boardLink3 = `./Free`;
  }
  if (article && article?.list[2].type === "QnA 게시판") {
    boardLink3 = `./QnA`;
  }
  if (article && article?.list[2].type === "지식 게시판") {
    boardLink3 = `./Knowledge`;
  }
  if (article && article?.list[2].type === "취업/진로 게시판") {
    boardLink3 = `./Career`;
  }
  if (article && article?.list[2].type === "홍보 게시판") {
    boardLink3 = `./Promotion`;
  }
  if (article && article?.list[2].type === "취미 게시판") {
    boardLink3 = `./Hobby`;
  }
  useEffect(() => {
    gethotEvent();
  }, []);
  const router = useRouter();
  console.log(article);
  return (
    <div className={styles.mainLayout}>
      <div className={styles.hot}>
        <h3 className={styles.hoticons}>
          <FaHotjar color="red" /> 핫 게시물
        </h3>
        <div className={styles.hotPost}>
          <div
            className={styles.hot1}
            onClick={() =>
              router.push(
                `/Main/${boardLink}/${article && article.list[0].boardId}`
              )
            }
          >
            {article && article.list[0].title.length > 20
              ? `${article.list[0].title.slice(0, 15)}...`
              : article && article.list[0].title}
          </div>

          <div
            className={styles.hot2}
            onClick={() =>
              router.push(
                `/Main/${boardLink2}/${article && article.list[1].boardId}`
              )
            }
          >
            {article && article.list[1].title.length > 20
              ? `${article.list[1].title.slice(0, 15)}...`
              : article && article.list[1].title}
          </div>
          <div
            className={styles.hot3}
            onClick={() =>
              router.push(
                `/Main/${boardLink3}/${article && article.list[2].boardId}`
              )
            }
          >
            {article && article.list[2].title.length > 20
              ? `${article.list[2].title.slice(0, 15)}...`
              : article && article.list[2].title}
          </div>
        </div>
      </div>

      <div className={styles.box1}>
        <PostList boardName="자유" />
        <PostList boardName="지식" />
        <PostList boardName="QnA" />
      </div>

      <div className={styles.box2}>
        <PostList boardName="홍보" />

        <PostList boardName="취업/진로" />

        <PostList boardName="취미" />
      </div>
    </div>
  );
}
