import PropTypes from "prop-types";
import styles from "./index.module.css";

function DownloadBox({ selectedDistroData }) {
  const renderDownloadCards = () => {
    if (!selectedDistroData) return null;

    return selectedDistroData.urls.map((item, index) => (
      <div key={index} className={styles["os-card"]}>
        <h3>{item.name}</h3>
        <a
          href={`https://mirrors.tuna.tsinghua.edu.cn${item.url}`}
          className={styles["download-btn"]}
          target="_blank"
          rel="noreferrer"
        >
          下载
        </a>
      </div>
    ));
  };

  return (
    <div className={styles["os-content"]}>
      <div className={styles["os-header"]}>
        <h2 className={styles["os-title"]}>
          {selectedDistroData ? selectedDistroData.distro : "下载文件"}
        </h2>
      </div>
      <div className={styles["os-list"]}>{renderDownloadCards()}</div>
    </div>
  );
}

DownloadBox.propTypes = {
  selectedDistroData: PropTypes.shape({
    distro: PropTypes.string,
    urls: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string
      })
    )
  })
};

export default DownloadBox;
