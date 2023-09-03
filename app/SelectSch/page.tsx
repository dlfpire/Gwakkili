"use client";
import "./SelectSch.css";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

import IconImg from "./img/IconImg.png";
import { headers } from "next/dist/client/components/headers";

export default function SelectSch(): ReactElement {
  const search = useSearchParams();
  const params = Object.fromEntries(search.entries());
  const email = params.email || "";
  //전공계열,학과
  const [major, setmajor] = useState("");
  const [depart, setdepart] = useState("");

  //전공계열,학과받기
  const [mlist, setmlist] = useState([]);
  const [dlist, setdlist] = useState([]);
  //전공계열 새로고침
  const onmajor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const majorvalue = e.target.value;
    setmajor(majorvalue);
  };
  //경로 지정
  const router = useRouter();
  const ondepart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const departvalue = e.target.value;
    setdepart(departvalue);
  };

  //전공계열 받기
  useEffect(() => {
    fetch("https://dev.api.tovelop.esm.kr/user/categorylist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setmlist(res.data)) // 데이터를 dlist 상태에 저장
      .catch((error) => {
        console.error("오류 데이터 전송", error);
      });
  }, []);
  // 학과 받기
  useEffect(() => {
    fetch("https://dev.api.tovelop.esm.kr/user/majorlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setdlist(res.data)) // 데이터를 dlist 상태에 저장
      .catch((error) => {
        console.error("오류 데이터 전송", error);
      });
  }, []);

  const passNext = () => {
    if (!major && !depart) {
      alert("전공계열과 학과를 모두 선택하여 주세요");
    } else {
      fetch("https://dev.api.tovelop.esm.kr/user/selection/categorymajor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          category: major,
          major: depart,
        }),
      })
        .then((res) => res.json())
        .then((res) => router.push("/"))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="outer">
      <nav className="margin">
        <div className="imgbox">
          <Image src={IconImg} className="ImageSch" alt="" />
          <label>
            <b>학과 선택</b>
          </label>
        </div>

        <div className="Title">
          <label>전공계열</label>
          <br />
          <input
            type="Text"
            id="major"
            placeholder="전공계열을 선택하여주세요"
            list="majorlist"
            value={major}
            onChange={onmajor}
          />
          <datalist id="majorlist">
            {mlist.map((data, index) => (
              <option key={index} value={data} />
            ))}
          </datalist>
        </div>

        <div className="Major">
          <label>학과</label>
          <br />
          <input
            type="text"
            id="departId"
            placeholder="학과를 입력해주세요."
            list="departlist"
            value={depart}
            onChange={ondepart}
          />
          <datalist id="departlist">
            {dlist.map((data, index) => (
              <option key={index} value={data} />
            ))}
          </datalist>
        </div>
        <div className="next">
          <button type="submit" className="SelectBtn" onClick={passNext}>
            완료
          </button>
        </div>
      </nav>
    </div>
  );
}
