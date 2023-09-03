"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { MdDensityMedium, MdSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import DarkToggle from "@/app/DarkMode/DarkToggle";

import iconpng from "../img/icon3.png";
import BoardList from "./BoardList";
import logo_kr from "./img/icon3.png";
import Styles from "./MainHeader.module.css";
import UserMenu from "./UserMenu";
import UserStorage from "@/lib/storage/UserStorage";
import UserAPI from "@/lib/api/UserAPI";

function MainHeader() {
  const [userData, setUserData] = useState(UserStorage.getUserProfile()!!);

  const catagorylist = userData.category.map((categoryItem) => ({
    major: categoryItem.majorName,
  }));

  const [selectedCategory, setSelectedCategory] = useState<string>(
    catagorylist.length > 0 ? catagorylist[0].major : ""
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // 새로운 학과를 선택하면 리스트 창이 닫힘
  };

  const handleListClick = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // 리스트를 선택하면 리스트 창이 닫힘
  };

  const renderCategoryList = (
    <ul className={Styles.menuList}>
      {catagorylist.map((item, index) => (
        <li key={index} className={Styles.menuItem}>
          <button
            onClick={() => handleListClick(item.major)}
            className={`${Styles.boardLink} ${Styles.menuLink}`}
          >
            {item.major}
          </button>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    console.log(catagorylist);
  });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchText = searchInputRef.current?.value;
    if (searchText) {
      router.push(`/Main/Searchpage?search=${searchText}`);
    } else {
      alert("검색할 내용을 입력하세요");
    }
  };

  const [visiable, setVisiable] = useState<boolean>(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const backdropClick = (e: any) => {
    if (e !== linkRef) setVisiable(false);
  };

  function CreateMenu(): any {
    if (visiable) {
      return (
        <ul
          className={Styles.menuList}
          onClick={(e) => {
            backdropClick(e);
          }}
        >
          <Link href="/Main/Free" className={Styles.boardLink}>
            자유
          </Link>

          <Link href="/Main/Knowledge" className={Styles.boardLink}>
            지식
          </Link>

          <Link href="/Main/QnA" className={Styles.boardLink}>
            QnA
          </Link>

          <Link href="/Main/Promotion" className={Styles.boardLink}>
            홍보
          </Link>

          <Link href="/Main/Career" className={Styles.boardLink}>
            취업/진로
          </Link>

          <Link href="/Main/Hobby" className={Styles.boardLink}>
            취미
          </Link>
        </ul>
      );
    }
  }
  function handleMenuButton(): void {
    setVisiable(!visiable);
  }

  return (
    <header className={Styles.header}>
      <Link href="/Main/MainPage" className={Styles.icon}>
        <Image src={logo_kr} alt="" width={70} height={60} />
      </Link>
      <div className={Styles.major}>
        <h3 onClick={toggleDropdown}>{selectedCategory}</h3>
        {isDropdownOpen && renderCategoryList}
      </div>

      <div className={Styles.boardList}>
        <BoardList />
      </div>

      <div className={Styles.sizebutton}>
        <CreateMenu />
      </div>

      <form className={Styles.search} onSubmit={searchSubmit}>
        <button type="submit" className={Styles.searchIcon}>
          <MdSearch size={"1.125rem"} />
        </button>
        <input
          ref={searchInputRef}
          type="text"
          className={Styles.searchInput}
          placeholder="검색"
        />
      </form>

      <div>
        <DarkToggle />
      </div>
      <div className={Styles.userMenu}>
        <UserMenu />
      </div>

      <nav className={Styles.navbar}>
        <button className={Styles.navBtn} onClick={handleMenuButton}>
          <MdDensityMedium size={"1.25rem"} color="white" />
        </button>
      </nav>
    </header>
  );
}

export default MainHeader;
