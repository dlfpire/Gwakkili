import { CommentDetailType } from "@/lib/type/CommentType";
import React, { useState, useRef } from "react";
import styles from "./ReplyDetail.module.css";
import {
  FiCornerDownRight,
  FiHeart,
  FiMoreHorizontal,
  FiX,
} from "react-icons/fi";
import CommentAPI from "@/lib/api/CommentAPI";

type PropsType = {
  content: CommentDetailType;
  getComment: () => void;
};
const reply = ({ content, getComment }: PropsType) => {
  const detailBody = content.body.split("\n");
  const [more, setMore] = useState<boolean>(false);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextEvent = () => {
    textRef.current!.style.height = "auto";
    textRef.current!.style.height = textRef.current!.scrollHeight + "px";
  };

  const likeEvent = (id: number) => {
    CommentAPI.likeComment(id)
      .then(() => getComment())
      .catch((err) => console.log(err));
  };
  const delEvent = (id: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      CommentAPI.DeleteComment(id)
        .then(() => {
          alert("댓글이 삭제되었습니다.");
          getComment();
        })
        .catch((err) => console.log(err));
    }
  };
  const editEvent = () => {
    if (textRef.current?.value) {
      CommentAPI.editComment(content.id, textRef.current.value)
        .then(() => {
          setOnEdit(false);
          getComment();
        })
        .catch((err) => console.log(err));
    }
  };
  const reportEvent = () => {
    if (window.confirm("해당 댓글을 신고하시겠습니까?")) {
      CommentAPI.reportComment(content.id, 1)
        .then(() => getComment())
        .catch((err) => console.log(err));
    }
  };
  const ReplyEdit = () => {
    return (
      <div className={styles.replyEditbox}>
        <textarea
          ref={textRef}
          className={styles.replyText}
          defaultValue={content.body}
          onChange={resizeTextEvent}
          maxLength={255}
          rows={1}
        ></textarea>
        <div className={styles.editBtnBox}>
          <button
            onClick={() => {
              onEdit && editEvent();
            }}
            className={styles.commentBtn}
          >
            댓글 수정
          </button>
          <button
            onClick={() => {
              onEdit && setOnEdit(false);
            }}
            className={styles.cancelBtn}
          >
            취소
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.replyBox}>
      <p className={styles.replyLine}>
        <FiCornerDownRight />
      </p>
      {onEdit ? (
        <div>
          <div className={styles.replyUserInfo}>
            <h4 className={styles.userName}> {content.nickname}</h4>
            <p className={styles.date}>{content.time}</p>
          </div>
          <ReplyEdit />
        </div>
      ) : (
        <div className={styles.replyContent}>
          <div>
            <div className={styles.replyUserInfo}>
              <h4 className={styles.userName}> {content.nickname}</h4>
              <p className={styles.date}>{content.time}</p>
            </div>
            <p className={styles.detail}>
              {detailBody.map((item, i) => (
                <React.Fragment key={item + i}>
                  {item}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className={styles.btnbox}>
            <div className={styles.more}>
              <div
                className={`${styles.editbox} ${more ? styles.on : styles.off}`}
              >
                {content.isMyComment && (
                  <button
                    className={styles.btn}
                    onClick={() => {
                      setMore(!more);
                      setOnEdit(!onEdit);
                    }}
                  >
                    수정
                  </button>
                )}
                {content.isMyComment && (
                  <button
                    className={styles.btn}
                    onClick={() => delEvent(content.id)}
                  >
                    삭제
                  </button>
                )}
                <button className={styles.report} onClick={() => reportEvent()}>
                  신고
                </button>
              </div>
              {!more ? (
                <FiMoreHorizontal
                  className={styles.moreBtn}
                  onClick={() => {
                    setMore(!more);
                  }}
                />
              ) : (
                <FiX
                  className={styles.moreBtn}
                  onClick={() => {
                    setMore(!more);
                  }}
                />
              )}
            </div>
            <p className={styles.like}>
              <FiHeart
                onClick={() => likeEvent(content.id)}
                className={styles.likeBtn}
              />
              {content.like_cnt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default reply;
