"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ErrorPage from "next/error";

import HashTagList from "./HashTagList";
import ImgList from "./ImgList";
import styles from "./Update.module.css";
import {
  EditType,
  PostType,
  readPostType,
  uploadType,
} from "@/lib/type/postType";
import BoardAPI from "@/lib/api/BoardAPI";
import { uploadAPI } from "@/lib/api/fetchAPI";

type fileListType = {
  imgFile: File[];
  imgURL: string[];
};

function Update() {
  const router = useRouter();
  const [postData, setPostData] = useState<EditType>();
  const [hashTag, setHashTag] = useState<string[]>([]);
  const [article, setArticle] = useState<readPostType>();
  const [fileList, setFileList] = useState<fileListType>({
    imgFile: [],
    imgURL: [],
  });

  const [changed, setChanged] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardLink = parts[parts.length - 3];
  const boardId = parts[parts.length - 2];
  let boardType: number = 0;

  const WritingEvent = () => {
    setChanged(true);
  };

  useEffect(() => {
    BoardAPI.readPost(parseInt(boardId))
      .then((res) => {
        setArticle(res.data);
        const tagArr = res.data.board.tags.map((item) => item.name);
        setHashTag(tagArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const unloadListner = (event: BeforeUnloadEvent) => {
      if (changed) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", unloadListner);

    return () => {
      window.removeEventListener("beforeunload", unloadListner);
    };
  }, [changed]);

  const PostEvent = () => {
    if (titleRef.current?.value && contentRef.current?.value && article) {
      if (fileList.imgFile.length > 0) {
        const imgForm = new FormData();
        let imgURL: string[] = [];
        fileList.imgFile.map((item) => {
          imgForm.append("files", item);
        });

        uploadAPI<uploadType>("POST", "/image", imgForm)
          .then((res) => {
            res.map((item) => imgURL.push(item.url));
            if (titleRef.current?.value && contentRef.current?.value) {
              setPostData({
                id: article?.board.id,
                title: titleRef.current.value,
                body: contentRef.current.value,
                isHide: 0,
                imagesUrl: imgURL,
                tags: hashTag ? hashTag : undefined,
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        setPostData({
          id: article?.board.id,
          title: titleRef.current.value,
          body: contentRef.current.value,
          isHide: 0,
          imagesUrl: undefined,
          tags: hashTag ? hashTag : undefined,
        });
      }
    } else {
      alert("제목과 내용을 모두 입력해 주세요.");
    }
  };

  useEffect(() => {
    if (postData && article) {
      console.log(postData);
      BoardAPI.editPost(postData)
        .then(() => {
          router.push(`/Main/${boardLink}/${article?.board.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postData]);

  return (
    <div className={styles.NewPostLayout}>
      <div className={styles.boardName}>
        <h2 style={{ margin: 0 }}>수정하기</h2>
      </div>

      <div className={styles.newTitle}>
        <p style={{ margin: "1%" }}>- 제목</p>
        <input
          ref={titleRef}
          className={styles.inputTitle}
          defaultValue={article?.board.title}
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={WritingEvent}
        />
      </div>

      <div className={styles.newTag}>
        <p style={{ margin: "1%" }}>- 해시태그</p>
        <HashTagList hashTag={hashTag} setHashTag={setHashTag} />
      </div>

      <div className={styles.imgUpload}>
        <p style={{ margin: "1%" }}>- 사진 {"( 최대 5개 )"}</p>
        <ImgList fileList={fileList} setFileList={setFileList} />
      </div>

      <div className={styles.newContent}>
        <p style={{ margin: "1%" }}>- 내용</p>
        <textarea
          ref={contentRef}
          className={styles.inputContent}
          maxLength={1450}
          onChange={WritingEvent}
          defaultValue={article?.board.body}
        ></textarea>
      </div>
      <div className={styles.newPostMenu}>
        <button className={styles.cancelBtn}>취소</button>
        <button className={styles.postBtn} onClick={() => PostEvent()}>
          등록
        </button>
      </div>
    </div>
  );
}

export default Update;
