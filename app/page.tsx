"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import UserAPI from "@/lib/api/UserAPI";
import UserStorage from "@/lib/storage/UserStorage";

import IconImg from "./img/Icon.png";
import AppImg from "./img/loginAppImg.png";
import classes from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    // 사용자가 이미 로그인한 경우를 확인하는 방법이 있다고 가정하겠습니다. 예: UserStorage.isLoggedIn()
    if (UserStorage.isLoggedIn()) {
      router.push("/Main/MainPage"); // 메인 페이지로 리디렉션합니다.
    }
  }, []);
  const onEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const onpassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passValue = e.target.value;
    setPassword(passValue);
  };

  const handleLogin = (email: string, password: string) => {
    UserAPI.login(email, password)
      .then((result) => {
        UserStorage.setPubKey(result.pubKey);
        UserStorage.setPrivKey(result.privKey);

        return UserAPI.getMyProfile().then((res) => {
          UserStorage.setUserProfile(res.data);
          if (res.data.category.length == 0) {
            alert(
              "학과 · 계열 정보가 존재하지 않습니다. 게시판 이용에 제한이 있을 수 있습니다."
            );
          } else {
            UserStorage.setUserCategory(res.data.category[0]);
          }
          router.push("/Main/MainPage");
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleLoginButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className={classes.outer}>
      <div className={classes.appImg}>
        <Image src={AppImg} alt="" />
      </div>
      <form className={classes.LoginPage} onSubmit={handleLoginButton}>
        <h1>
          <Image src={IconImg} alt="" style={{ width: 300, height: 300 }} />
        </h1>
        <p>과끼리에 오신 것을 환영합니다!</p>
        <input
          type="text"
          name="ID"
          id=""
          className={classes.Input}
          placeholder="아이디"
          value={email}
          onChange={onEmail}
        />
        <br />
        <input
          type="password"
          name="password"
          className={classes.Input}
          placeholder="비밀번호"
          value={password}
          onChange={onpassword}
        />
        <br />
        <button type="submit" id="LoginBtn" className={classes.button}>
          로그인
        </button>

        <br />
        <p className={classes.foundPwd}>
          비밀번호를 잊어버렸나요?
          <Link href="/SearchAccount">비밀번호찾기</Link>
        </p>
        <br />
        <p className="new">
          아직 회원이 아니신가요? <Link href="/Agree">회원가입</Link>
        </p>
      </form>
    </div>
  );
}
