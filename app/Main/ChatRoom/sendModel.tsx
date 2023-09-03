"use client";

import React, { useState } from "react";
import styles from "./ChatRoom.module.css";

export default function SendMessageModal({
  selectedUser,
  onClose,
  onSendMessage,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (selectedUser) {
      onSendMessage(message);
      onClose();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{selectedUser.nickname}에게 메시지 보내기</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className={styles.messageInput}
        />
        <button onClick={handleSubmit}>보내기</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
}
