"use client";

import UserAPI from "@/lib/api/BoardAPI";
import { useState, useEffect } from "react";
import "./Mybook.css";
import { useRouter } from "next/navigation";
import { IoBookmarkOutline } from "react-icons/io5";
import UserStorage from "@/lib/storage/UserStorage";
import { FiX } from "react-icons/fi";
import BoardAPI from "@/lib/api/BoardAPI";
export default function BookMark() {
  const [mybook, setMyBook] = useState({ list: [] }); // 초기화

  useEffect(() => {
    UserAPI.Getbookmark().then((res) => {
      setMyBook(res.data), console.log(res);
    });
  }, []);
  const router = useRouter();
  console.log("마이북", mybook);

  const getBoardPath = (type: string) => {
    // 게시판 타입에 따라 URL 경로를 반환
    switch (type) {
      case "1":
        return "Free";
      case "2":
        return "Knowledge";
      case "4":
        return "Promotion";
      case "5":
        return "Career";
      case "6":
        return "Hobby";
      case "3":
        return "QnA";
      default:
        return "";
    }
  };
  const hanldecommitClick = (comment: any) => {
    const boardPath = getBoardPath(comment.type);
    if (boardPath) {
      router.replace(`/Main/${boardPath}/${comment.boardId}`);
    }
  };

  const delBtn = (comment: any) => {
    BoardAPI.Delbookmark(parseInt(comment.boardId))
      .then(() => {
        alert("삭제되었습니다");
        UserAPI.Getbookmark().then((res) => {
          setMyBook(res.data);
          console.log(res);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bookCSS">
      <div className="Myheader">
        <header>
          <h1>나의 북마크</h1>
        </header>
      </div>
      <div className="MyBooknav">
        <nav>
          <label>나의 북마크를 보여줍니다.</label>
        </nav>
      </div>

      <div className="Mybook">
        <section>
          <hr />
          <div className="grid-container">
            {mybook.list.map((item, index) => (
              <div
                key={item.id}
                className="grid-item"
                // 매개변수 전달
              >
                <div className="book-box">
                  <button className="deleteBtn" onClick={() => delBtn(item)}>
                    <FiX />
                  </button>
                  <p
                    className="book-title"
                    onClick={() => hanldecommitClick(item)}
                  >
                    <IoBookmarkOutline color="blue" />
                    {item.boardTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
