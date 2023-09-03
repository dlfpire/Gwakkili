"use client";
import "./EmailCheck.css";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

import IconImg from "./img/IconImg.png";

export default function EmailCheck(): ReactElement {
  const [email, setEmail] = useState("");
  const [EmailCheck, setEmailCheck] = useState("");

  // 이메일 체크
  const [emailError, setEmailError] = useState(false);
  const [numError, setnumError] = useState(false);

  // 이메일 인증번호 확인
  const [eSucces, seteSucces] = useState(false);
  const [nSucces, setnSucces] = useState(false);

  //navigate
  const router = useRouter();
  //이메일 유효성 검사
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+(ac\.kr)$/;
  const emailRegEx2 = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+(edu)$/;
  const onEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    const input = e.target as HTMLInputElement;
    setEmail(emailValue);
    if (!emailValue) {
      setEmailError(true);
      input.setCustomValidity("이메일을 입력하여주세요");
    } else if (!emailRegEx.test(emailValue) && !emailRegEx2.test(emailValue)) {
      setEmailError(true);
      input.setCustomValidity("유효한 이메일을 입력하여주세요");
    } else {
      setEmailError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };
  //이메일 보내기
  const EmailPass = () => {
    let nullCheck = false;
    if (!email || emailError) {
      setEmailError(true);
      nullCheck = true;
    }
    if (nullCheck) {
      alert("이메일을 입력하여주세요");
    } else {
      fetch("https://dev.api.tovelop.esm.kr/email/sendsignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((res) => seteSucces(res["success"]))
        .catch((error) => {
          console.error("오류 데이터 전송", error);
        });
    }
  };

  //인증번호 확인
  const numPass = () => {
    let nullnumCheck = false;
    if (!EmailCheck || nullnumCheck) {
      setnumError(true);
      nullnumCheck = true;
    }

    if (nullnumCheck) {
      alert("인증번호를 입력하여주세요");
    } else {
      fetch("https://dev.api.tovelop.esm.kr/email/confirmEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          authCode: EmailCheck,
        }),
      })
        .then((res) => res.json())
        .then((res) => setnSucces(res["success"]))
        .catch((error) => {
          console.error("오류 데이터 전송", error);
        });
    }
  };

  const PassEmail = () => {
    if (eSucces && nSucces) {
      router.replace(`/SelectSch?email=${email}`);
    } else {
      alert("인증번호나 이메일 형식을 맞춰주세요");
    }
  };
  return (
    <div className="outerEmail">
      <nav className="Emailmargin">
        <div className="Emailimgbox">
          <Image src={IconImg} alt="" className="emailImage" />
          <label className="EmailTitle">이메일 인증</label>
        </div>
        <br />
        <div className="email">
          <label className="EmailFont">이메일</label>
          <br />
          <input
            className="submitdata"
            type="email"
            id="emailId"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={onEmail}
            required
          />
          <br />
          <button className="submitbtn" type="submit" onClick={EmailPass}>
            인증 요청
          </button>
          <br />
          {eSucces && <label>이메일로 인증요청이 성공했습니다.</label>}
          <br />
          <br />
        </div>

        <div className="email">
          <label className="EmailFont">인증번호</label>
          <br />
          <input
            className="submitdata"
            type="email"
            id="emailId"
            placeholder="인증번호를 입력해주세요"
            value={EmailCheck}
            onChange={(e) => setEmailCheck(e.target.value)}
          />
          <br />
          <button className="submitbtn" type="submit" onClick={numPass}>
            확인
          </button>
          <br />
          {nSucces && (
            <label>인증 번호 확인이 되었습니다. 완료버튼을 눌러주세요</label>
          )}
        </div>

        <div className="next">
          <button type="submit" className="EmailBtn" onClick={PassEmail}>
            완료
          </button>
        </div>
      </nav>
    </div>
  );
}
