import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "华夏长卷｜中国古代历史时间轴",
  description: "以横向时间轴浏览从夏商周到清末的中国古代历史，查看重大事件、君王身份档案、MBTI 行为推演及王朝覆灭原因。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
