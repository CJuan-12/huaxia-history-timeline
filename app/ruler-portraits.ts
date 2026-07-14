import type { RulerProfile } from "./ruler-profiles";

type Portrait = RulerProfile["portrait"];

/**
 * Additional public-domain portraits for catalogue-only rulers.  Keys match
 * the catalogue seed key so the image never depends on a display-name guess.
 */
export const additionalRulerPortraits: Record<string, Portrait> = {
  "western-han:汉昭帝刘弗陵": {
    src: "/rulers/han-zhaodi.jpg",
    alt: "汉昭帝刘弗陵后世绘像",
    kind: "后世绘像",
    credit: "唐代传阎立本《历代帝王图》中的汉昭帝理想化绘像，波士顿美术馆藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:HanZhaoDiLiuFuling.jpg",
  },
  "three-kingdoms:曹丕": {
    src: "/rulers/cao-pi.jpg",
    alt: "魏文帝曹丕后世绘像",
    kind: "后世绘像",
    credit: "唐代传阎立本《历代帝王图》中的魏文帝理想化绘像，波士顿美术馆藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cao_Pi_Tang.jpg",
  },
  "three-kingdoms:刘备": {
    src: "/rulers/liu-bei.jpg",
    alt: "蜀汉昭烈帝刘备后世绘像",
    kind: "后世绘像",
    credit: "唐代传阎立本《历代帝王图》中的蜀汉昭烈帝理想化绘像，波士顿美术馆藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Liu_Bei_Tang.jpg",
  },
  "jin:司马炎": {
    src: "/rulers/sima-yan.jpg",
    alt: "晋武帝司马炎后世绘像",
    kind: "后世绘像",
    credit: "唐代传阎立本《历代帝王图》中的晋武帝理想化绘像，波士顿美术馆藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jin_Wu_Di.jpg",
  },
  "northern-southern:陈蒨": {
    src: "/rulers/chen-qian.jpg",
    alt: "陈文帝陈蒨后世绘像",
    kind: "后世绘像",
    credit: "唐代传阎立本《历代帝王图》中的陈文帝理想化绘像，波士顿美术馆藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chen_Wendi_Tang.jpg",
  },
  "northern-southern:陈伯宗": {
    src: "/rulers/chen-bozong.jpg",
    alt: "陈废帝陈伯宗后世绘像",
    kind: "后世绘像",
    credit: "唐代传阎立本《历代帝王图》中的陈废帝理想化绘像，波士顿美术馆藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chen_Feidi_Tang.jpg",
  },
  "sui:隋炀帝杨广": {
    src: "/rulers/sui-yangdi.jpg",
    alt: "隋炀帝杨广后世绘像",
    kind: "后世绘像",
    credit: "唐代传阎立本《历代帝王图》中的隋炀帝理想化绘像，波士顿美术馆藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sui_Yangdi_Tang.jpg",
  },
  "ming:朱瞻基": {
    src: "/rulers/xuande.jpg",
    alt: "明宣宗朱瞻基宫廷画像",
    kind: "宫廷画像",
    credit: "明宣宗坐像，南薰殿旧藏，台北故宫博物院藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Xuande_Emperor.jpg",
  },
  "ming:朱祐樘": {
    src: "/rulers/hongzhi.jpg",
    alt: "明孝宗朱祐樘宫廷画像",
    kind: "宫廷画像",
    credit: "明孝宗坐像，南薰殿旧藏，台北故宫博物院藏；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Portrait_assis_de_l%27empereur_Hongzhi.jpg",
  },
  "qing:宣统帝溥仪": {
    src: "/rulers/xuantong.jpg",
    alt: "宣统帝溥仪历史照片",
    kind: "历史照片",
    credit: "20世纪初溥仪礼服肖像，摄影者不详；Wikimedia Commons 公版",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Xuantong.jpg",
  },
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
