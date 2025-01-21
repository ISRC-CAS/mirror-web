"use client";
import Home from "./homePage/page";
import styles from "./page.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [isFixedWidth, setIsFixedWidth] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleWidth = () => {
    setIsFixedWidth(!isFixedWidth);
  };

  return (
    <main
      className={styles["page-container"]}
      style={{
        width: isFixedWidth ? "1000px" : "auto",
        margin: isFixedWidth ? "0 auto" : "0"
      }}
    >
      <div
        className={`${styles["theme-toggole"]} ${
          resolvedTheme === "dark" ? styles.dark : styles.light
        }`}
        onClick={handleThemeToggle}
      >
        <Image
          id={styles["theme-icon"]}
          src={
            resolvedTheme === "dark" ? "/image/dark.png" : "/image/light.png"
          }
          alt={resolvedTheme === "dark" ? "dark-theme" : "light-theme"}
          width={25}
          height={25}
        />
        <span>{resolvedTheme === "dark" ? "暗黑模式" : "明亮模式"}</span>
      </div>

      <div className={styles["display-toggle"]} onClick={toggleWidth}>
        <Image
          id={styles["display-icon"]}
          src={
            resolvedTheme === "dark"
              ? "/image/toggle-dark.png"
              : "/image/toggle-light.png"
          }
          alt="display-toggle"
          width={15}
          height={15}
        />
        <span>{isFixedWidth ? "固定宽度" : "内容自适应"}</span>
      </div>

      <Home />
    </main>
  );
}
