"use client";
import IconImg from "./img/IconImg.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

import Agrees from "./Agree.module.css";

export default function Agree(): ReactElement {
  const [checked1, setChecked1] = useState(false); // 첫번째 약관 체크
  const [checked2, setChecked2] = useState(false); // 두번째 약관 체크
  const [checked3, setChecked3] = useState(false); // 세번째 약관 체크
  const router = useRouter();

  function allCheck(): void {
    if (
      checked1 === checked2 &&
      checked2 === checked3 &&
      checked1 === checked3
    ) {
      setChecked1(!checked1);
      setChecked2(!checked2);
      setChecked3(!checked3);
    } else if (checked1 && !checked2 && checked3) setChecked2(!checked2);
    else if (!checked1 && checked2 && checked3) setChecked1(!checked1);
    else if (checked1 && checked2 && !checked3) setChecked3(!checked3);
    else if (checked1 && !checked2 && !checked3) {
      setChecked2(!checked2);
      setChecked3(!checked3);
    } else if (!checked1 && checked2 && !checked3) {
      setChecked1(!checked1);
      setChecked3(!checked3);
    } else if (!checked1 && !checked2 && checked3) {
      setChecked1(!checked1);
      setChecked2(!checked2);
    }
  }

  function btnChecked(): void {
    if (!(checked1 && checked2 && checked3)) {
      alert("모든 약관을 동의해야 합니다.");
    } else {
      router.push("/Signup");
    }
  }

  return (
    <div className={Agrees.PagePadding}>
      <nav>
        <div className={Agrees.divid}>
          <Image src={IconImg} alt="" />
          <br />
          <br />
          <br />
        </div>

        <div className={Agrees.boxes}>
          <input
            type="checkbox"
            id="check1"
            onChange={() => allCheck()}
            checked={checked1 && checked2 && checked3}
          />
          <b>전체 동의하기</b>
        </div>
        <div className={Agrees.Area1}>
          <textarea
            className={Agrees.textarea1}
            defaultValue={
              "실명 인증된 아이디로 가입, 이용약관(선택) 동의를 포함합니다"
            }
          />
        </div>

        <div className={Agrees.divid2}>
          <input
            type="checkbox"
            id="check2"
            checked={checked1}
            onChange={() => setChecked1(!checked1)}
          />
          <b>[필수] 과끼리 이용약관 &gt;</b>
          <br />
        </div>
        <div className={Agrees.Area2}>
          <textarea
            className={Agrees.textarea2}
            defaultValue={`개인정보보호법에 따라 과끼리에 회원가입 신청하시는 분께 수집하는 개인정보의 항목,개인정복의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.`}
          />
        </div>
        <br />

        <div className={Agrees.divid3}>
          <input
            type="checkbox"
            checked={checked2}
            onChange={() => setChecked2(!checked2)}
          />
          <b>[필수] 커뮤니티 이용수칙 확인 &gt;</b>
          <br />
        </div>
        <div className={Agrees.Area3}>
          <textarea
            className="textarea3"
            defaultValue={`개인정보보호법에 따라 과끼리에 회원가입 신청하시는 분께 수집하는 개인정보의 항목,개인정복의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.`}
          />
          <br />
        </div>
        <div className={Agrees.divid4}>
          <input
            type="checkbox"
            id="check4"
            checked={checked3}
            onChange={() => setChecked3(!checked3)}
          />
          <b>[필수] 개인정보 수집 이용 동의서</b>
          <br />
        </div>
        <div className={Agrees.Area4}>
          <textarea
            className={Agrees.textarea4}
            defaultValue={`1. 수집하는 개인정보 항목 학교, 학과, 학번 \n2. 개인정보의 수집 및 이용 목적 제공하신 정보는 과끼리 앱 사용 확인을 위해 사용합니다. 본인 확인 식별 (동명이인 등) 절차에 이용(학교, 학과,학번) 의사소통 및 정보 전달 등에 이용 (학교,학과,학번) \n3. 개인정보의 보유 및 이용기산 수집된 개인정보의 보유 기간은 <과끼리> 사용후 탈퇴 시 ,당사자는 개인 정보를 재생 불가능한 방법으로 즉시 파기합니다 귀하는 이에대한 동의를 거부할 수 있습니다. 다만 동의가 없을 경우 <과끼리> 사용이 불가능할 수도 있음을 알려드립니다.`}
          />
        </div>
        <div className={Agrees.check4}>
          <button type="submit" onClick={() => btnChecked()}>
            다음
          </button>
        </div>
      </nav>
    </div>
  );
}
