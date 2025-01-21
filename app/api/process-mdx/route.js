import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mirrorName = searchParams.get("name");

    const filePath = path.join(
      process.cwd(),
      "mdxFile/contents",
      `${mirrorName}.mdx`
    );
    const content = fs.readFileSync(filePath, "utf8");

    // 处理内容
    let processedContent = content
      // 移除 <CodeBlock> 标签，保留其中的内容
      .replace(/<CodeBlock[^>]*>([\s\S]*?)<\/CodeBlock>/g, "$1")
      // 替换变量
      .replace(/{{http_protocol}}/g, "https://mirror.iscas.ac.cn")
      .replace(/{{mirror}}/g, "/mirror")
      .replace(/{{enable_checksum}}/g, "")
      .replace(/\{\{[^}]+\}\}/g, "")
      .replace(/\$r/g, "")
      // 处理 markdown 链接，将 /xxx/ 格式的链接改为 /mdxPage/xxx
      .replace(/\[([^\]]+)\]\(\/([^/)]+)\/\)/g, (match, text, page) => {
        return `[${text}](/mdxPage/${page})`;
      })
      .trim();

    // 处理 frontmatter
    processedContent = processedContent.replace(
      /---\s*\n([\s\S]*?)\n---\s*\n/,
      (match, frontmatter) => {
        const titleMatch = frontmatter.match(/title:\s*(.*)/);
        return titleMatch ? `\n# ${titleMatch[1].trim()}\n\n` : "";
      }
    );

    // 将处理后的内容写回文件
    await fs.promises.writeFile(filePath, processedContent);

    return new Response(
      JSON.stringify({
        success: true,
        message: "MDX 文件处理完成"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("处理 MDX 文件失败:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
