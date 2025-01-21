"use client";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./index.module.css";

function Header({ onCategorySelect, onViewChange }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("mirrorList");

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = e => {
    if (!e.target.closest(`.${styles.dropdown}`)) {
      setDropdownVisible(false);
    }
  };

  const handleMirrorListClick = () => {
    setActiveTab("mirrorList");
    onViewChange("mirrorList");
  };

  const handleItemClick = category => {
    setActiveTab("download");
    onCategorySelect(category);
    setDropdownVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-content"]}>
          {/* Logo区域 */}
          <div className={styles["logo-section"]}>
            <h1>欢迎来到</h1>
            <div id={styles.logo}>
              <Image
                src="/image/iscaslogo.png"
                alt="ISCAS_logo"
                width={110}
                height={30}
                priority
              />
            </div>
            <h1>开源镜像站</h1>
          </div>
          {/* 导航标签栏 */}
          <div className={styles["nav-tabs"]}>
            {/* 镜像列表标签 */}
            <button
              className={`${styles["tab-btn"]} ${
                activeTab === "mirrorList" ? styles.active : ""
              }`}
              onClick={handleMirrorListClick}
            >
              镜像列表
            </button>
            {/* 下拉菜单 */}
            <div className={styles.dropdown}>
              <button
                className={`${styles["tab-btn"]} ${styles["dropdown-toggle"]} ${
                  activeTab === "download" ? styles.active : ""
                }`}
                onClick={handleDropdownToggle}
              >
                获取安装镜像
                <span className={styles.arrow}></span>
              </button>
              {/* 下拉菜单内容 */}
              {dropdownVisible && (
                <div className={styles["dropdown-menu"]}>
                  <div className={styles["dropdown-content"]}>
                    <div
                      className={styles["dropdown-item"]}
                      onClick={() => handleItemClick("os")}
                    >
                      操作系统
                    </div>
                    <div
                      className={styles["dropdown-item"]}
                      onClick={() => handleItemClick("app")}
                    >
                      应用软件
                    </div>
                    <div
                      className={styles["dropdown-item"]}
                      onClick={() => handleItemClick("font")}
                    >
                      字体
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

Header.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired
};

export default Header;
