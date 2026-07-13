import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "华夏长卷｜中国古代历史时间轴",
  description: "以横向时间轴浏览从夏商周到清末的中国古代历史，检索 443 位君主身份档案，查看重大事件、MBTI 行为推演及王朝覆灭原因。",
  openGraph: {
    title: "华夏长卷｜中国古代历史时间轴",
    description: "横向穿行 23 个历史时期，检索 443 位君主身份档案。",
    images: [{ url: "/og.png", width: 1731, height: 973, alt: "展开的中国历史长卷与时间线" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "华夏长卷｜中国古代历史时间轴",
    description: "横向穿行 23 个历史时期，检索 443 位君主身份档案。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
