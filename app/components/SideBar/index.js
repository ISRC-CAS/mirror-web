import PropTypes from "prop-types";
import styles from "./index.module.css";

function Sidebar({
  selectedCategory,
  filteredData,
  selectedDistro,
  onDistroSelect,
  loading,
  error
}) {
  const renderMenu = () => {
    return filteredData.map(item => (
      <li key={item.distro}>
        <a
          href="#"
          className={selectedDistro === item.distro ? styles.active : ""}
          onClick={e => {
            e.preventDefault();
            onDistroSelect(item.distro);
          }}
        >
          {item.distro}
        </a>
      </li>
    ));
  };

  return (
    <div className={styles["os-sidebar"]}>
      <div className={styles["sidebar-header"]}>
        {selectedCategory === "os" && "操作系统列表"}
        {selectedCategory === "app" && "应用软件列表"}
        {selectedCategory === "font" && "字体列表"}
      </div>
      <ul className={styles["os-menu"]}>
        {loading ? (
          <li>加载中...</li>
        ) : error ? (
          <li className={styles.error}>{error}</li>
        ) : (
          renderMenu()
        )}
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  selectedCategory: PropTypes.string,
  filteredData: PropTypes.array.isRequired,
  selectedDistro: PropTypes.string,
  onDistroSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default Sidebar;
