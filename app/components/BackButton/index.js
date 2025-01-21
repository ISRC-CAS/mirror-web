"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className={styles["back-button-group"]}>
      <button onClick={() => router.back()} className={styles["back-button"]}>
        <Image src="/image/back.png" alt="返回上一页" width={15} height={15} />
        <span>返回上一页</span>
      </button>
      <Link href="/" className={styles["back-button"]}>
        <Image src="/image/home.png" alt="返回首页" width={15} height={15} />
        <span>返回首页</span>
      </Link>
    </div>
  );
}
