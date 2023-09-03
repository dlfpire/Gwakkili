import React, { useRef, useState } from "react";

import styles from "./Comment.module.css";
import CommentAPi from "@/lib/api/CommentAPI";
import UserStorage from "@/lib/storage/UserStorage";

type PropsType = {
  boardId: number;
  getPost: () => void;
};

const Comment = ({ boardId, getPost }: PropsType) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const UserData = UserStorage.getUserProfile();
  const resizeTextEvent = () => {
    textRef.current!.style.height = "auto";
    textRef.current!.style.height = textRef.current!.scrollHeight + "px";
  };

  const commentPostEvent = () => {
    if (textRef.current?.value) {
      const anony = anonymous ? 1 : 0;
      CommentAPi.commentPost(boardId, textRef.current.value, anony)
        .then(() => {
          textRef.current!.value = "";
          getPost();
        })
        .catch((err) => console.log(err));
    } else {
      alert("댓글 내용을 입력하세요");
    }
  };

  return (
    <div className={styles.commentBox}>
      <div className={styles.commentInfo}>
        <h3 style={{ margin: 0 }}>{UserData?.nickname}</h3>
        <div className={styles.anony}>
          익명
          <input type="checkbox" onChange={() => setAnonymous(!anonymous)} />
        </div>
      </div>
      <div className={styles.commentInput}>
        <textarea
          ref={textRef}
          className={styles.textBox}
          placeholder="댓글을 작성하세요"
          onChange={resizeTextEvent}
          maxLength={255}
          rows={1}
        />
        <button className={styles.commentBtn} onClick={commentPostEvent}>
          댓글 쓰기
        </button>
      </div>
    </div>
  );
};

export default Comment;
