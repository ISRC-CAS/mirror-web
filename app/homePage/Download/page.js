"use client";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./page.module.css";
import Sidebar from "../../components/SideBar/index";
import DownloadBox from "../../components/DownloadBox/index";

function OsDownload({ category }) {
  console.log("OsDownload received category:", category);
  // 状态管理
  const [isoInfo, setIsoInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistro, setSelectedDistro] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/isoinfo.json");
        if (!response.ok) {
          throw new Error("数据获取失败");
        }
        const data = await response.json();
        setIsoInfo(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 当类别改变时更新过滤后的数据
  useEffect(() => {
    if (category && isoInfo.length > 0) {

      setSelectedDistro(null);

      const filtered = isoInfo
        .filter(item => item.category === category)
        .sort((a, b) => a.distro.localeCompare(b.distro));
      setFilteredData(filtered);


      if (filtered.length > 0) {
        setSelectedDistro(filtered[0].distro);
      }
    }
  }, [category, isoInfo]); 

  const selectedDistroData = filteredData.find(
    item => item.distro === selectedDistro
  );

  return (
    <main className={styles["os-container"]}>
      <Sidebar
        selectedCategory={category}
        filteredData={filteredData}
        selectedDistro={selectedDistro}
        onDistroSelect={setSelectedDistro}
        loading={loading}
        error={error}
      />
      <DownloadBox selectedDistroData={selectedDistroData} />
    </main>
  );
}

OsDownload.propTypes = {
  category: PropTypes.oneOf(["os", "app", "font"]).isRequired 
};

export default OsDownload;
