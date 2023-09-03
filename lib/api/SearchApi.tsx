import { BoardListItem } from "../type/boardType";
import { dataResponse, GetAPI } from "./fetchAPI";

type searchType = {
	content: string,
    page: number,
    recordSize: number,
    boardTypeId?: number,
    tagName?: string
}

class BoardAPI {
  static listArticle(
    content: string,
    page: number,
    recordSize: number,
    boardTypeId?: number,
    tagName?: string
  ) {
    const params: searchType = {
      content,
      page,
      recordSize,
    };
    if (boardTypeId !== undefined) {
      params.boardTypeId = boardTypeId;
    }

    if (tagName !== undefined) {
      params.tagName = tagName;
    }
    return GetAPI<dataResponse<BoardListItem>>(`/board/search/`, params);
  }
}

export default BoardAPI;
