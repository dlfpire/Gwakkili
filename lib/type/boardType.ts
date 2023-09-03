type BoardListItem = {
  list: BoardDetail[];
  pagination: {
    endPage: number;
    existNextPage: boolean;
    existPrevPage: boolean;
    limitStart: number;
    startPage: number;
    totalPageCount: number;
    totalRecordCount: number;
  };
};

type BoardDetail = {
  boardId?: number;
  id?: number;
  title: string;
  createdAt: string;
  modifiedAt: string | null;
  userNickname?: string;
  commentCnt: number;
  likeCnt: number;
  isAnonymous: number;
  isHide: number;
  isLike: boolean | null;
  imagesUrl: string[] | null;
  userId?: number;
  tags?: string[];
  body:string;
  tagNames:string;
  bookmark : boolean;
};

export type { BoardListItem , BoardDetail};
