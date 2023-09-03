import React, { useState, useEffect } from "react";

import styles from "./NoticeMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";
import UserStorage from "@/lib/storage/UserStorage";

function NotifiMenu() {
  const [alert, setAlert] = useState([]);
  const [alertId, setAlertId] = useState<number>(null);
  const [read, setRead] = useState(false);
  const [readItems, setReadItems] = useState([]);

  // 컴포넌트가 마운트될 때 로컬스토리지에서 읽음 항목 불러오기
  useEffect(() => {
    const storedReadItems = JSON.parse(
      localStorage.getItem("readItems") || "[]"
    );
    setReadItems(storedReadItems);

    UserAPI.Getnofication().then((res) => {
      setAlert(res.data.list);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    // readItems 변경 시 로컬스토리지에 저장
    localStorage.setItem("readItems", JSON.stringify(readItems));
  }, [readItems]);

  const handleNotificationClick = async (notificationId: number) => {
    setAlertId(notificationId);
    const res = await UserAPI.noficationid(notificationId);
    setRead(res.success);

    if (res.success) {
      if (!readItems.includes(notificationId)) {
        setReadItems((prevItems) => [...prevItems, notificationId]);
      }
    }

    console.log(res.success);
  };

  return (
    <ul className={styles.noticeList}>
      <p className={styles.noticeTop}>알림</p>
      {alert.map((notification, index) => (
        <li
          className={`${styles.notice} ${
            alertId === notification.id ? styles.selected : ""
          }`}
          key={index}
          onClick={() => handleNotificationClick(notification.id)}
        >
          <div className={styles.noticeContent}>
            <span className={styles.title}>{notification.title}</span>
            <span className={styles.body}>
              <br />
              내용: {notification.body}
            </span>
            {readItems.includes(notification.id) && (
              <span className={styles.readIndicator}>읽음</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NotifiMenu;
