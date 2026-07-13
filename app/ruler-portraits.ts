import type { RulerProfile } from "./ruler-profiles";

type Portrait = RulerProfile["portrait"];

/**
 * Additional public-domain portraits for catalogue-only rulers.  Keys match
 * the catalogue seed key so the image never depends on a display-name guess.
 */
export const additionalRulerPortraits: Record<string, Portrait> = {
  "three-kingdoms:孙权": {
    src: "/rulers/sun-quan.jpg",
    alt: "孙权后世绘像",
    kind: "后世绘像",
    credit: "传为阎立本《历代帝王图》中的孙权像；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sun_Quan_Tang.jpg",
  },
  "northern-song:宋太宗赵光义": {
    src: "/rulers/song-taizong.jpg",
    alt: "宋太宗赵光义宫廷画像",
    kind: "宫廷画像",
    credit: "宋代宫廷画像，台北故宫博物院藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Taizong_of_Song.jpg",
  },
  "northern-song:宋仁宗赵祯": {
    src: "/rulers/song-renzong.jpg",
    alt: "宋仁宗赵祯宫廷画像",
    kind: "宫廷画像",
    credit: "北宋宫廷画像，台北故宫博物院藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Song_Renzong.jpg",
  },
  "southern-song:宋孝宗赵昚": {
    src: "/rulers/song-xiaozong.jpg",
    alt: "宋孝宗赵昚宫廷画像",
    kind: "宫廷画像",
    credit: "南宋宫廷画像，台北故宫博物院藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Xiaozong.jpg",
  },
  "qing:雍正帝胤禛": {
    src: "/rulers/yongzheng.jpg",
    alt: "雍正帝胤禛朝服像",
    kind: "宫廷画像",
    credit: "18世纪清宫朝服像；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Portrait_of_the_Yongzheng_Emperor_in_Court_Dress.jpg",
  },
  "qing:乾隆帝弘历": {
    src: "/rulers/qianlong.jpg",
    alt: "乾隆帝弘历晚年宫廷画像",
    kind: "宫廷画像",
    credit: "清代宫廷画师绘乾隆帝晚年像；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%E4%B9%BE%E9%9A%86%E7%9A%87%E5%B8%9D%E8%80%81%E5%B9%B4%E8%82%96%E5%83%8F.jpg",
  },
  "qing:嘉庆帝颙琰": {
    src: "/rulers/jiaqing.jpg",
    alt: "嘉庆帝颙琰朝服像",
    kind: "宫廷画像",
    credit: "清代宫廷画师绘嘉庆帝朝服像；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%E6%B8%85_%E4%BD%9A%E5%90%8D_%E3%80%8A%E6%B8%85%E4%BB%81%E5%AE%97%E5%98%89%E5%BA%86%E7%9A%87%E5%B8%9D%E6%9C%9D%E6%9C%8D%E5%83%8F%E3%80%8B.jpg",
  },
};
