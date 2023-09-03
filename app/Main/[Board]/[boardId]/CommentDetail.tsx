import React, { useRef, useState } from "react";
import { CommentDetailType } from "@/lib/type/CommentType";
import CommentAPI from "@/lib/api/CommentAPI";
import styles from "./CommentDetail.module.css";
import UserStorage from "@/lib/storage/UserStorage";
import {
  FiCornerDownRight,
  FiMoreHorizontal,
  FiX,
  FiHeart,
} from "react-icons/fi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ReplyDetail from "./ReplyDetail";

type PropsType = {
  content: CommentDetailType;
  replyList?: CommentDetailType[];
  boardId: number;
  getComment: () => void;
};

const CommentDetail = ({
  content,
  replyList,
  boardId,
  getComment,
}: PropsType) => {
  const [more, setMore] = useState<boolean>(false);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [onReplyList, setOnReplyList] = useState<boolean>(true);
  const UserData = UserStorage.getUserProfile();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const detailBody = content.body.split("\n");

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

  const replyEvent = () => {
    if (textRef.current?.value) {
      const anony = anonymous ? 1 : 0;
      CommentAPI.Reply(content.id, boardId, textRef.current.value, anony)
        .then(() => {
          getComment();
          setReply(false);
          onReplyList ? "" : setOnReplyList(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const CommentEdit = () => {
    return (
      <div className={styles.commentInput}>
        <textarea
          ref={textRef}
          className={`${styles.textBox} ${reply && styles.reply}`}
          defaultValue={`${onEdit ? content.body : ""}`}
          placeholder={`${reply ? "답글을 작성하세요" : ""}`}
          onChange={resizeTextEvent}
          maxLength={255}
          rows={1}
        />
        <div className={styles.editBtnBox}>
          <button
            onClick={() => {
              onEdit && editEvent();
              reply && replyEvent();
            }}
            className={styles.commentBtn}
          >
            {onEdit ? "댓글 수정" : "답글 쓰기"}
          </button>
          <button
            onClick={() => {
              onEdit && setOnEdit(false);
              reply && setReply(false);
            }}
            className={styles.cancelBtn}
          >
            취소
          </button>
        </div>
      </div>
    );
  };

  console.log(replyList);
  return (
    <>
      {onEdit ? (
        <div className={styles.editdiv}>
          <div className={styles.info}>
            <div className={styles.left}>
              <h4 className={styles.userName}>{content.nickname}</h4>
              <p className={styles.date}>{content.time}</p>
            </div>
          </div>
          <CommentEdit />
        </div>
      ) : (
        <div className={styles.commentLayout}>
          <div className={styles.comment}>
            <div className={styles.contents}>
              <div className={styles.info}>
                <div className={styles.left}>
                  <h4 className={styles.userName}>{content.nickname}</h4>
                  <p className={styles.date}>{content.time}</p>
                </div>
              </div>
              <p className={styles.detail}>
                {detailBody.map((item, i) => (
                  <React.Fragment key={item + i}>
                    {item}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <div className={styles.replyBtnBox}>
                <p className={styles.replyBtn} onClick={() => setReply(!reply)}>
                  답글 쓰기
                </p>
                <p
                  className={styles.replyListBtn}
                  onClick={() => setOnReplyList(!onReplyList)}
                >
                  {replyList &&
                    replyList.length > 0 &&
                    (onReplyList ? (
                      <>
                        <MdKeyboardArrowUp size="1rem" />
                        답글 닫기
                      </>
                    ) : (
                      <>
                        <MdKeyboardArrowDown size="1rem" />
                        답글 보기
                      </>
                    ))}
                </p>
              </div>
              {reply && (
                <div className={styles.replyEditBox}>
                  <p className={styles.replyLine}>
                    <FiCornerDownRight />
                  </p>
                  <div className={styles.replyEditInfo}>
                    <h4>{UserData?.nickname}</h4>
                    <div>
                      익명
                      <input
                        type="checkbox"
                        onChange={() => setAnonymous(!anonymous)}
                      />
                    </div>
                  </div>
                  <CommentEdit />
                </div>
              )}
            </div>
            <div className={styles.btnbox}>
              <div className={styles.more}>
                <div
                  className={`${styles.editbox} ${
                    more ? styles.on : styles.off
                  }`}
                >
                  {content.isMyComment && (
                    <button
                      className={styles.btn}
                      onClick={() => {
                        setMore(!more);
                        setOnEdit(!onEdit);
                        setReply(false);
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
                  <button
                    className={styles.report}
                    onClick={() => reportEvent()}
                  >
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
        </div>
      )}
      {replyList &&
        replyList.length > 0 &&
        onReplyList &&
        replyList.map((replyContent, i) => (
          <ReplyDetail content={replyContent} getComment={getComment} />
        ))}
    </>
  );
};

export default CommentDetail;
