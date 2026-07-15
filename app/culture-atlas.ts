export type CultureRegionKey =
  | "western-regions"
  | "northwest"
  | "plateau"
  | "steppe"
  | "northeast"
  | "guanzhong"
  | "heartland"
  | "jianghuai"
  | "lower-yangtze"
  | "southwest"
  | "southeast"
  | "lingnan";

export type CultureRegionStatus = "core" | "controlled" | "exchange" | "rival" | "uncertain";

export type CultureRegion = {
  status: CultureRegionStatus;
  headline: string;
  detail: string;
};

export type CultureAtlasEntry = {
  eraId: string;
  capital: string;
  scope: string;
  confidence: "较高" | "中等" | "谨慎";
  summary: string;
  atmosphere: string[];
  culture: string[];
  customs: string[];
  routes: string[];
  phases: {
    early: string;
    middle: string;
    late: string;
  };
  regions: Partial<Record<CultureRegionKey, CultureRegion>>;
};

export type CultureRegionLayout = {
  key: CultureRegionKey;
  label: string;
  shortLabel: string;
  left: string;
  top: string;
  width: string;
  height: string;
  shape: string;
};

export type CultureAtlasMapAsset = {
  src: string;
  alt: string;
  credit: string;
  regions: CultureRegionLayout[];
};

export const cultureRegionLayout: CultureRegionLayout[] = [
  { key: "western-regions", label: "西域与绿洲通道", shortLabel: "西域", left: "2%", top: "25%", width: "25%", height: "23%", shape: "polygon(0 25%, 82% 0, 100% 45%, 76% 100%, 8% 82%)" },
  { key: "northwest", label: "河西与西北走廊", shortLabel: "河西", left: "21%", top: "20%", width: "25%", height: "21%", shape: "polygon(0 20%, 82% 0, 100% 55%, 70% 100%, 8% 78%)" },
  { key: "plateau", label: "青藏高原及周缘", shortLabel: "高原", left: "11%", top: "48%", width: "31%", height: "28%", shape: "polygon(5% 18%, 76% 0, 100% 42%, 82% 100%, 12% 90%, 0 50%)" },
  { key: "steppe", label: "北方草原地带", shortLabel: "草原", left: "35%", top: "4%", width: "38%", height: "19%", shape: "polygon(2% 36%, 30% 0, 100% 18%, 88% 88%, 30% 100%, 0 72%)" },
  { key: "northeast", label: "辽东与东北地区", shortLabel: "东北", left: "72%", top: "10%", width: "24%", height: "27%", shape: "polygon(0 15%, 70% 0, 100% 38%, 76% 100%, 18% 85%)" },
  { key: "guanzhong", label: "关中与河东", shortLabel: "关中", left: "36%", top: "27%", width: "20%", height: "20%", shape: "polygon(8% 12%, 90% 0, 100% 65%, 60% 100%, 0 72%)" },
  { key: "heartland", label: "中原与华北平原", shortLabel: "中原", left: "53%", top: "27%", width: "22%", height: "23%", shape: "polygon(8% 0, 88% 14%, 100% 70%, 55% 100%, 0 68%)" },
  { key: "jianghuai", label: "江淮与长江中游", shortLabel: "江淮", left: "49%", top: "47%", width: "28%", height: "18%", shape: "polygon(0 20%, 72% 0, 100% 45%, 82% 100%, 12% 82%)" },
  { key: "lower-yangtze", label: "江南与东南都会", shortLabel: "江南", left: "69%", top: "51%", width: "24%", height: "25%", shape: "polygon(0 10%, 68% 0, 100% 42%, 70% 100%, 18% 85%)" },
  { key: "southwest", label: "巴蜀与西南山地", shortLabel: "巴蜀", left: "30%", top: "57%", width: "27%", height: "25%", shape: "polygon(10% 0, 92% 18%, 100% 72%, 55% 100%, 0 70%)" },
  { key: "southeast", label: "东南丘陵与闽地", shortLabel: "东南", left: "58%", top: "68%", width: "23%", height: "23%", shape: "polygon(5% 0, 82% 12%, 100% 55%, 60% 100%, 0 72%)" },
  { key: "lingnan", label: "岭南与海上门户", shortLabel: "岭南", left: "40%", top: "82%", width: "34%", height: "15%", shape: "polygon(0 20%, 70% 0, 100% 50%, 82% 100%, 15% 86%)" },
];

export const cultureAtlasMapAssets: Partial<Record<string, CultureAtlasMapAsset>> = {
  xia: {
    src: "/atlas/xia-cultural-map-v1.png",
    alt: "夏代文化地理古地图底图，展现黄河中下游、伊洛盆地、关中、江淮与巴蜀的自然地理关系",
    credit: "AI 精绘历史地理底图 · 互动范围由独立热区层标注",
    regions: [
      {
        key: "guanzhong",
        label: "关中与河东",
        shortLabel: "关中",
        left: "29%",
        top: "35%",
        width: "22%",
        height: "20%",
        shape: "polygon(5% 42%, 18% 11%, 64% 0, 100% 16%, 91% 68%, 73% 100%, 27% 95%, 0 68%)",
      },
      {
        key: "heartland",
        label: "中原与伊洛盆地",
        shortLabel: "中原",
        left: "47%",
        top: "39%",
        width: "23%",
        height: "25%",
        shape: "polygon(13% 0, 61% 4%, 96% 24%, 100% 68%, 78% 92%, 39% 100%, 4% 80%, 0 40%)",
      },
      {
        key: "jianghuai",
        label: "江淮与长江中游",
        shortLabel: "江淮",
        left: "52%",
        top: "55%",
        width: "28%",
        height: "23%",
        shape: "polygon(11% 22%, 46% 0, 79% 13%, 100% 39%, 82% 78%, 46% 100%, 11% 83%, 0 48%)",
      },
      {
        key: "southwest",
        label: "巴蜀与西南山地",
        shortLabel: "巴蜀",
        left: "24%",
        top: "59%",
        width: "30%",
        height: "29%",
        shape: "polygon(17% 21%, 53% 0, 87% 10%, 100% 41%, 87% 76%, 60% 100%, 20% 90%, 0 62%, 3% 35%)",
      },
    ],
  },
};

const region = (status: CultureRegionStatus, headline: string, detail: string): CultureRegion => ({ status, headline, detail });

export const cultureAtlas: CultureAtlasEntry[] = [
  {
    eraId: "xia",
    capital: "二里头—伊洛地区（考古观察中心）",
    scope: "约前2070—前1600",
    confidence: "谨慎",
    summary: "以伊洛盆地和晋南为主要观察范围。夏与二里头文化的对应关系仍在讨论，因此只标活动中心与文化联系，不画精确国界。",
    atmosphere: ["早期王权与聚落等级形成", "联盟政治逐渐走向世袭"],
    culture: ["青铜礼器和绿松石工艺出现", "宫殿区与大型公共工程体现组织能力"],
    customs: ["农业节律、祖先祭祀与宴飨相连", "贵族和平民的居住与器物差异扩大"],
    routes: ["伊洛—晋南交流带", "黄河中下游文化互动"],
    phases: { early: "王权与治水、联盟传统的记忆仍强。", middle: "世袭秩序、宫殿与礼器生产逐渐稳定。", late: "区域联盟松动，东方商文化影响增强。" },
    regions: {
      heartland: region("uncertain", "伊洛聚落核心", "二里头遗址群是观察早期国家、宫殿和礼器生产的关键窗口，但不能直接等同于一条确定的夏朝国界。"),
      guanzhong: region("exchange", "晋南—关中联系", "黄河两岸聚落与资源交换频繁，是早期国家网络的西部连接带。"),
      jianghuai: region("exchange", "多区域文化互动", "江淮及长江中游存在自身文化传统，与中原礼器和技术网络保持交流。"),
      southwest: region("rival", "巴蜀独立传统", "西南地区具有独立发展的区域文化，不宜纳入单一夏王朝疆界。"),
    },
  },
  {
    eraId: "shang",
    capital: "郑州商城—殷墟",
    scope: "约前1600—前1046",
    confidence: "中等",
    summary: "商王都与方国共同组成政治网络。地图突出黄河中下游王畿、东方方国和长江流域、巴蜀等独立又交流的青铜文化。",
    atmosphere: ["王权、战争与占卜紧密结合", "方国联盟具有流动边界"],
    culture: ["甲骨文记录祭祀、农事与战争", "青铜礼器、玉器和音乐高度发达"],
    customs: ["祖先祭祀与占卜进入国家决策", "宴飨、田猎、车战是贵族生活的重要部分"],
    routes: ["海贝与玉料远距离交换", "黄河—长江青铜技术网络"],
    phases: { early: "多次迁都，王都与方国关系仍在重组。", middle: "盘庚迁殷后，祭祀和文字记录更集中。", late: "王畿动员加重，东方与西部联盟出现裂缝。" },
    regions: {
      heartland: region("core", "殷商王畿", "安阳殷墟及黄河中下游是晚商政治、祭祀和手工业的中心。"),
      jianghuai: region("controlled", "南方青铜互动带", "长江中游青铜器与商文化互相影响，同时保留地方造型和礼俗。"),
      northeast: region("exchange", "北方方国网络", "燕山南北与辽西文化通过贡纳、战争和技术交换进入商王朝视野。"),
      southwest: region("rival", "三星堆—巴蜀传统", "巴蜀青铜文化特色鲜明，与商文化有器物和技术联系，但不是商王畿的简单延伸。"),
      northwest: region("exchange", "西北资源通道", "玉料、牲畜和青铜资源沿西北通道进入中原网络。"),
    },
  },
  {
    eraId: "western-zhou",
    capital: "镐京—洛邑",
    scope: "约前1046—前771",
    confidence: "中等",
    summary: "以关中宗周和成周洛邑为双中心，经封邦建国扩展政治与礼制网络；诸侯国不是现代行政区。",
    atmosphere: ["宗法、分封与政治身份相连", "礼乐秩序强调等级与责任"],
    culture: ["青铜铭文记录册命和功绩", "礼器组合、乐钟与玉佩制度化"],
    customs: ["祭祀、宴飨、朝聘和丧葬按等级展开", "射礼、车马和贵族教育构成身份训练"],
    routes: ["宗周—成周政治轴", "诸侯朝聘与贡纳网络"],
    phases: { early: "封邦与礼制重建，吸收商代遗产。", middle: "诸侯网络和册命制度趋于成熟。", late: "王室权威下降，地方文化与政治自主增强。" },
    regions: {
      guanzhong: region("core", "宗周核心", "关中是王室宗庙、贵族封邑与礼制资源集中的区域。"),
      heartland: region("core", "成周与东方枢纽", "洛邑连接东方诸侯，是礼制、交通与军事控制的第二中心。"),
      jianghuai: region("controlled", "南方诸侯与地方文化", "周文化通过诸侯网络向江淮传播，同时与楚、吴等地方传统互动。"),
      northeast: region("controlled", "燕等北方封国", "北方封国承担交通与边疆互动功能，实际控制程度随时期变化。"),
      southwest: region("exchange", "巴蜀交流圈", "巴蜀保持自身政治文化，同时与周系礼器网络发生交换。"),
    },
  },
  {
    eraId: "eastern-zhou",
    capital: "洛邑与列国都城",
    scope: "前770—前256",
    confidence: "较高",
    summary: "周王室仍是名义中心，实际政治与文化活力分散在齐、晋、秦、楚、吴越等列国；版图以并立文化区而非统一疆域呈现。",
    atmosphere: ["礼崩乐坏与制度创新并行", "士人游说、城市竞争和兼并战争塑造开放思想"],
    culture: ["百家争鸣、诗乐与史学发展", "铁器、漆器、丝织和区域艺术繁荣"],
    customs: ["贵族宴饮礼仪延续又走向生活化", "佩剑、车马、灯镜和丝服成为城市精英风尚"],
    routes: ["列国都城商业网络", "江汉—吴越—岭南区域交流"],
    phases: { early: "诸侯争霸，旧礼仍是政治共同语言。", middle: "城市商业与士人流动加快，区域风格鲜明。", late: "变法、郡县和全民动员增强，统一趋势上升。" },
    regions: {
      heartland: region("rival", "韩赵魏与周王畿", "中原密集分布诸侯国和工商业城市，是制度竞争最强的区域。"),
      guanzhong: region("rival", "秦国改革区", "关中由西部诸侯发展为战国强国，法制与军功动员影响深远。"),
      jianghuai: region("rival", "楚文化中心", "楚地漆器、丝织、音乐与信仰传统形成鲜明区域风格。"),
      "lower-yangtze": region("rival", "吴越水网文化", "东南水网、舟战、铸剑和印纹陶传统与中原持续交流。"),
      southwest: region("rival", "巴蜀文化区", "巴蜀在秦并蜀前保持独立传统，随后成为秦国重要农业和交通基地。"),
      steppe: region("exchange", "胡、戎、狄互动带", "北方骑射、服饰和军事技术与中原诸国持续交流。"),
    },
  },
  {
    eraId: "qin",
    capital: "咸阳",
    scope: "前221—前207",
    confidence: "较高",
    summary: "秦以郡县、道路和标准化制度重组六国空间。南方和边疆的控制仍有层次，不能把短期军事到达等同于稳定治理。",
    atmosphere: ["法令、军功与行政标准化", "大工程与高强度动员并存"],
    culture: ["文字、货币、度量衡趋于统一", "帝国陵墓、刻石与道路塑造新政治象征"],
    customs: ["户籍、徭役和法律深入基层生活", "六国旧俗仍在地方社会延续"],
    routes: ["驰道与直道网络", "岭南军政通道"],
    phases: { early: "由秦国区域制度向帝国标准快速扩张。", middle: "郡县与交通工程集中推进。", late: "徭役、战争和地方反抗使统一秩序迅速失衡。" },
    regions: {
      guanzhong: region("core", "秦帝国心脏", "咸阳与关中承担宫廷、军政和道路网络的组织功能。"),
      heartland: region("controlled", "六国故地郡县化", "旧诸侯区域被纳入郡县，但地方记忆和社会网络并未立即消失。"),
      jianghuai: region("controlled", "楚地与江淮新郡", "行政制度向南推进，地方文化仍保持韧性。"),
      southwest: region("controlled", "巴蜀粮运基地", "都江堰和成都平原为帝国农业与南向交通提供支撑。"),
      lingnan: region("uncertain", "岭南军事控制", "秦军开道置郡，但实际治理和地方整合程度随地区而异。"),
      steppe: region("exchange", "长城与北疆", "边防、军屯与匈奴等草原力量的互动构成北方边界。"),
    },
  },
  {
    eraId: "western-han",
    capital: "长安",
    scope: "前202—9",
    confidence: "较高",
    summary: "西汉从休养生息走向强帝国，长安连接关中、河西、西域和东南海路。郡国并行与多层边疆关系共同构成版图。",
    atmosphere: ["大一统意识与儒家礼制结合", "豪强、官僚和地方郡国共同塑造社会"],
    culture: ["经学、史学、赋与画像艺术发展", "丝织、漆器和墓葬信仰呈现丰富宇宙观"],
    customs: ["深衣、袍服与香囊等服饰配件流行", "五谷、肉食与多种烹调方式构成日常饮食"],
    routes: ["长安—河西—西域陆路", "岭南与南海交通"],
    phases: { early: "休养生息，地方王国和旧俗仍有较大空间。", middle: "武帝以后中央动员、经学与对外交通扩张。", late: "外戚、豪强和经典政治加强，社会矛盾累积。" },
    regions: {
      guanzhong: region("core", "长安与关中", "宫廷、太学、陵邑和全国交通在长安周边高度集中。"),
      heartland: region("controlled", "郡国与农业腹地", "黄河中下游是人口、粮食和经学传播的重要区域。"),
      northwest: region("controlled", "河西四郡", "河西走廊连接军镇、移民、绿洲和西域交通。"),
      "western-regions": region("exchange", "西域都护与绿洲网络", "控制与联盟状态多变，但商品、宗教和人员流动长期活跃。"),
      southwest: region("controlled", "西南夷交通", "郡县、地方首领和商路并存，中央影响并不等于均质治理。"),
      lingnan: region("controlled", "岭南郡县与海路", "南越并入后，岭南成为帝国南部和海上交流的重要节点。"),
      steppe: region("exchange", "汉匈边疆", "战争、和亲、互市和人口迁徙共同构成动态边界。"),
    },
  },
  {
    eraId: "xin",
    capital: "常安",
    scope: "9—23",
    confidence: "中等",
    summary: "王莽改制以复古名义重编土地、货币与官名，实际控制在灾荒和起义中迅速收缩。地图用争夺层而不是完整帝国色块。",
    atmosphere: ["托古改制与制度实验", "灾荒、币制混乱和地方武装化"],
    culture: ["经典名物成为政治改革语言", "谶纬与天命叙事影响合法性竞争"],
    customs: ["频繁币制变化冲击市场交换", "迁徙、饥荒和结社改变基层生活"],
    routes: ["关中—河北起义传播线", "黄河流域粮运与难民流动"],
    phases: { early: "复古制度快速推出，象征性改革强。", middle: "币制和土地政策反复，地方执行困难。", late: "绿林、赤眉等武装扩张，区域秩序碎片化。" },
    regions: {
      guanzhong: region("core", "新朝中枢", "长安仍是法令和礼制改革的中心，但资源动员能力下降。"),
      heartland: region("rival", "河北与中原群雄", "灾荒和起义推动地方军事化，名义统治与实际控制分离。"),
      jianghuai: region("rival", "绿林势力活动区", "南阳、荆楚等地成为反新力量的重要来源。"),
      steppe: region("exchange", "北方关系恶化", "改名、外交和战争加剧边疆压力。"),
    },
  },
  {
    eraId: "eastern-han",
    capital: "洛阳",
    scope: "25—220",
    confidence: "较高",
    summary: "东汉重建洛阳中心，地方豪强、庄园与交通网络更强；纸张、佛教和南方经济发展改变文化地理。",
    atmosphere: ["经学名教与察举仕途相连", "豪强宗族和门生故吏网络扩张"],
    culture: ["纸张逐渐推广，史学和碑刻繁盛", "佛教传入并与本土信仰接触"],
    customs: ["庄园生活、宴饮与厚葬风气明显", "画像石、陶楼和明器呈现理想化来世生活"],
    routes: ["洛阳—河西—西域", "长江和岭南交通增长"],
    phases: { early: "战后恢复、节制动员，经学秩序重建。", middle: "豪强与外戚网络扩张，物质文化丰富。", late: "党争、宗教结社和地方军事化改变社会风气。" },
    regions: {
      heartland: region("core", "洛阳政治文化圈", "太学、经学、官僚和市场围绕洛阳及黄河交通展开。"),
      guanzhong: region("controlled", "旧都与西部门户", "长安仍是重要城市，并连接河西和羌胡边疆。"),
      jianghuai: region("controlled", "荆扬人口与产业增长", "长江流域逐渐成为人口迁徙、青瓷和水运的重要区域。"),
      southwest: region("controlled", "巴蜀庄园与崖墓", "四川地区画像、崖墓和农业庄园呈现独特地方生活。"),
      northwest: region("exchange", "西域交通复开", "班超经营西域后交通恢复，但边疆控制多次变化。"),
      steppe: region("exchange", "北方多族互动", "匈奴分裂、鲜卑兴起和内迁共同改变北疆社会。"),
    },
  },
  {
    eraId: "three-kingdoms",
    capital: "洛阳／成都／建业",
    scope: "220—280",
    confidence: "较高",
    summary: "曹魏、蜀汉、孙吴三套国家与文化中心并立。地图同时保留三方，选择君主只改变观察镜头，不抹去其他政权。",
    atmosphere: ["战争动员与屯田塑造社会", "名士风度、政权正统和地方认同并行"],
    culture: ["建安文学与个人表达兴盛", "青瓷、造船、山地交通和军事技术发展"],
    customs: ["北方人口重组与军屯生活普遍", "江南饮茶、水居和舟船文化更加活跃"],
    routes: ["汉中—巴蜀山道", "长江水军与江东港口"],
    phases: { early: "政权创建，战争与人才招揽决定风气。", middle: "三方制度和区域文化逐渐稳定。", late: "内部继承与权臣政治加强，统一趋势转向西晋。" },
    regions: {
      heartland: region("rival", "曹魏核心", "北方人口、屯田和洛阳礼制支撑曹魏国家。"),
      southwest: region("rival", "蜀汉核心", "成都平原与汉中通道支撑蜀汉，地方豪族和山地族群关系重要。"),
      "lower-yangtze": region("rival", "孙吴核心", "建业、江东世族和长江水军形成东南政治文化中心。"),
      lingnan: region("controlled", "孙吴南方拓展", "交州与岭南通过海路、郡县和地方首领网络联系孙吴。"),
      steppe: region("exchange", "北疆军政互动", "乌桓、鲜卑等力量参与北方战争和人口迁徙。"),
    },
  },
  {
    eraId: "jin",
    capital: "洛阳／建康",
    scope: "266—420",
    confidence: "较高",
    summary: "西晋短暂统一后，中原战乱与衣冠南渡把政治文化重心分成北方多政权与江南东晋两部分。",
    atmosphere: ["门阀政治与家族声望突出", "清谈、玄学与避乱心态影响士人"],
    culture: ["书法、山水意识与玄学发展", "佛教译经、寺院和青瓷文化扩张"],
    customs: ["士族谱系、婚姻与礼法区分身份", "曲水宴集、服药清谈等精英风尚受到记录"],
    routes: ["中原—江淮南迁走廊", "建康—会稽江南水网"],
    phases: { early: "统一后的奢华与门阀竞争上升。", middle: "八王之乱和人口南迁重塑区域生活。", late: "东晋士族文化成熟，北府军事集团崛起。" },
    regions: {
      heartland: region("rival", "西晋故地与北方争夺", "洛阳失守后，中原转为多政权竞争和人口流动区。"),
      "lower-yangtze": region("core", "建康与江南士族", "东晋政治、书法、玄学和庄园文化在江南集中发展。"),
      jianghuai: region("controlled", "南北军事缓冲", "江淮是侨置郡县、北府兵和南北移民相遇的前线。"),
      southwest: region("rival", "成汉与巴蜀", "巴蜀一度形成独立政权，保持区域文化和交通体系。"),
      steppe: region("exchange", "北方族群重组", "匈奴、羯、鲜卑、氐、羌等政治力量与汉地制度深度互动。"),
    },
  },
  {
    eraId: "sixteen-kingdoms",
    capital: "长安、邺、姑臧等多中心",
    scope: "304—439",
    confidence: "谨慎",
    summary: "北方政权兴亡极快，边界随军队、联盟和城镇控制变化。版图只显示政治文化走廊与代表中心，不拼成固定十六块。",
    atmosphere: ["多族军事集团与汉地官僚制度结合", "迁徙、联盟、复国和宗教护国观念频繁"],
    culture: ["佛教译经、造像和寺院网络扩张", "骑兵文化、胡汉礼制和地方文书并行"],
    customs: ["服饰、饮食和婚姻出现多族群混合", "城堡、坞壁与流民组织成为日常安全单位"],
    routes: ["关中—河西佛教与商旅通道", "草原—河北军事迁徙线"],
    phases: { early: "西晋崩溃，地方军政集团快速建国。", middle: "前秦一度整合北方，佛教与多族官僚网络扩张。", late: "淝水之后再次分裂，北魏逐步统一北方。" },
    regions: {
      heartland: region("uncertain", "河北与中原多政权", "后赵、前燕等政权反复争夺城市与交通线，精确边界变化很快。"),
      guanzhong: region("rival", "长安诸秦政权", "前秦、后秦等以关中为中心，吸收多族人才并支持佛教翻译。"),
      northwest: region("rival", "河西诸凉", "凉州诸政权连接中原、西域与佛教石窟文化。"),
      northeast: region("rival", "慕容诸燕", "辽东—河北鲜卑政权把草原军事传统与汉地城郭制度结合。"),
      southwest: region("rival", "成汉", "成都平原在北方混战中形成独立政权和移民社会。"),
      steppe: region("exchange", "北魏兴起地", "拓跋鲜卑从草原南缘进入北方城市与农耕区。"),
    },
  },
  {
    eraId: "northern-southern",
    capital: "洛阳／邺／长安与建康",
    scope: "420—589",
    confidence: "较高",
    summary: "南北长期并立：北方经历北魏及其分裂，南方宋齐梁陈相继更替；人口迁移与制度互学使文化边界比政治边界更流动。",
    atmosphere: ["南方门阀与北方军镇并存", "族群融合和宗教共同体跨越政权"],
    culture: ["佛教石窟、造像和义学兴盛", "诗歌、骈文、书法、史学与地理学繁荣"],
    customs: ["北方服制和汉式礼仪相互调整", "江南园林、青瓷与高坐家具逐步普及"],
    routes: ["洛阳—河西佛教通道", "建康—岭南与海上交流"],
    phases: { early: "刘宋与北魏形成南北对峙。", middle: "北魏迁洛与南朝文化成熟，制度互学加深。", late: "北方重新整合，南朝军政资源衰弱，趋向隋统一。" },
    regions: {
      heartland: region("rival", "北朝政治中心", "平城、洛阳、邺等中心反映鲜卑传统与汉地制度的融合。"),
      steppe: region("controlled", "北魏北部基础", "六镇等军事区域连接草原社会与北朝国家。"),
      "lower-yangtze": region("rival", "南朝建康文化圈", "建康、会稽及江南庄园构成文学、佛教和精英生活中心。"),
      jianghuai: region("uncertain", "南北拉锯地带", "淮河两岸城镇、人口和制度在战争中多次易手。"),
      southwest: region("controlled", "巴蜀与南朝腹地", "巴蜀为南朝粮运、军事和佛教传播的重要区域。"),
      northwest: region("exchange", "河西与石窟走廊", "敦煌、云冈、龙门等网络体现宗教艺术与人员流动。"),
    },
  },
  {
    eraId: "sui",
    capital: "大兴城／洛阳",
    scope: "581—618/619",
    confidence: "较高",
    summary: "隋结束南北分裂，以双都、运河和驿路重新连接北方政治中心与江南经济区；边疆远征并不等于稳定文化同质化。",
    atmosphere: ["制度整合与统一秩序重建", "工程、迁徙和战争造成高强度流动"],
    culture: ["科举、官制和律令为唐代奠基", "佛教舍利、白瓷和城市规划受重视"],
    customs: ["南北服饰饮食继续融合", "驿路、运河和东都营建改变旅行与城市生活"],
    routes: ["大运河南北轴", "长安—洛阳—东北远征线"],
    phases: { early: "统一初期节俭整顿，南北制度合流。", middle: "运河、东都和礼制工程集中推进。", late: "远征、徭役和起义使日常秩序迅速军事化。" },
    regions: {
      guanzhong: region("core", "大兴城与关中", "新都规划、中央官制和西北交通在关中集中。"),
      heartland: region("core", "洛阳与东部枢纽", "东都连接河北、江淮和运河，是全国物资调度中心。"),
      jianghuai: region("controlled", "运河交汇区", "江淮粮运和城市因南北交通工程而更加重要。"),
      "lower-yangtze": region("controlled", "江南经济区", "陈地并入后，江南物资和文化持续北上。"),
      northeast: region("exchange", "高句丽战争前线", "东北方向长期处于战争动员，不能视作稳定内地。"),
      northwest: region("exchange", "西域与突厥互动", "使节、贸易和战争共同塑造隋的西北边疆。"),
    },
  },
  {
    eraId: "tang",
    capital: "长安／洛阳",
    scope: "618—907",
    confidence: "较高",
    summary: "唐以前期统一帝国、后期藩镇网络和跨欧亚交流共同构成文化版图。控制范围随战争变化，丝路与海路却持续传递宗教、艺术和生活方式。",
    atmosphere: ["开放、自信与多族群都会生活", "科举、门第、军镇在不同时段共同影响社会"],
    culture: ["诗歌、书法、壁画、佛道艺术高度繁荣", "长安汇集粟特、龟兹、吐蕃、朝鲜半岛与日本等文化"],
    customs: ["胡服、胡妆、胡食、胡乐一度流行", "饮茶普及，妇女骑马、马球和节日游乐进入城市风尚"],
    routes: ["长安—天山丝路", "广州、扬州等海陆商路"],
    phases: { early: "统一扩张、制度开放，长安形成国际都会。", middle: "开元繁荣后安史之乱改变人口、财政和审美。", late: "藩镇与南方经济上升，都市文化向区域中心扩散。" },
    regions: {
      guanzhong: region("core", "长安国际都会", "宫城、坊市、寺院和胡商社区共同构成唐前期文化中心。"),
      heartland: region("core", "洛阳与中原", "东都、运河和科举网络连接全国士人和物资。"),
      northwest: region("controlled", "河西军镇与石窟", "军镇、商旅和佛教艺术沿河西走廊密集分布，控制程度多次变化。"),
      "western-regions": region("exchange", "天山绿洲网络", "安西、北庭及绿洲城邦连接中亚，政治归属随战争变化。"),
      steppe: region("exchange", "唐—突厥—回鹘互动", "册封、互市、战争和盟约使草原成为帝国体系的重要合作与竞争区。"),
      "lower-yangtze": region("controlled", "江南财赋与文艺", "安史之乱后江南城市、茶业和运河财赋地位明显上升。"),
      lingnan: region("exchange", "广州海上门户", "海商、香料与多宗教社群连接南海和印度洋。"),
      plateau: region("rival", "吐蕃高原政权", "吐蕃与唐既战争又会盟，宗教、婚姻和物质文化持续互动。"),
    },
  },
  {
    eraId: "five-dynasties",
    capital: "开封、洛阳与南方多国都城",
    scope: "907—960",
    confidence: "较高",
    summary: "中原五代快速更替，南方十国与北方契丹并立。政治碎片化没有中断陶瓷、印刷、茶业和城市文化的发展。",
    atmosphere: ["军镇政治与短朝更替", "区域宫廷竞相发展自身文艺和经济"],
    culture: ["雕版印刷、词与宫廷绘画发展", "越窑秘色瓷、南唐艺术和敦煌文化延续"],
    customs: ["茶饮深入城市与寺院生活", "南方水乡商业和区域节俗更加鲜明"],
    routes: ["开封—河北军政轴", "江南、闽粤与海路网络"],
    phases: { early: "唐末军镇转化为地方王国。", middle: "南北多中心文化稳定发展。", late: "后周整军与北宋统一趋势增强。" },
    regions: {
      heartland: region("rival", "五代中原", "开封、洛阳和河北军镇是五个短朝反复争夺的中心。"),
      "lower-yangtze": region("rival", "吴越与南唐", "杭州、金陵等城市发展水利、佛教、词和陶瓷文化。"),
      southwest: region("rival", "前蜀与后蜀", "成都平原在相对稳定阶段延续唐代文艺和城市生活。"),
      southeast: region("rival", "闽与沿海政权", "港口、茶叶和海贸支撑东南区域政权。"),
      lingnan: region("rival", "南汉", "广州维持海上贸易和多元人口网络。"),
      northeast: region("rival", "契丹兴起", "辽政权在东北与草原发展，与五代中原政治密切互动。"),
    },
  },
  {
    eraId: "liao",
    capital: "上京等五京",
    scope: "916—1125",
    confidence: "较高",
    summary: "辽以草原移动传统和五京城市体系共同治理农牧区域，南北面制度反映多种社会结构并存。",
    atmosphere: ["契丹部族传统与帝国官僚并行", "四时捺钵使宫廷随季节移动"],
    culture: ["佛教建筑、契丹文字和金银器发展", "草原艺术与中原城市文化互相吸收"],
    customs: ["游猎、乳肉饮食和帐幕礼仪保留", "燕云城市延续农耕、寺院和市场生活"],
    routes: ["五京巡幸网络", "宋辽榷场与东北交通"],
    phases: { early: "部族联盟转向五京帝国，吸收燕云制度。", middle: "宋辽长期和平，贸易和佛教文化繁盛。", late: "贵族政治固化，女真势力在东北崛起。" },
    regions: {
      steppe: region("core", "捺钵与草原中心", "皇帝随季节巡行，政治空间不是单一固定都城。"),
      northeast: region("core", "上京与契丹故地", "东北是部族、军政和辽文化象征的核心。"),
      heartland: region("controlled", "燕云与南京", "农耕城市、科举和汉地官僚制度在辽南部延续。"),
      northwest: region("controlled", "西京与西北通道", "西部城市连接草原、河套和中原贸易。"),
      guanzhong: region("exchange", "宋夏辽交界网络", "西南边界以盟约、互市和军事缓冲为主。"),
    },
  },
  {
    eraId: "northern-song",
    capital: "东京开封",
    scope: "960—1127",
    confidence: "较高",
    summary: "北宋疆域不及汉唐，却以城市、运河、市场、印刷和士大夫文化形成高密度网络；北部与辽、西北与西夏长期并立。",
    atmosphere: ["文官政治、科举和公共议论兴盛", "商业社会与精致城市消费扩张"],
    culture: ["理学、史学、词、山水画和印刷繁荣", "科学技术、瓷器和文房审美进入成熟阶段"],
    customs: ["瓦舍勾栏、茶坊酒楼与节日夜市繁盛", "临街店铺、广告和行会改变城市生活"],
    routes: ["汴河—江南漕运", "榷场与东南海贸"],
    phases: { early: "结束中原割据，收兵权并重建文官秩序。", middle: "仁宗以后都市与士大夫文化成熟，改革争论活跃。", late: "徽宗艺术宫廷与财政军政压力并存。" },
    regions: {
      heartland: region("core", "开封都市圈", "东京突破坊市界限，商铺、夜市、瓦舍和官署密集。"),
      jianghuai: region("controlled", "漕运咽喉", "淮河、运河把江南财赋送往开封，沿线城市快速发展。"),
      "lower-yangtze": region("controlled", "江南经济核心", "稻作、丝织、瓷业和出版支撑北宋财政与文化。"),
      northwest: region("rival", "宋夏边境", "堡寨、榷场与战争并存，文化交流没有因边界停止。"),
      northeast: region("rival", "辽宋并立", "燕云地区属辽，宋辽之间以澶渊盟约和贸易维持长期关系。"),
      lingnan: region("exchange", "广州与海贸", "南海航路带来香药、珠宝和多元商人社群。"),
    },
  },
  {
    eraId: "western-xia",
    capital: "兴庆府",
    scope: "1038—1227",
    confidence: "较高",
    summary: "西夏控制河套、河西和部分绿洲通道，以党项政治传统、汉地制度与藏传佛教等多重文化构成区域国家。",
    atmosphere: ["军政共同体与边贸社会结合", "多文字、多宗教和多语言并存"],
    culture: ["西夏文字、佛经刊刻和壁画发展", "党项服饰与汉式官制相互影响"],
    customs: ["农耕、牧业和军户生活并存", "佛教节仪、边市贸易和驿路旅行活跃"],
    routes: ["河西走廊", "宋夏榷场与青藏周缘"],
    phases: { early: "李元昊建国，强化党项身份和军政制度。", middle: "宋辽金之间维持外交与贸易，佛教文化成熟。", late: "蒙古战争破坏城镇与绿洲网络。" },
    regions: {
      northwest: region("core", "河西—河套核心", "兴庆府、凉州等连接农牧资源和丝路城市。"),
      "western-regions": region("exchange", "绿洲商路", "西夏影响部分河西西端，但西域政治关系复杂。"),
      plateau: region("exchange", "党项与吐蕃互动", "青藏周缘存在贸易、宗教和军事联系。"),
      guanzhong: region("rival", "宋夏边境", "陕北堡寨和榷场是战争与物资交流并存的前线。"),
      steppe: region("exchange", "辽金蒙古方向", "北方外交格局不断变化，最终受蒙古扩张冲击。"),
    },
  },
  {
    eraId: "jin-dynasty",
    capital: "上京／中都／汴京",
    scope: "1115—1234",
    confidence: "较高",
    summary: "金从东北女真联盟扩展到华北，首都南移，女真制度与中原城市、科举和礼法逐渐交织。",
    atmosphere: ["女真军政传统与汉地官僚治理并行", "南北人口迁徙和身份调整持续"],
    culture: ["金代文学、院本和碑刻发展", "儒学、佛道与女真文字同时存在"],
    customs: ["射猎、骑射和女真服俗受到提倡", "华北城市饮食、戏曲和市场生活延续宋代基础"],
    routes: ["东北—燕京迁都轴", "宋金榷场与黄河防线"],
    phases: { early: "女真联盟灭辽，军事传统占主导。", middle: "迁都中都后，中原制度与都市文化加速吸收。", late: "迁汴与蒙古战争使社会高度军事化。" },
    regions: {
      northeast: region("core", "女真兴起地", "上京与东北部族网络保留金朝政治记忆和制度来源。"),
      heartland: region("core", "中都与华北", "燕京、河北和山东成为人口与税赋核心，城市文化繁盛。"),
      steppe: region("exchange", "蒙古与北疆", "草原关系由联盟、战争转为蒙古持续进攻。"),
      jianghuai: region("rival", "宋金边界", "淮河和黄河一带长期形成军镇、榷场和人口迁移带。"),
      guanzhong: region("controlled", "陕西军镇", "关中处于金、西夏、南宋多方力量交汇处。"),
    },
  },
  {
    eraId: "southern-song",
    capital: "临安",
    scope: "1127—1279",
    confidence: "较高",
    summary: "南宋以江南、江淮、巴蜀和东南海路维系统治，政治疆域缩小但商业、教育、技术和海洋联系高度集中。",
    atmosphere: ["偏安危机感与江南都市繁华并存", "士大夫理学、地方书院和宗族组织增强"],
    culture: ["南宋山水、院体画、词与理学成熟", "印刷、瓷器、海船和火器技术发展"],
    customs: ["临安夜市、茶坊、节庆和游湖活动繁盛", "精致饮食、香药和市民娱乐商业化"],
    routes: ["临安—泉州海陆网络", "长江—四川军粮线"],
    phases: { early: "南渡重建，北方移民与江南社会重新组合。", middle: "临安都市与书院、海贸达到繁荣。", late: "蒙古压力加强，沿江沿海转入持续战争。" },
    regions: {
      "lower-yangtze": region("core", "临安与江南", "都城、丝织、出版、园林和文人文化在江南高度集中。"),
      jianghuai: region("controlled", "淮河防线与市场", "前线军镇、榷场和南北人口流动共同塑造江淮。"),
      southwest: region("controlled", "四川战区与文化区", "成都平原支撑财政和军事，也是印刷与学术重镇。"),
      southeast: region("controlled", "福建生产与港口", "瓷业、造船和山海交通连接内陆与泉州。"),
      lingnan: region("exchange", "海上贸易南口", "广州及南海航线继续连接东南亚和印度洋。"),
      heartland: region("rival", "金与蒙古控制区", "中原不属南宋，但人员、文本和商品仍跨越边界。"),
    },
  },
  {
    eraId: "yuan",
    capital: "大都／上都",
    scope: "1271—1368",
    confidence: "较高",
    summary: "元把草原、汉地、高原和欧亚驿路纳入同一帝国网络，但各地区使用不同制度与身份分类，不能以单一文化色块概括。",
    atmosphere: ["跨大陆帝国与多族群城市", "行省、驿站和多语言行政促进大范围流动"],
    culture: ["元曲、杂剧、青花瓷和多宗教艺术繁荣", "汉传与藏传佛教、道教、伊斯兰教和基督教并存"],
    customs: ["蒙古宫廷保留游猎、乳肉与宴饮传统", "大都、杭州、泉州等城市汇集不同语言和饮食"],
    routes: ["大都—上都季节轴", "欧亚站赤与泉州海路"],
    phases: { early: "忽必烈建立大都和行省，制度多元试验。", middle: "驿路、海贸和跨区域文化交流达到高峰。", late: "财政、灾荒和继承冲突削弱全国网络。" },
    regions: {
      steppe: region("core", "蒙古草原与上都", "草原政治传统、季节巡幸和帝国贵族网络仍具核心地位。"),
      heartland: region("core", "大都与北方行省", "大都连接中央机构、工匠、宗教和欧亚使节。"),
      "lower-yangtze": region("controlled", "江南财赋与城市", "杭州、江南农业和手工业支撑帝国财政。"),
      plateau: region("controlled", "吐蕃地区与帝师体系", "藏传佛教与中央政治联系加深，地方治理仍具自身结构。"),
      "western-regions": region("exchange", "中亚与西域通道", "商人、工匠、学者和军队沿驿路跨区域流动。"),
      southwest: region("controlled", "西南行省与土官", "行省与地方首领制度并用，文化和治理差异明显。"),
      lingnan: region("exchange", "泉州—广州海贸", "港口连接东南亚、南亚和西亚，多宗教遗迹集中。"),
      northeast: region("controlled", "辽阳行省", "东北连接高丽、女真诸部与草原交通。"),
    },
  },
  {
    eraId: "ming",
    capital: "南京／北京",
    scope: "1368—1662（含南明）",
    confidence: "较高",
    summary: "明从南京建国、北京定都到晚期区域社会繁荣，形成以里甲、卫所和驿路为骨架的帝国；海禁与海贸始终存在张力。",
    atmosphere: ["皇权礼制、宗族和科举深入地方", "中后期商品文化、出版和个性消费兴盛"],
    culture: ["小说、戏曲、书画、刻书和瓷器繁荣", "晚明西学、地图和新知识进入士人网络"],
    customs: ["宗族祭祀、乡约和岁时节庆更制度化", "棉布、茶、家具、园林和城市时尚扩散"],
    routes: ["北京—南京运河轴", "郑和航路与东南民间海贸"],
    phases: { early: "移民垦荒、礼制重建，南京向北京双中心转换。", middle: "海陆交流与城市消费扩大，士人文化活跃。", late: "财政、气候、边防和党争压力下，地方结社与流民增多。" },
    regions: {
      heartland: region("core", "北京与北直隶", "迁都后北京成为宫廷、军政和北方防线的中心。"),
      "lower-yangtze": region("core", "江南财赋与文化", "南京、苏州、松江等地集聚棉纺、出版、园林和消费文化。"),
      jianghuai: region("controlled", "运河与漕运", "淮扬城市连接南北粮运、盐业和士商网络。"),
      northwest: region("exchange", "九边与西北贸易", "长城军镇、马市和蒙古关系共同构成北部边疆。"),
      northeast: region("rival", "辽东与女真互动", "卫所、互市和战争长期交错，晚期后金崛起。"),
      southwest: region("controlled", "土司与改土归流前线", "中央官府、土司和移民社会并存，控制程度不一。"),
      southeast: region("exchange", "闽浙海商网络", "海禁、倭患和民间贸易并行，港口连接东亚与东南亚。"),
      lingnan: region("exchange", "广州与澳门窗口", "16世纪后葡萄牙人和耶稣会士带来新的商品与知识交流。"),
    },
  },
  {
    eraId: "qing",
    capital: "盛京／北京",
    scope: "1616/1636—1912",
    confidence: "较高",
    summary: "清以满洲制度、明代官僚体系和多种边疆治理方式构成多民族帝国。地图区分直接行政、盟旗、驻藏与区域互动，不画单一均质边界。",
    atmosphere: ["多民族帝国礼仪与高度集中的皇权", "18世纪繁荣与19世纪全球冲击并存"],
    culture: ["经学、考据、档案、戏曲和大型文献工程发展", "宫廷艺术吸收满、蒙、藏、汉及欧洲技术"],
    customs: ["满洲宫廷骑射、祭祀与汉地礼俗并存", "茶馆、庙会、地方戏和区域饮食更加多样"],
    routes: ["北京—盛京与木兰秋狝线", "广州口岸、恰克图与西北驿路"],
    phases: { early: "入关与制度磨合，战争、迁界和社会重建并行。", middle: "康雍乾时期版图整合、人口增长和宫廷文化繁盛。", late: "条约口岸、改革和新式知识改变城市与社会风气。" },
    regions: {
      northeast: region("core", "满洲故地与盛京", "盛京、陵寝和八旗传统保留王朝起源记忆。"),
      heartland: region("core", "北京与华北中枢", "紫禁城、理藩院、军机处和全国官僚网络汇集于北京。"),
      "lower-yangtze": region("controlled", "江南经济文化区", "盐业、丝茶、出版和园林继续繁荣，也承受赋税与政治审查。"),
      steppe: region("controlled", "蒙古盟旗体系", "会盟、封爵、藏传佛教和牧地制度构成区别于内地的治理方式。"),
      "western-regions": region("controlled", "新疆军府与绿洲", "驻军、伯克、商路和移民共同构成多层治理。"),
      plateau: region("controlled", "西藏与驻藏体系", "中央、达赖喇嘛体系和地方贵族共同参与治理与宗教秩序。"),
      southwest: region("controlled", "西南改土归流", "流官、土司、移民和多族社区在不同区域并存。"),
      lingnan: region("exchange", "广州与条约口岸", "早期广州贸易制度、19世纪条约口岸和海外移民重塑南方沿海社会。"),
      northwest: region("controlled", "陕甘与西北通道", "军政、宗教和跨区域商贸交织，19世纪动荡尤为剧烈。"),
    },
  },
];

export const cultureAtlasByEra = Object.fromEntries(cultureAtlas.map((entry) => [entry.eraId, entry])) as Record<string, CultureAtlasEntry>;

export const cultureAtlasSources = [
  { label: "中国国家博物馆｜古代中国基本陈列", url: "https://www.chnmuseum.cn/portals/0/web/zt/gudai/default.html?d=123" },
  { label: "中国国家博物馆｜夏商西周时期", url: "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail2.html" },
  { label: "中国国家博物馆｜秦汉时期", url: "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail4.html" },
  { label: "中国国家博物馆｜三国两晋南北朝", url: "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail5.html" },
  { label: "中国国家博物馆｜隋唐五代时期", url: "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail6.html" },
  { label: "中国国家博物馆｜辽宋夏金元时期", url: "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail7.html" },
  { label: "中国国家博物馆｜明清时期", url: "https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail8.html" },
  { label: "UNESCO｜丝绸之路：长安—天山廊道", url: "https://whc.unesco.org/en/list/1442" },
  { label: "UNESCO｜泉州：宋元中国的世界海洋商贸中心", url: "https://whc.unesco.org/en/list/1561/" },
  { label: "故宫博物院｜宫廷历史", url: "https://www.dpm.org.cn/explores/courts.html" },
];
