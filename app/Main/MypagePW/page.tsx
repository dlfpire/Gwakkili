"use client";
import sha512 from "crypto-js/sha512";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import useLocalStorage from "@/app/useLocalStorage";

import styles from "./MypagePW.module.css";
import UserAPI from "@/lib/api/UserAPI";

function page() {
  const router = useRouter();

  const [pw, setPw] = useState("");

  const onpw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passValue = e.target.value;
    setPw(passValue);
  };

  const pwcheck = () => {
    UserAPI.passwordConfirm(pw)
      .then(() => router.push("/Main/Mypage"))
      .catch((error) => alert(error));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 제출 동작 막기
    pwcheck();
  };

  return (
    <div className={styles.boardLayout}>
      <div className={styles.inforcheck}>본인확인</div>
      <div className={styles.tagpw}>계정 비밀번호</div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className={styles.pw}
          placeholder="계정 비밀번호"
          value={pw}
          onChange={onpw}
        />
        <button type="submit" className={styles.linktext}>
          확 인
        </button>
      </form>
    </div>
  );
}

export default page;
