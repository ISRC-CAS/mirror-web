"use client";
import styles from "./index.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-content"]}>
        <div className={styles["footer-links"]}>
          <a href="https://isrc.iscas.ac.cn">
            Intelligent Software Research Center
          </a>
          <span className={styles.divider}>|</span>
          <a href="http://www.iscas.ac.cn">Institute of Software</a>
          <span className={styles.divider}>|</span>
          <a href="http://www.cas.cn">Chinese Academy of Sciences</a>
        </div>
        <div className={styles["footer-text"]}>
          <a href="/mirrors-feedbacks">Mirrors-Feedbacks</a>
          <span className={styles.divider}>|</span>
          <a href="mailto:support@iscas.ac.cn">Email us</a>
        </div>
        <div className={styles["footer-text"]}>京ICP备05046678号-1</div>
      </div>
    </footer>
  );
}

export default Footer;
