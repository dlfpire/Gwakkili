type CommentType = {
  list: CommentDetailType[];
  pagination: {
    totalRecordCount: number;
    totalPageCount: number;
    startPage: number;
    endPage: number;
    limitStart: number;
    existPrevPage: Boolean;
    existNextPage: Boolean;
  };
};
type CommentDetailType = {
  id: number;
  user_id: number;
  nickname: string;
  board_id: number;
  body: string;
  is_anonymous: boolean;
  created_at: string;
  modified_at: null;
  like_cnt: number;
  comment_id: number;
  time: string;
  isMyComment:boolean;
  parent_id:number;
};

export type { CommentType, CommentDetailType };
