"use client";
import Link from "next/link";
import React from "react";

import styles from "./BoardList.module.css";

function BoardList() {
  return (
    <nav>
      <ul className={styles.boardList}>
        <Link href="/Main/Free" className={styles.boardLink}>
          자유
        </Link>

        <span className={styles.bar}></span>

        <Link href="/Main/Knowledge" className={styles.boardLink}>
          지식
        </Link>

        <Link href="/Main/QnA" className={styles.boardLink}>
          QnA
        </Link>

        <span className={styles.bar}></span>

        <Link href="/Main/Promotion" className={styles.boardLink}>
          홍보
        </Link>

        <Link href="/Main/Career" className={styles.boardLink}>
          취업/진로
        </Link>

        <span className={styles.bar}></span>

        <Link href="/Main/Hobby" className={styles.boardLink}>
          취미
        </Link>
      </ul>
    </nav>
  );
}

export default BoardList;
