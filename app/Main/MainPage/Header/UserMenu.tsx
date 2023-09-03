import React, { useRef, useState, useEffect } from "react";
import { MdMailOutline, MdNotificationsNone } from "react-icons/md";

import DropdownMenu from "./Menu/DropdownMenu";
import MailMenu from "./Menu/MailMenu";
import NoticeMenu from "./Menu/NoticeMenu";
import styles from "./UserMenu.module.css";
import UserAPI from "@/lib/api/UserAPI";
import UserStorage from "@/lib/storage/UserStorage";

interface UserProfile {
  id: string;
  profileImg: string;
  // other properties...
}

function UserMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [noticeMenuOpen, setNoticeMenuOpen] = useState(false);
  const [mailMenuOpen, setMailMenuOpen] = useState(false);

  const userBtnRef = useRef<HTMLButtonElement>(null);
  const noticeBtnRef = useRef<HTMLButtonElement>(null);
  const mailBtnRef = useRef<HTMLButtonElement>(null);

  const [userData, setUserData] = useState(UserStorage.getUserProfile());
  const [imgurl, setImgurl] = useState<string | null>(null);
  const id = userData?.id || ""; // Optional chaining

  useEffect(() => {
    if (id) {
      UserAPI.GETUserProfile(id).then((res) => setImgurl(res.data.profileImg));
    }
  }, [id]);

  const MenuOpenFun = (tap: string) => {
    if (tap === "Mail") {
      setMailMenuOpen(!mailMenuOpen);
      setNoticeMenuOpen(false);
      setUserMenuOpen(false);
    } else if (tap === "Notice") {
      setNoticeMenuOpen(!noticeMenuOpen);
      setMailMenuOpen(false);
      setUserMenuOpen(false);
    } else if (tap === "User") {
      setUserMenuOpen(!userMenuOpen);
      setMailMenuOpen(false);
      setNoticeMenuOpen(false);
    }
  };

  return (
    <div className={styles.userMenu}>
      <button
        ref={mailBtnRef}
        className={styles.MailBtn}
        onClickCapture={() => {
          MenuOpenFun("Mail");
        }}
      >
        <MdMailOutline size="1.5rem" className={styles.mailIcon} />
      </button>

      <button
        ref={noticeBtnRef}
        className={styles.NoticeBtn}
        onClick={() => MenuOpenFun("Notice")}
      >
        <MdNotificationsNone size="1.5rem" className={styles.noticeIcon} />
      </button>

      <button
        ref={userBtnRef}
        className={`${styles.userBtn} ${imgurl ? styles.hasImage : ""}`}
        onClick={() => MenuOpenFun("User")}
      >
        <div className={styles.circleWrapper}>
          {imgurl && <img src={imgurl} alt="User Profile" />}
        </div>
      </button>

      {userMenuOpen && <DropdownMenu />}
      {noticeMenuOpen && <NoticeMenu />}
      {mailMenuOpen && <MailMenu />}
    </div>
  );
}

export default UserMenu;
