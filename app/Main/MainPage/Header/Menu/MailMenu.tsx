"use client";
import React, { useEffect, useState } from "react";

import styles from "./MailMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";
import { useRouter } from "next/navigation"; // 수정된 import 경로
import UserStorage from "@/lib/storage/UserStorage";

function MailMenu() {
  const [userData, setUserData] = useState(UserStorage.getUserProfile());
  const [chats, setChats] = useState([]);

  const router = useRouter();
  useEffect(() => {
    UserAPI.getchat().then((res) => {
      // 필터링된 채팅만 저장
      const filteredChats = res.data.filter(
        (chat) => chat.sender_id !== userData.id
      );
      setChats(filteredChats);

      console.log(filteredChats);
    });
  }, []);

  const handleChatClick = () => {
    // 채팅 방으로 이동
    router.push("/Main/ChatRoom"); // chatId를 보내지 않음
  };

  return (
    <ul className={styles.MailList}>
      <p className={styles.mailTop}>받은 쪽지</p>
      {chats.map((chat) => (
        <li key={chat.id} onClick={handleChatClick}>
          <div>
            <p>
              발신자: {chat.other_nickname}
              <br />
              쪽지 내용: {chat.last_content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MailMenu;
