"use client";

import { useTheme } from "next-themes";
import { MdOutlineNightlightRound,MdSunny } from "react-icons/md";

import classes from "./DarkToggle.module.css";

function DarkToggle() {
  const {theme, setTheme} = useTheme();
  console.log("after : "+theme);
  return (
    <label className={classes.switch}>
      <input type="checkbox" />
      <span className={classes.slider} onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        console.log("before : "+theme);

      }}>
        {" "}
        <MdOutlineNightlightRound size={'1.25rem'} color="gray" />
        <MdSunny size={'1.25rem'} color="yellow" />
      </span>
    </label>
  );
}

export default DarkToggle;
