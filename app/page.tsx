import { catalogStats } from "./ruler-catalog";
import { literaryFigureStats } from "./literary-figures";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const entries = [
  {
    href: "/timeline",
    eyebrow: "TIMELINE",
    title: "朝代时间轴",
    text: "横向滑动查看 23 个历史时期，展开大事记、代表君王和覆灭原因。",
    stat: "23 个时期",
  },
  {
    href: "/atlas",
    eyebrow: "ATLAS",
    title: "文化版图",
    text: "按朝代或君主统治阶段查看版图、地域风气、名人画像和古诗词。",
    stat: `${literaryFigureStats.total} 位名人`,
  },
  {
    href: "/constellation",
    eyebrow: "CONSTELLATION",
    title: "帝王关系星谱",
    text: "用可拖拽的关系图查看继承、家族、共治和冲突。",
    stat: "关系网络",
  },
  {
    href: "/rulers",
    eyebrow: "ARCHIVE",
    title: "君王档案馆",
    text: "搜索全部君主，查看身份、母亲来源、关系行为和 MBTI 推演。",
    stat: `${catalogStats.total} 位君主`,
  },
] as const;

export default function Home() {
  return (
    <main className="site-shell portal-shell">
      <header className="topbar portal-topbar">
        <a className="brand" href={`${publicBasePath}/`} aria-label="华夏长卷首页">
          <span className="brand-mark">史</span>
          <span>
            <strong>华夏长卷</strong>
            <small>中国古代历史探索入口</small>
          </span>
        </a>
        <nav className="topbar-nav" aria-label="功能页面导航">
          {entries.map((entry) => <a key={entry.href} href={`${publicBasePath}${entry.href}`}>{entry.title}</a>)}
        </nav>
      </header>

      <section className="portal-hero" aria-labelledby="portal-title">
        <p className="eyebrow">中国古代历史资料站</p>
        <h1 id="portal-title">选择一种方式进入历史</h1>
        <p>
          现在把原来的一条长页面拆成几个独立入口：想按时间看，就进时间轴；想看地图、名人和古诗词，就进文化版图；想查皇帝关系或身份卡，也有单独页面。
        </p>
      </section>

      <section className="portal-grid" aria-label="功能入口">
        {entries.map((entry, index) => (
          <a className="portal-card" href={`${publicBasePath}${entry.href}`} key={entry.href}>
            <span>{entry.eyebrow}</span>
            <h2>{entry.title}</h2>
            <p>{entry.text}</p>
            <strong>{entry.stat}</strong>
            <em aria-hidden="true">{String(index + 1).padStart(2, "0")} →</em>
          </a>
        ))}
      </section>
    </main>
  );
}