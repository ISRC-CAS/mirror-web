import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const helpDir = path.join(process.cwd(), "mdxFile/contents");
    const files = fs.readdirSync(helpDir);

    // 获取所有 .mdx 文件的名称
    const availableHelps = files
      .filter(file => file.endsWith(".mdx"))
      .map(file => file.replace(".mdx", ""));

    return new Response(JSON.stringify(availableHelps), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify([]), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
