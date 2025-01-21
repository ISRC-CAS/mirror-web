"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";
import Image from "next/image";

function MirrorList() {
  // 状态管理
  const [mirrorData, setMirrorData] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([
    "success",
    "syncing",
    "failed"
  ]);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: "asc"
  });
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 添加临时选中状态
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState([
    "success",
    "syncing",
    "failed"
  ]);

  // 状态映射表
  const statusMap = {
    success: "同步成功",
    failed: "同步失败",
    syncing: "同步中..."
  };

  // 添加一个状态来存储所有可用的帮助文档列表
  const [availableHelpsList, setAvailableHelpsList] = useState([]);

  // 在组件加载时获取所有可用的帮助文档列表
  useEffect(() => {
    const fetchAvailableHelps = async () => {
      try {
        const response = await fetch("/api/list-helps");
        const data = await response.json();
        setAvailableHelpsList(data);
      } catch (error) {
        setAvailableHelpsList([]);
      }
    };
    fetchAvailableHelps();
  }, []);

  // 获取镜像数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/data/syncstatus.json"); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        const sortedData = [...data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setMirrorData(sortedData);
        setError(null);
      } catch (error) {
        console.error("获取镜像数据失败:", error);
        setError(`获取镜像数据失败: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // 处理状态变化
  const handleStatusChange = status => {
    setTempSelectedStatuses(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      }
      return [...prev, status];
    });
  };

  // 处理确认按钮点击
  const handleFilterConfirm = () => {
    setSelectedStatuses(tempSelectedStatuses);
    setFilterVisible(false);
  };

  // 点击外部关闭筛选框的处理函数
  const handleClickOutside = useCallback((e) => {
    if (
      filterVisible &&
      !e.target.closest(
        `.${styles["filter-popup"]}, .${styles["filter-icon"]}`
      )
    ) {
      setFilterVisible(false);
    }
  }, [filterVisible]);

  // 点击外部关闭筛选框
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // 当筛选弹窗打开时，同步临时状态
  useEffect(() => {
    if (filterVisible) {
      setTempSelectedStatuses(selectedStatuses);
    }
  }, [filterVisible, selectedStatuses]);

  // 处理排序
  const handleSort = column => {
    setSortConfig(prev => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  // 处理筛选图标点击
  const handleFilterClick = e => {
    const iconRect = e.currentTarget.getBoundingClientRect();
    setFilterPosition({
      top: iconRect.bottom + 5,
      left: iconRect.left - 50
    });
    setFilterVisible(prev => !prev);
    e.stopPropagation();
  };

  // 排序数据
  const sortedData = [...mirrorData];
  if (sortConfig.column === "update-time") {
    sortedData.sort((a, b) => {
      const comparison = new Date(a.last_update) - new Date(b.last_update);
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }

  // 筛选数据
  const filteredData = sortedData.filter(item =>
    selectedStatuses.includes(item.status)
  );

  // 修改渲染帮助列的部分
  const renderHelpCell = mirror => {
    // 直接检查文件是否存在
    const hasHelp = availableHelpsList.includes(mirror.name);

    if (!hasHelp) {
      return "N/A";
    }

    return (
      <div className={styles["help-container"]} data-mirror={mirror.name}>
        <div
          className={styles["help-text"]}
          onClick={async () => {
            try {
              // 先调用 API 处理 MDX 文件
              const response = await fetch(
                `/api/process-mdx?name=${mirror.name}`
              );
              if (response.ok) {
                const result = await response.json();
                if (result.success) {
                  window.location.href = `/mdxPage/${mirror.name}`;
                }
              }
            } catch (error) {
        
            }
          }}
        >
          <span>{mirror.name} 使用帮助</span>
          <Image
            src={"/image/help-icon.png"}
            alt="帮助"
            className={styles["help-icon"]}
            width={15}
            height={15}
          />
        </div>
      </div>
    );
  };

  // 渲染表格内容
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="5" className={styles.loading}>
            加载中...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="5" className={styles.error}>
            {error}
          </td>
        </tr>
      );
    }

    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan="5" className={styles.empty}>
            没有找到匹配的镜像
          </td>
        </tr>
      );
    }

    return filteredData.map((mirror, index) => (
      <tr
        key={mirror.name}
        className={index % 2 === 0 ? styles.odd : styles.even}
      >
        <td>
          <a href={`/mirror/${mirror.name}`}>{mirror.name}</a>
        </td>
        <td className={styles["update-time"]}>
          {mirror.last_update ? mirror.last_update.substring(0, 19) : "N/A"}
        </td>
        <td>
          <button
            className={`${styles["sync-status"]} ${styles[mirror.status]}`}
            title={statusMap[mirror.status]}
          >
            {statusMap[mirror.status] || "Unknown"}
          </button>
        </td>
        <td className={styles["mirror-size"]}>{mirror.size || "N/A"}</td>
        <td>{renderHelpCell(mirror)}</td>
      </tr>
    ));
  };

  return (
    <>
      {/* 镜像源列表 */}
      <main className={styles["mirror-list"]}>
        {/* 状态筛选弹窗 */}
        {filterVisible && (
          <div className={styles["filter-popup"]}>
            <div className={styles["filter-popup-content"]}>
              <div className={styles["filter-options"]}>
                {Object.keys(statusMap).map(status => (
                  <label key={status} className={styles["filter-option"]}>
                    <input
                      type="checkbox"
                      checked={tempSelectedStatuses.includes(status)}
                      onChange={() => handleStatusChange(status)}
                    />
                    <span className={styles["checkbox-custom"]}>
                      {statusMap[status]}
                    </span>
                  </label>
                ))}
              </div>
              <div className={styles["filter-actions"]}>
                <button
                  className={styles["filter-confirm"]}
                  onClick={handleFilterConfirm}
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 镜像列表表格 */}
        <table
          className={styles["distro-table"]}
          cellPadding="0"
          cellSpacing="0"
        >
          {/* 列宽设置 */}
          <colgroup>
            {[15, 15, 15, 15, 15].map((width, index) => (
              <col key={index} style={{ width: `${width}%` }} />
            ))}
          </colgroup>

          {/* 表头 */}
          <thead>
            <tr>
              <th>
                <span>镜像名</span>
              </th>
              <th>
                <div className={styles["sort-header"]}>
                  <span>上次更新时间</span>
                  <div
                    className={`${styles["sort-icon"]} ${
                      sortConfig.column === "update-time"
                        ? styles[sortConfig.direction]
                        : ""
                    }`}
                    onClick={() => handleSort("update-time")}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </div>
                </div>
              </th>
              <th>
                <div className={styles["status-header"]}>
                  <span>状态</span>
                  <div
                    className={styles["filter-icon"]}
                    onClick={handleFilterClick}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                    </svg>
                  </div>
                </div>
              </th>
              <th>
                <span>镜像大小</span>
              </th>
              <th>使用帮助</th>
            </tr>
          </thead>

          {/* 表格内容 */}
          <tbody>{renderTableContent()}</tbody>
        </table>
      </main>
    </>
  );
}

export default MirrorList;
