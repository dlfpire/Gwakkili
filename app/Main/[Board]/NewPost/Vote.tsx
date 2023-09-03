"use client";
import React, { useRef, useState } from "react";
import styles from "./Vote.module.css";
import { MdClose } from "react-icons/md";

type Poll = {
  title: string;
  options: string[];
};
type PropsType = {
  pollData?: {
    title: string;
    options: string[];
  };
  setPollData: React.Dispatch<React.SetStateAction<Poll>>;
};

const Vote = ({ pollData, setPollData }: PropsType) => {
  const [onVote, setOnVote] = useState<boolean>(false);
  const [voteCnt, setVoteCnt] = useState<number[]>([1, 2]);

  const titleRef = useRef<HTMLInputElement>(null);
  const [voteOptions, setVoteOptions] = useState<string[]>([]);

  const addEvent = () => {
    setVoteCnt([...voteCnt, voteCnt.length + 1]);
    setVoteOptions([...voteOptions, ""]);
  };
  const cancelEvent = () => {
    setOnVote(!onVote);
    setVoteOptions([]);
  };
  const removeEvent = () => {
    if (voteCnt.length > 0) {
      const updatedVoteCnt = voteCnt.slice(0, voteCnt.length - 1);
      const updatedVoteOptions = voteOptions.slice(0, voteOptions.length - 1);
      setVoteCnt(updatedVoteCnt);
      setVoteOptions(updatedVoteOptions);
    }
  };
  const OptionsChangeEvent = (i: number, value: string) => {
    let updateOptions = [...voteOptions];
    updateOptions[i] = value;
    setVoteOptions(updateOptions);
  };
  const completeEvent = () => {
    if (titleRef.current?.value && voteOptions.length > 1) {
      const voteData = {
        title: titleRef.current.value,
        options: voteOptions,
      };
      setPollData(voteData);
    }
    else {
        alert("항목을 2개이상 입력하세요")
    }
  };
  return (
    <div className={styles.vote}>
      {onVote ? (
        <div className={styles.voteItem}>
          <div className={styles.titleMenu}>
            <input
              type="text"
              ref={titleRef}
              placeholder="투표 주제를 입력하세요"
              className={styles.voteTitle}
            />
            <button className={styles.cancelBtn} onClick={cancelEvent}>
              <MdClose size="1.25rem" />
            </button>
          </div>
          <div className={styles.voteList}>
            {voteCnt.map((i, index) => (
              <div className={styles.voteContent} key={index}>
                <p style={{ margin: 0 }}>{i} .</p>
                <input
                  type="text"
                  className={styles.contentInput}
                  onChange={(e) => OptionsChangeEvent(index, e.target.value)}
                />
              </div>
            ))}
            <div className={styles.btnbox}>
              <p className={styles.addBtn} onClick={addEvent}>
                항목 추가
              </p>

              <p className={styles.reduce} onClick={() => removeEvent()}>
                줄이기
                <MdClose />
              </p>
            </div>
            <button onClick={completeEvent}>완료</button>
          </div>
          <div></div>
        </div>
      ) : (
        <p className={styles.makeVote} onClick={() => setOnVote(!onVote)}>
          투표 추가하기
        </p>
      )}
    </div>
  );
};

export default Vote;
