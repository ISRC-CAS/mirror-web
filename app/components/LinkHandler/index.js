"use client";

import { useEffect } from "react";
import styles from "../../mdxPage/[slug]/page.module.css";

export default function LinkHandler({ children }) {
  useEffect(() => {
    const handleClick = async e => {
      // 检查是否点击的是链接
      if (e.target.tagName === "A") {
        e.preventDefault();
        const href = e.target.getAttribute("href");

        // 检查是否是 mdxPage 链接
        if (href && href.startsWith("/mdxPage/")) {
          const mirrorName = href.replace("/mdxPage/", "");
          try {
            // 先调用 API 处理 MDX 文件
            const response = await fetch(`/api/process-mdx?name=${mirrorName}`);
            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                window.location.href = href;
              }
            }
          } catch (error) {}
        }
      }
    };

    // 添加事件监听器到 mdx-container
    const container = document.querySelector(`.${styles["mdx-container"]}`);
    if (container) {
      container.addEventListener("click", handleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return children;
}
