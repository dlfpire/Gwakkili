"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Search.module.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import BoardPost from "../BoardPost/BoardPost";
import SearchApi from "@/lib/api/SearchApi";
import { BoardListItem } from "@/lib/type/boardType";

function Searchpage() {
  const search = useSearchParams();
  const query = search.get("search");
  const [articles, setArticles] = useState<BoardListItem>();
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardLink = parts[parts.length - 2];
  var boardType: number;

  if (boardLink === "Free") {
    boardType = 1;
  } else if (boardLink === "Knowledge") {
    boardType = 3;
  } else if (boardLink === "QnA") {
    boardType = 2;
  } else if (boardLink === "Promotion") {
    boardType = 5;
  } else if (boardLink === "Career") {
    boardType = 4;
  } else if (boardLink === "Hobby") {
    boardType = 6;
  }

  useEffect(() => {
    setIsLoading(true);

    if (query) {
      SearchApi.listArticle(query, page, 20, boardType)
        .then((res) => {
          setArticles(res.data);
          setMaxPage(Math.floor(res.data.list.length / 20) + 1);
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false);
        });
    }
    setPage(1);
  }, [query]);

  const pageDownEvent = () => {
    if (page > 1) setPage(page - 1);
  };
  const pageUpEvent = () => {
    if (maxPage && page < maxPage) {
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.boardLayout}>
      <div className={styles.molla}>
        {query ? `'${query}'` : "검색어"} 의 검색결과
      </div>

      {isLoading ? (
        <div className={styles.searchnone}></div>
      ) : articles && articles?.list.length > 0 ? (
        <>
          <div className={styles.postMenu}>
            <div className={styles.boardPage}>
              <p>
                {page} / {Math.floor(articles.list.length / 20) + 1}
              </p>
              <button className={styles.pageBtn} onClick={pageDownEvent}>
                <MdArrowBack size="1rem" />
              </button>
              <button className={styles.pageBtn} onClick={pageUpEvent}>
                <MdArrowForward size="1rem" />
              </button>
            </div>
          </div>
          <div className={styles.postList}>
            {articles.list
              .slice(20 * (page - 1), 20 * page)
              .map((content, i) => (
                <BoardPost content={content} boardLink={boardLink} key={i} />
              ))}
          </div>
          <div className={styles.postPage}>
            <div onClick={pageDownEvent} className={styles.pageIcon}>
              <MdArrowBack size="1.5rem" />
              Previous
            </div>

            <div>
              {page} / {Math.floor(articles.list.length / 20) + 1}
            </div>
            <div onClick={pageUpEvent} className={styles.pageIcon}>
              Next
              <MdArrowForward size="1.5rem" />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.searchnone}>
          '{query}' 에 대한 검색결과가 없음
        </div>
      )}
    </div>
  );
}

export default Searchpage;
