import styles from "./page.module.css";
import LinkHandler from "../../components/LinkHandler";
import BackButton from "../../components/BackButton";


// 包装组件
function PageWrapper({ children }) {
  return (
    <LinkHandler>
      <div className={styles["mdx-container"]}>
        <BackButton />
        {children}
      </div>
    </LinkHandler>
  );
}

// MDX 内容组件
async function MDXContent({ slug }) {
  try {
    const { default: Post } = await import(
      `@/mdxFile/contents/${slug}.mdx`
    );
    return <Post />;
  } catch (error) {
    return (
      <>
        <h1>错误</h1>
        <p>找不到该镜像的使用帮助文档</p>
      </>
    );
  }
}

// 主页面组件
export default async function Page({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  return (
    <PageWrapper>
      <MDXContent slug={slug} />
    </PageWrapper>
  );
}

export const dynamicParams = true;
