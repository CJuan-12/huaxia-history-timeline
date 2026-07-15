import type { Metadata } from "next";
import "./globals.css";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicSiteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  "https://huaxia-history-timeline.civil-cup-6295.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteOrigin),
  title: "华夏长卷｜中国古代历史时间轴",
  description: "以横向时间轴和朝代文化版图浏览从夏商周到清末的中国古代历史，通过帝王关系星谱检索 443 位君主身份档案，并在地图上查看历代文学名人画像、代表作、地域风气、社会习俗与分级置信的 MBTI 候选。",
  openGraph: {
    title: "华夏长卷｜中国古代历史时间轴",
    description: "横向穿行 23 个历史时期，以文化版图观察风气、习俗和文学名人画像，并探索 443 位君主身份档案。",
    images: [{ url: `${publicBasePath}/og.png`, width: 1731, height: 973, alt: "展开的中国历史长卷与时间线" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "华夏长卷｜中国古代历史时间轴",
    description: "横向穿行 23 个历史时期，以文化版图观察风气、习俗和文学名人画像，并探索 443 位君主身份档案。",
    images: [`${publicBasePath}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
