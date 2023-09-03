import { statusResponse } from "@/app/fetchAPI";
import { BoardListItem } from "../type/boardType";
import { EditType, HotPost, PostType, readPostType } from "../type/postType";
import { dataResponse, GetAPI, PostAPI, PutAPI } from "./fetchAPI";
import { DeleteAPI } from "./fetchAPI";

class BoardAPI {
  static listArticle(
    boardTypeId: number,
    page: number = 1,
    recordSize: number,
    pageSize: number = 10,
    sortCriterionId: number
  ) {
    return GetAPI<dataResponse<BoardListItem>>(`/board/`, {
      boardTypeId,
      page,
      recordSize,
      pageSize,
      sortCriterionId,
    });
  }

  static newPostArticle(postData: PostType) {
    return PostAPI<statusResponse>(`/board/create/`, postData);
  }

  static imgUpload(imgFile: FormData) {
    return PostAPI<statusResponse>(`/image`, imgFile);
  }

  static readPost(boardId: number) {
    return GetAPI<dataResponse<readPostType>>(`/board/${boardId}/`);
  }

  static postLike(boardId: number) {
    return PostAPI<statusResponse>(`/board/like/${boardId}/`);
  }

  static MyChatLoad(page: number, recordSize: number, targetUserId: number) {
    const queryParams = `?page=${page}&recordSize=${recordSize}&targetUserId=${targetUserId}`;
    return GetAPI<
      dataResponse<{
        list: {
          board_id: number;
          board_title: string;
          board_type: string;
          boardtype_id: number;
          body: string;
          nickname: string;
          created_at: string;
          id: number;
        }[];
      }>
    >(`/profile/comment${queryParams}`);
  }

  static MylistLoad(page: number, recordSize: number, targetUserId: number) {
    const queryParams = `?page=${page}&recordSize=${recordSize}&targetUserId=${targetUserId}`;
    return GetAPI<
      dataResponse<{
        list: {
          body: string;
          category_id: number;
          comment_cnt: number;
          created_at: string;
          id: number;
          like_cnt: number;
          report_cnt: number;
          title: string;
          type: string;
          user_id: number;
        }[];
      }>
    >(`/profile/board${queryParams}`);
  }
  static MylikeLoad(page: number, recordSize: number) {
    const queryParams = `?page=${page}&recordSize=${recordSize}`;
    return GetAPI<
      dataResponse<{
        list: {
          body: string;
          category_id: number;
          comment_cnt: number;
          created_at: string;
          id: number;
          like_cnt: number;
          report_cnt: number;
          title: string;
          type: string;
          user_id: number;
        }[];
      }>
    >(`/profile/like${queryParams}`);
  }

  static reportPost(boardId: number) {
    return PostAPI<statusResponse>(
      `/board/report/?boardId=${boardId}&reportId=1`
    );
  }
  static PostDelete(boardId: number) {
    return DeleteAPI<statusResponse>(`/board/${boardId}/`);
  }
  static starPost(boardId: string) {
    return PostAPI<statusResponse>(`/bookmark/${boardId}`);
  }
  static editPost( data:EditType  ) {
    return PutAPI<statusResponse>(`/board/update/`, data);
  }

  static Getbookmark() {
    return GetAPI<dataResponse>("/bookmark/my-list");
  }
  static GethotPost() {
    return GetAPI<dataResponse<HotPost>>(`/board/hot?&page=1&recordSize=3&sortCriterionId=2`);
  }
  static Delbookmark(boardId : number) {
    return DeleteAPI<statusResponse>(`/bookmark/${boardId}`);
  }
  static Dellike(boardId : number) {
    return DeleteAPI<statusResponse>(`/board/like/${boardId}/`);
  }
}

export default BoardAPI;
