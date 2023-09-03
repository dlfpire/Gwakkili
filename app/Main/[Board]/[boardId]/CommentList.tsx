import React from "react";
import { CommentDetailType } from "@/lib/type/CommentType";
import CommentDetail from "./CommentDetail";
import { comment } from "postcss";

type PropsType = {
  commentList: CommentDetailType[];
  boardId: number;
  commentCnt: number;
  getComment: () => void;
};
const commentList = ({ commentList,boardId, getComment }: PropsType) => {
  console.log(commentList);

  return (
    <div style={{ marginTop: "2rem" }}>
      {commentList &&
        commentList
          .filter((item) => item.parent_id === null)
          .map((content) => {
            const replylist = commentList.filter(
              (item) => item.parent_id === content.id
            );
            return (
              <CommentDetail
                content={content}
                getComment={getComment}
                replyList={replylist}
                boardId={boardId}
                key={content.id}
              />
            );
          })}
    </div>
  );
};

export default commentList;
