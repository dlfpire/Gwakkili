"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ErrorPage from "next/error";

import HashTagList from "./HashTagList";
import ImgList from "./ImgList";
import Vote from "./Vote";
import styles from "./newPost.module.css";
import { PostType, uploadType } from "@/lib/type/postType";
import BoardAPI from "@/lib/api/BoardAPI";
import { BoardInfo } from "@/lib/Function/boardFunction";
import { uploadAPI } from "@/lib/api/fetchAPI";

type fileListType = {
  imgFile: File[];
  imgURL: string[];
};

type imgRes = {
  url: string;
};
type Poll = {
  title: string;
  options: string[];
};
function NewPost() {
  const router = useRouter();
  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardLink = parts[parts.length - 2];
  let boardName: string = BoardInfo.getBoardName(boardLink);
  let boardType: number = BoardInfo.getBoardId(boardLink);
  let boardText: string = BoardInfo.getBoardText(boardLink);
  if (BoardInfo.URL_Check(boardLink)) return <ErrorPage statusCode={404} />;

  const [postData, setPostData] = useState<PostType>();
  const [hashTag, setHashTag] = useState<string[]>([]);
  const [fileList, setFileList] = useState<fileListType>({
    imgFile: [],
    imgURL: [],
  });
  const [pollData, setPollData] = useState<Poll>();
  const [anony, setAnony] = useState<boolean>(false);

  const [changed, setChanged] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const WritingEvent = () => {
    setChanged(true);
  };

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
    if (titleRef.current?.value && contentRef.current?.value) {
      let imgURL: string[] = [];
      if (fileList.imgFile.length > 0) {
        const imgForm = new FormData();
        fileList.imgFile.map((item) => {
          imgForm.append("files", item);
        });

        uploadAPI<uploadType>("POST", "/image", imgForm)
          .then((res) => {
            res.map((item) => imgURL.push(item.url));
          })
          .catch((err) => console.log(err));
      }
      if (pollData) {
        setPostData({
          typeId: boardType,
          title: titleRef.current.value,
          body: contentRef.current.value,
          isAnonymous: anony ? 1 : 0,
          isHide: 0,
          imagesUrl: imgURL.length > 0 ? imgURL : undefined,
          tagNames: hashTag ? hashTag : undefined,
          pollInfo: pollData,
        });
      } else {
        setPostData({
          typeId: boardType,
          title: titleRef.current.value,
          body: contentRef.current.value,
          isAnonymous: anony ? 1 : 0,
          isHide: 0,
          imagesUrl: imgURL.length > 0 ? imgURL : undefined,
          tagNames: hashTag ? hashTag : undefined,
        });
      }
    } else {
      alert("제목과 내용을 모두 입력해 주세요.");
    }
  };

  useEffect(() => {
    if (postData) {
      console.log(postData);
      BoardAPI.newPostArticle(postData)
        .then(() => {
          router.push(`/Main/${boardLink}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postData]);

  return (
    <div className={styles.NewPostLayout}>
      <div className={styles.boardName}>
        <p style={{ fontSize: "1.5rem", margin: 0 }}>{boardName}</p>
        <p style={{ margin: 0 }}>{boardText}</p>
      </div>

      <div className={styles.newTitle}>
        <p style={{ margin: "1%" }}>- 제목</p>
        <input
          ref={titleRef}
          className={styles.inputTitle}
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

      <div className={styles.vote}>
        <p style={{ margin: "1%" }}>- 투표</p>
        <Vote pollData={pollData} setPollData={setPollData} />
      </div>

      <div className={styles.newContent}>
        <p style={{ margin: "1%" }}>- 내용</p>
        <textarea
          ref={contentRef}
          className={styles.inputContent}
          maxLength={1450}
          onChange={WritingEvent}
        ></textarea>
      </div>
      <div className={styles.newPostMenu}>
        <div>
          <input
            type="checkbox"
            onChange={() => {
              setAnony(!anony);
            }}
            checked={anony}
          />
          익명
        </div>
        <button
          className={styles.cancelBtn}
          onClick={() => router.push(`/Main/${boardLink}`)}
        >
          취소
        </button>
        <button className={styles.postBtn} onClick={() => PostEvent()}>
          등록
        </button>
      </div>
    </div>
  );
}

export default NewPost;
