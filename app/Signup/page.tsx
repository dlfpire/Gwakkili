"use client";
import "./Signup.css";

import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
export default function Signup(): ReactElement {
  //input에 입력되는 value값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Repassword, setRepassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [school, setschool] = useState("");
  const [sNo, setsNo] = useState("");
  //학교 이름
  const [Sname, SetSname] = useState([]);
  //유효성검사
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [RepasswordError, setRepasswordError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [schoolError, setschoolError] = useState(false);
  const [sNoError, setsNoError] = useState(false);
  //주소 navigate
  const router = useRouter();

  //학교 정보 받아오기
  useEffect(() => {
    fetch("https://dev.api.tovelop.esm.kr/user/universitylist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => SetSname(res.data))
      .catch((error) => {
        console.error("오류 데이터 전송", error);
      });
  }, []);

  //이메일 유효성검사
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

  //비밀번호 유호성검사
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()]/;
  const onpassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwvalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setPassword(pwvalue);
    if (!pwvalue) {
      setPasswordError(true);
      input.setCustomValidity("비밀번호를 입력하여 주세요");
    } else if (
      !uppercaseRegex.test(pwvalue) ||
      !lowercaseRegex.test(pwvalue) ||
      !numberRegex.test(pwvalue) ||
      !specialCharRegex.test(pwvalue)
    ) {
      setPasswordError(true);
      input.setCustomValidity(
        "비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
      );
    } else {
      setPasswordError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //비밀번호 확인 유호성검사
  const onRepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const repwvalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setRepassword(repwvalue);
    if (!repwvalue) {
      setRepasswordError(true);
      input.setCustomValidity("비밀번호 확인을 입력하여 주세요");
    } else if (password !== repwvalue) {
      setRepasswordError(true);
      input.setCustomValidity("위의 비밀번호와 동일하게 작성하여주세요");
    } else {
      setRepasswordError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //닉네임 확인 유효성 검사
  const parttenRegex = /^[A-Za-z0-9가-힣]*$/;
  const onNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknamevalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setNickname(nicknamevalue);
    if (!nicknamevalue) {
      setNicknameError(true);
      input.setCustomValidity("닉네임을 입력하여주세요");
    } else if (
      !parttenRegex.test(nicknamevalue) ||
      nicknamevalue.length < 3 ||
      nicknamevalue.length > 20
    ) {
      setNicknameError(true);
      input.setCustomValidity(
        "닉네임은 [3~20자의 영문(대,소문자), 한글, 숫자]만 입력가능합니다."
      );
    } else {
      setNicknameError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };
  //이름 유효성 검사
  const onName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    const input = e.target as HTMLInputElement;
    setName(nameValue);

    if (!nameValue) {
      setNameError(true);
      input.setCustomValidity("이름을 입력하여주세요");
    } else {
      setNicknameError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //학교 유효성 검사
  const onSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    const schoolvalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setschool(schoolvalue);
    if (!schoolvalue) {
      setschoolError(true);
      input.setCustomValidity("학교를 입력하여주세요");
    } else {
      setschoolError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  //학번 유효성 검사

  const onsNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sNovalue = e.target.value;
    const input = e.target as HTMLInputElement;
    setsNo(sNovalue);
    if (!sNovalue) {
      setsNoError(true);
      input.setCustomValidity("학번을 입력하여 주세요");
    } else if (!numberRegex.test(sNovalue)) {
      setsNoError(true);
      input.setCustomValidity("올바른 학번을 입력하여 주세요");
    } else {
      setsNoError(false);
      input.setCustomValidity("");
    }
    input.reportValidity();
  };
  //회원가입 버튼 조건
  const PassPage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let nullplusError = false;

    if (!email || emailError) {
      setEmailError(true);
      nullplusError = true;
    }
    if (!password || passwordError) {
      setPasswordError(true);
      nullplusError = true;
    }

    if (!Repassword || RepasswordError) {
      setRepasswordError(true);
      nullplusError = true;
    }

    if (!nickname || nicknameError) {
      setNicknameError(true);
      nullplusError = true;
    }

    if (!name || nameError) {
      setNameError(true);
      nullplusError = true;
    }

    if (!school || schoolError) {
      setschoolError(true);
      nullplusError = true;
    }

    if (!sNo || sNoError) {
      setsNoError(true);
      nullplusError = true;
    }

    if (nullplusError) {
      alert("위의 빈칸을 입력해주시거나 조건에 맞게 입력하여주세요");
    } else {
      try {
        const response = await fetch(
          "https://dev.api.tovelop.esm.kr/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              passwordCheck: Repassword,
              nickname: nickname,
              name: name,
              sno: sNo,
              univName: school,
            }),
          }
        );

        const result = await response.json();

        if (result.success) {
          // 회원가입 성공 시 처리 (예: 환영 메시지 출력)
          router.push("/EmailCheck");
        } else {
          // 회원가입 실패 시 처리 (예: 에러 메시지 표시)
          // input 요소에 에러 메시지를 설정
          const emailInput = document.getElementById(
            "email"
          ) as HTMLInputElement;
          emailInput.setCustomValidity(result.errors);

          const passwordInput = document.getElementById(
            "password"
          ) as HTMLInputElement;
          passwordInput.setCustomValidity(result.errors);

          // form을 다시 검증하도록 강제로 호출
          const form = document.getElementById("signupForm") as HTMLFormElement;
          form.reportValidity();
        }
      } catch (error) {
        console.error("오류 데이터 전송", error);
      }
    }
  };

  return (
    <div className="SignupMain">
      <form id="signupForm" className="SignupForm">
        <p className="SignupTitle">회원가입</p>

        <div className="container">
          <div className="inputcontainer">
            <p className="label">이메일</p>
            <input
              id="email"
              className="inputField"
              type="text"
              placeholder="abc123@gwakkili.ac.kr"
              value={email}
              onChange={onEmail}
              required
            />
          </div>
        </div>

        <div className="container">
          <div className="inputcontainer">
            <p className="label">비밀번호</p>
            <input
              id="password"
              className="inputField"
              type="password"
              placeholder="[영문 대, 소문자 1개 이상 + 숫자 1개 이상 + 특수문자 1개 이상]"
              value={password}
              onChange={onpassword}
              required
            />
          </div>
        </div>
        <div className="container">
          <div className="inputcontainer">
            <p className="label">비밀번호 확인</p>
            <input
              id="passwordChk"
              className="inputField"
              type="password"
              placeholder="위의 비밀번호와 동일하게 작성하세요"
              value={Repassword}
              onChange={onRepassword}
              required
            />
          </div>
        </div>

        <div className="container">
          <div className="inputcontainer">
            <p className="label">닉네임</p>
            <input
              id="nickname"
              className="inputField"
              type="text"
              placeholder="[3~20자의 영문(대,소문자), 한글, 숫자]"
              value={nickname}
              onChange={onNickname}
              required
            />
          </div>
        </div>

        <div className="container">
          <div className="inputcontainer">
            <p className="label">이름</p>
            <input
              id="name"
              className="inputField"
              type="text"
              placeholder="이름 형식에 맞게 이름을 작성하여주세요"
              value={name}
              onChange={onName}
              required
            />
          </div>
        </div>

        <div className="container">
          <div className="inputcontainer">
            <p className="label">학교</p>
            <input
              id="universityName"
              className="inputField"
              type="text"
              placeholder="학교를 입력해주세요"
              list="datalist"
              value={school}
              onChange={onSchool}
              required
            />
            <datalist id="datalist">
              {Sname.map((university, index) => (
                <option key={index} value={university} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="container">
          <div className="inputcontainer">
            <p className="label">학번</p>
            <input
              id="sNo"
              className="inputField"
              type="text"
              placeholder="학번을 입력해주세요"
              value={sNo}
              onChange={onsNo}
              required
            />
          </div>
        </div>

        <div className="btndiv">
          <br />
          <button type="submit" className="Btn" onClick={PassPage}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
