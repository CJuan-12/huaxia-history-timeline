import type { RawPsychologyEntry } from "./ruler-psychology-types";

type Code = RawPsychologyEntry["code"];
type Confidence = RawPsychologyEntry["confidence"];
type Archetype = RawPsychologyEntry["archetype"];
type Relations = RawPsychologyEntry["relations"];

function profile(
  code: Code,
  confidence: Confidence,
  archetype: Archetype,
  basis: string,
  relations?: Relations,
): RawPsychologyEntry {
  return relations ? { code, confidence, archetype, basis, relations } : { code, confidence, archetype, basis };
}

/**
 * MBTI here is a modern interpretive lens, not a clinical diagnosis. Early
 * dynastic narratives are often retrospective, while child, puppet and
 * short-reigned rulers rarely left enough individual behaviour to separate
 * personality from their court's actions. Those cases deliberately remain
 * low-confidence candidates.
 */
export const earlyPsychologyEntries: Record<string, RawPsychologyEntry> = {
  // 夏：多数事迹出自后世传说层，均只作低置信候选。
  "xia:禹": profile("ISTJ", "low", "founder", "治水、巡行与划定秩序的叙事突出长期责任和务实执行，但材料成书远晚于其时代", {
    emotion: "后世叙事以长期治水和克己奉公塑造其情感表达，无法还原日常私人感受",
    family: "传说记其承接父亲鲧未竟的治水任务，并由禅让走向启的世袭继承",
    outerStates: "会诸侯与划九州的故事反映后世对其统合地方共同体的想象",
  }),
  "xia:启": profile("ESTJ", "low", "founder", "世袭王权和讨伐有扈氏的传统叙事表现出名分控制与军事执行，但历史层累明显", {
    family: "传统把他从父禹受位视为禅让转向世袭的关键，不能据此推断真实亲子情感",
    outerStates: "甘之战叙事把不服从者置于征讨对象，体现传说中的强制整合方式",
  }),
  "xia:太康": profile("ESFP", "low", "aesthete", "“太康失国”把其描写为沉溺游猎而疏于政务，这更接近政治劝诫文本而非连续行为记录", {
    emotion: "游猎失政是后世反复书写的道德化形象，只能提示即时享乐倾向",
  }),
  "xia:仲康": profile("ISFJ", "low", "court-bound", "羿控制政局背景下的在位记载有限，名义王权与本人决策难以区分"),
  "xia:相": profile("ISFJ", "low", "crisis-ruler", "其事迹主要存在于寒浞攻灭夏后与遗腹子少康的复国叙事，个体选择记录极少", {
    family: "现存传统更重视其死亡与后嗣少康延续夏统，无法据此判断家庭相处方式",
  }),
  "xia:少康": profile("ENTJ", "low", "founder", "少康中兴叙事强调隐忍积累盟友、分兵复国和重建统治，适合战略组织型候选", {
    ministers: "传统记载其借助有虞氏及臣下力量复国，显示善于整合资源的后世形象",
    outerStates: "复国过程以结盟、经营据点和军事反攻为主，但具体细节难获同时代验证",
  }),
  "xia:杼": profile("ESTJ", "low", "conqueror", "后世仅以对东夷用兵和延续中兴概括其统治，较像行动与秩序导向候选"),
  "xia:槐": profile("ISFJ", "low", "ritual-ruler", "除世系与零散征伐传说外几乎无可核对的个体行为，暂按守成位置推断"),
  "xia:芒": profile("ISFJ", "low", "ritual-ruler", "可见材料主要是世系、祭祀及在位传说，无法区分本人意志与后世王统叙述"),
  "xia:泄": profile("ESTJ", "low", "consolidator", "后世记其册封或服属周边部族，若可信则偏向用名分巩固秩序，但证据很薄", {
    outerStates: "所谓周边方国来宾服主要见于后世王统叙述，不宜当作完整外交记录",
  }),
  "xia:不降": profile("ISTP", "low", "conqueror", "仅有长期在位与对外征伐的零散传统，暂以现实行动型候选处理"),
  "xia:扃": profile("ISFJ", "low", "ritual-ruler", "史料几乎只存名号和继承次序，没有足够行为可作稳定人格归因"),
  "xia:廑": profile("ISFJ", "low", "ritual-ruler", "短暂在位且叙事稀少，类型主要反映其礼制继承位置而非已知性格"),
  "xia:孔甲": profile("ESFP", "low", "aesthete", "养龙、好方鬼神等故事塑造出重体验而疏政治的形象，但神异色彩强烈", {
    emotion: "好事鬼神和养龙故事只能说明后世如何评价其兴趣，不能还原真实心理",
  }),
  "xia:皋": profile("ISFJ", "low", "ritual-ruler", "世系之外缺少可核对事件，暂以责任守成型作为最低限度候选"),
  "xia:发": profile("ISFJ", "low", "ritual-ruler", "现存材料不足以辨认个人决策风格，只能依据末期王位承接位置低置信推断"),
  "xia:桀": profile("ESTP", "low", "authoritarian", "暴虐、奢侈与武力压服的亡国叙事高度道德化，仍显示后世归给他的冲动控制形象", {
    ministers: "关龙逢进谏被杀属于经典亡国叙事，反映拒谏形象但细节成书较晚",
    partners: "妹喜常被后世归为亡国诱因，这种写法带有明显女性祸水框架，不据此推断亲密关系",
    outerStates: "对商汤及诸方国采取压制而最终失去支持，是传统解释夏亡的核心结构",
  }),

  // 商
  "shang:汤": profile("ENFJ", "low", "founder", "任用伊尹、争取诸侯并以讨桀建立新秩序的叙事突出关系动员，年代久远故仍低置信", {
    ministers: "传统反复强调汤任用伊尹并听取谋划，构成其善用贤臣的核心形象",
    outerStates: "通过盟会、征伐与政治号召削弱夏桀，表现为结盟和军事并用的统合路线",
  }),
  "shang:外丙": profile("ISFJ", "low", "ritual-ruler", "在位年数和继承次序本身存在异说，无法从王朝过渡行为中分离个人性格"),
  "shang:仲壬": profile("ISFJ", "low", "ritual-ruler", "材料几乎限于伊尹辅政下的继承位置，任何四维判断都只能是低置信候选"),
  "shang:太甲": profile("ISTJ", "low", "consolidator", "伊尹放逐后改过复位的叙事强调由失序转向守法，但文本也服务于辅政合法性", {
    ministers: "与伊尹的放逐、训诫和复位关系是主要材料，却难确认各版本的历史层次",
  }),
  "shang:沃丁": profile("ISFJ", "low", "ritual-ruler", "除祭祀伊尹与继承资料外事迹很少，暂按维护既有秩序推断"),
  "shang:太庚": profile("ISTJ", "low", "consolidator", "史籍多以守成概括，缺乏可连续观察的决策与关系材料"),
  "shang:小甲": profile("ISFJ", "low", "ritual-ruler", "现存传世叙事极少，类型仅是其王统位置的保守候选"),
  "shang:雍己": profile("ISFP", "low", "crisis-ruler", "传统称商道衰微且诸侯不至，但不能确定这是本人性格还是结构性困境", {
    outerStates: "诸侯不朝的记述只能显示王权关系恶化，不能独立证明其外交态度",
  }),
  "shang:太戊": profile("ENFJ", "low", "consolidator", "任伊陟、巫咸而复兴商道的传统强调纳谏与关系整合，仍受祥瑞叙事影响", {
    ministers: "伊陟、巫咸辅政和劝诫构成太戊中兴叙事的主要行为证据",
  }),
  "shang:仲丁": profile("ESTJ", "low", "crisis-ruler", "迁都与对蓝夷用兵的零散记载显示现实应变，但具体动机不明"),
  "shang:外壬": profile("ISFJ", "low", "ritual-ruler", "王室内争背景下仅存概括性记载，不能把政局直接归为本人性格"),
  "shang:河亶甲": profile("ISTP", "low", "crisis-ruler", "迁都、征伐与王权衰落并见，较像危局中的现实应变候选"),
  "shang:祖乙": profile("ENTJ", "low", "consolidator", "迁都并在巫贤辅佐下复兴的传统突出组织与重建，但史料链条有限", {
    ministers: "传统把巫贤辅政视为中兴因素，说明叙事重视其使用能臣的一面",
  }),
  "shang:祖辛": profile("ISTJ", "low", "consolidator", "除世系与祭名外个体行动罕见，按守成位置提出低置信类型"),
  "shang:沃甲": profile("ISFJ", "low", "ritual-ruler", "传世记录过少，无法判断其情绪和关系方式"),
  "shang:祖丁": profile("ISTJ", "low", "consolidator", "缺少明确个人事件，候选类型只反映延续王朝秩序的结构性角色"),
  "shang:南庚": profile("ISTP", "low", "crisis-ruler", "迁都奄等记述显示对现实压力的机动回应，但原因与本人作用均有争议"),
  "shang:阳甲": profile("ISFP", "low", "crisis-ruler", "诸侯不朝和商势衰落的传统材料无法区分个人失策与王室长期内耗"),
  "shang:盘庚": profile("ENTJ", "medium", "reformer", "《盘庚》所呈现的迁殷动员、说服与强制并用，显示清晰目标和组织控制", {
    emotion: "迁都诰辞表现出对反对、流言和秩序涣散的强烈焦虑，并把情绪转化为政治动员",
    ministers: "面对贵族和臣民抵制仍持续解释并要求服从，显示沟通与控制并用",
    outerStates: "迁殷意在重新组织王朝核心与地方联系，但不能等同后世藩属制度",
  }),
  "shang:小辛": profile("ISFJ", "low", "ritual-ruler", "盘庚之后的短期承继资料稀少，不能将商复衰完全解释为其人格"),
  "shang:小乙": profile("ISTJ", "low", "consolidator", "主要作为武丁之前的继承节点出现，个体行为不足以支持高置信推断"),
  "shang:武丁": profile("ENTJ", "medium", "conqueror", "甲骨与传世材料共同呈现持续征伐、任用傅说及扩大统合的主动领导风格", {
    ministers: "举用傅说的故事与甲骨所见复杂官僚军事活动，都支持重视可执行人才的形象",
    partners: "妇好参与征伐与祭祀有甲骨材料支持，显示王室伴侣也能承担重要公共角色，但不推断私人感情",
    outerStates: "频繁对土方、鬼方等方国用兵并经营联盟，表现出扩张性安全观",
  }),
  "shang:祖庚": profile("ISTJ", "low", "consolidator", "祭祀秩序与承接武丁成果是主要信息，个人决策材料仍有限"),
  "shang:祖甲": profile("INTJ", "low", "reformer", "周祭制度改革常与其联系，若归属可靠则表现出抽象制度化和长期规划", {
    family: "周祭改革以系统排列先王先妣为核心，显示对宗族名分的制度化处理而非私人亲疏",
  }),
  "shang:廪辛": profile("ISFJ", "low", "ritual-ruler", "可辨认材料主要是祭名与继承，缺乏个人行为证据"),
  "shang:庚丁": profile("ISTJ", "low", "ritual-ruler", "史料难以提供稳定的情感、用人与对外取向，暂作守序候选"),
  "shang:武乙": profile("ESTP", "low", "authoritarian", "射天、革囊盛血等反神权故事与游猎死亡叙事突出挑衅和冒险，但可能是周人贬抑", {
    emotion: "传世故事塑造其强烈挑战祭祀权威的姿态，真实性与象征性难分",
  }),
  "shang:文丁": profile("ESTJ", "low", "crisis-ruler", "杀季历与处理周族崛起的传统表现出防御性控制，但记载角度偏向周人", {
    outerStates: "与周族首领季历的冲突显示中央对强大地方集团的猜防，细节需考虑胜利者叙事",
  }),
  "shang:帝乙": profile("ISTJ", "low", "crisis-ruler", "末期征伐与联姻安排反映维持王朝秩序的努力，但个人记录有限", {
    outerStates: "传统所见对东夷战争及与周族婚姻，表现军事与联姻并用的边缘治理",
  }),
  "shang:帝辛": profile("ESTP", "low", "authoritarian", "能征战而惩罚严酷的形象较稳定，但酒池肉林及妲己叙事多有后世增饰", {
    ministers: "比干、箕子等忠臣受迫害是亡国叙事核心，能说明拒绝异议的传统评价",
    partners: "妲己被塑造成亡国原因带有强烈性别归罪，不用来推断帝辛真实亲密关系",
    family: "与微子、箕子等宗亲的决裂反映商末政治裂痕，不能简单等同私人无情",
    outerStates: "持续东征扩大军事负担，并在牧野面对周及盟军，是其对外路线的主要可见结果",
  }),

  // 西周
  "western-zhou:周武王": profile("ENFJ", "medium", "founder", "联合诸侯伐商、克商后分封并依靠周公姜尚，表现强烈动员与秩序重建能力", {
    ministers: "倚重周公旦、召公奭和姜尚等共同规划军事与分封，显示联盟式领导",
    family: "继承文王事业并任用宗亲镇抚新领土，宗族既是情感共同体也是制度资源",
    outerStates: "孟津会盟、牧野之战和克商后分封体现结盟、征服与安置并用",
  }),
  "western-zhou:周成王": profile("ISFJ", "medium", "court-bound", "幼年由周公摄政，亲政后延续礼制与东土经营，个人意志须与辅政集团区分", {
    ministers: "周公、召公辅政塑造早期秩序，成王与周公关系是理解其统治的核心但也充满后世规范化书写",
    family: "管蔡之乱与周公辅政使宗族关系直接成为政治危机，不能据名分推断私人亲疏",
  }),
  "western-zhou:周康王": profile("ISTJ", "low", "consolidator", "康王之治传统突出遵循先王成法和稳定封建秩序，个体性格材料仍不密集", {
    ministers: "《康王之诰》等文本强调与诸侯大臣共同守成和遵循先王法度",
  }),
  "western-zhou:周昭王": profile("ESTP", "low", "conqueror", "多次南征并最终死于汉水的记载突出冒险军事行动，失败原因与细节有异说", {
    outerStates: "对楚地南征是最清晰行为线索，显示以军事推进边疆控制的取向",
  }),
  "western-zhou:周穆王": profile("ENFP", "low", "conqueror", "远征与巡游传统塑造出好奇、开拓且重远方经验的君主形象，神话成分较多", {
    emotion: "《穆天子传》等巡游叙事突出对远方、交游与奇观的兴趣，但不能视为同步心理记录",
    outerStates: "征犬戎和西巡故事反映越出核心区经营关系的想象，制度背景与后世藩属不同",
  }),
  "western-zhou:周共王": profile("ISTJ", "low", "consolidator", "传世记录以继承、土地争议和零散惩罚故事为主，暂作守序候选"),
  "western-zhou:周懿王": profile("ISFJ", "low", "crisis-ruler", "王室衰微和外患背景多于个体行为，难将结构性压力直接人格化"),
  "western-zhou:周孝王": profile("ESTJ", "low", "consolidator", "越过嫡系即位并以养马封秦祖非子的传统表现出务实奖功和名分调整", {
    ministers: "因非子善养马而封邑的记载若可信，显示按具体功用给予回报",
  }),
  "western-zhou:周夷王": profile("ESTJ", "low", "authoritarian", "烹齐哀公等记载表现以严惩维护王威，但来源晚且动机存疑", {
    outerStates: "处置齐侯的故事反映中央与强大诸侯的紧张，不能据此复原完整政策",
  }),
  "western-zhou:周厉王": profile("ESTJ", "medium", "authoritarian", "专利、压制国人议论并最终遭放逐的叙事，持续呈现高度控制和拒绝反馈", {
    emotion: "对批评的防御和惩罚性反应在“道路以目”叙事中突出，但语言细节可能文学化",
    ministers: "任用荣夷公推行专利、以卫巫监谤，表现偏爱服从者并压缩异议",
    outerStates: "主要危机来自王畿内部，现有材料不足以建立稳定的对外关系风格",
  }),
  "western-zhou:周宣王": profile("ESTJ", "medium", "consolidator", "共和之后恢复王权、任贤与连续征伐体现秩序重建，同时晚期拒谏显示控制趋强", {
    ministers: "早期依靠召穆公、尹吉甫等推进中兴，晚期用人和纳谏评价转差",
    outerStates: "对猃狁、淮夷等持续用兵，体现以军事恢复周王室影响",
  }),
  "western-zhou:周幽王": profile("ESFP", "low", "crisis-ruler", "废申后太子并引发申侯联合外敌的政治后果明确，烽火戏诸侯细节则疑为后世增饰", {
    partners: "宠褒姒、废申后的继承调整有政治记录支撑，但“为博一笑戏诸侯”不宜当作可靠情感事实",
    family: "改立伯服破坏继承联盟并使申侯反叛，显示家庭名分与诸侯政治高度相连",
    outerStates: "失去部分诸侯支持后遭申侯与犬戎进攻，反映王室联盟管理失败",
  }),

  // 东周：王权多受诸侯和卿士制约。
  "eastern-zhou:周平王": profile("ISFJ", "low", "crisis-ruler", "在宗周覆亡后依赖诸侯东迁并维持王统，行为更像谨慎求存而非主动扩张", {
    family: "其继位与幽王废立冲突相连，政治合法性不能直接等同父子真实情感",
    outerStates: "依靠晋、郑、秦等护送东迁，显示周王室对诸侯支持的结构性依赖",
  }),
  "eastern-zhou:周桓王": profile("ESTJ", "low", "crisis-ruler", "试图削弱郑庄公并亲征繻葛，体现恢复王权的直接控制取向但以失败告终", {
    ministers: "与郑庄公的卿士权力冲突显示不愿容忍强臣兼任并坐大",
    outerStates: "亲率联军伐郑而受伤，表现以军事强制重建王室等级",
  }),
  "eastern-zhou:周庄王": profile("ISTJ", "low", "consolidator", "在位事件主要围绕平定王子克之乱与维持王畿，个体材料有限"),
  "eastern-zhou:周釐王": profile("ISFJ", "low", "ritual-ruler", "短期在位且主要作为齐桓公称霸背景中的礼制天子出现"),
  "eastern-zhou:周惠王": profile("ISFP", "low", "crisis-ruler", "宫廷继承冲突中一度出奔又靠诸侯复位，决策多受求存压力支配", {
    family: "王子颓之乱源于王室内部冲突，名分与利益比私人情感更可见",
    outerStates: "依靠郑、虢力量复位，体现周王对诸侯军事支持的依赖",
  }),
  "eastern-zhou:周襄王": profile("ISFJ", "low", "crisis-ruler", "叔带之乱与狄人入周迫使其出奔，最终倚晋文公复位，呈现谨慎求存", {
    family: "与弟王子带的冲突是政治继承与派系战争，不能还原兄弟私人关系",
    outerStates: "借晋文公之力复位并予以礼遇封赏，显示以名分回报强势诸侯",
  }),
  "eastern-zhou:周顷王": profile("ISFJ", "low", "ritual-ruler", "财政拮据到需诸侯助葬的记载突出王权结构性衰弱，个人行为难辨"),
  "eastern-zhou:周匡王": profile("ISFJ", "low", "ritual-ruler", "在位短且叙事稀少，暂以礼制象征型候选处理"),
  "eastern-zhou:周定王": profile("ISFJ", "low", "mediator", "楚庄王问鼎时以王孙满应对，王本人活动不清晰，较适合作为礼制协调位置理解", {
    outerStates: "面对楚势上升主要以礼制名分回应，具体答辩由王孙满完成，不能全归本人",
  }),
  "eastern-zhou:周简王": profile("ISFJ", "low", "ritual-ruler", "史料主要记录诸侯争霸年代事件，难提取其个人决策"),
  "eastern-zhou:周灵王": profile("INFP", "low", "ritual-ruler", "现存记载偏重礼仪、太子晋传说和王畿事件，私人性格无法可靠复原"),
  "eastern-zhou:周景王": profile("ESTJ", "low", "crisis-ruler", "铸大钱、作大钟并强行安排继承的记载显示控制与项目推动，但评价多负面", {
    ministers: "单穆公等对铸钱作钟提出反对而未被采纳，显示纳谏空间有限",
    family: "偏爱王子朝、改变继承安排引发后续王室战争，政治后果清晰但私人偏爱细节有限",
  }),
  "eastern-zhou:周悼王": profile("ISFJ", "low", "court-bound", "在王子朝之乱中即位不久遇害，几乎没有独立施政可供判断"),
  "eastern-zhou:周敬王": profile("ISTJ", "low", "crisis-ruler", "在晋国支持下与王子朝长期争位并重建王畿秩序，偏向谨慎守成", {
    family: "与王子朝的冲突属于继承战争，无法据敌对关系直接判断兄弟情感",
    outerStates: "多次依赖晋国介入平乱，反映周王室以名分换取诸侯军事支持",
  }),
  "eastern-zhou:周元王": profile("ISFJ", "low", "ritual-ruler", "可见材料多是诸侯政局和继承纪年，本人的行为记录不足"),
  "eastern-zhou:周贞定王": profile("ISFJ", "low", "ritual-ruler", "战国初王权进一步象征化，个体决策材料极少"),
  "eastern-zhou:周哀王": profile("ISFJ", "low", "court-bound", "即位数月即被弟杀害，无法从被动结局推断稳定人格"),
  "eastern-zhou:周思王": profile("ESTP", "low", "court-bound", "通过弑兄夺位后不久又被弟杀，唯一线索来自宫廷暴力且不足以构成完整类型"),
  "eastern-zhou:周考王": profile("ISTJ", "low", "consolidator", "在连续继承冲突后维持较长统治并封弟于河南，呈现务实名分安排", {
    family: "封弟揭为西周桓公属于宗族分治安排，既有安置也进一步分割王畿",
  }),
  "eastern-zhou:周威烈王": profile("ISTJ", "low", "ritual-ruler", "正式命韩赵魏为诸侯体现承认既成现实、以礼制吸纳权力变化", {
    outerStates: "册命三家为诸侯是其最重要的对外名分行为，更多是确认现实而非主动塑造",
  }),
  "eastern-zhou:周安王": profile("ISFJ", "low", "ritual-ruler", "在强国竞逐中主要维持名义共主位置，个体行为难以识别"),
  "eastern-zhou:周烈王": profile("ISFJ", "low", "ritual-ruler", "在位短且史料集中于诸侯变法战争，暂以礼制守成候选处理"),
  "eastern-zhou:周显王": profile("ISFJ", "low", "mediator", "通过致礼、册命与承认强国地位维持王室象征，更多是关系协调而非实权统治", {
    outerStates: "对秦等强国的礼遇显示用王室名分维持联系，但周已缺乏强制能力",
  }),
  "eastern-zhou:周慎靓王": profile("ISFJ", "low", "ritual-ruler", "短期在位且几无个体叙事，四维仅能作为礼制角色候选"),
  "eastern-zhou:周赧王": profile("ISFJ", "low", "crisis-ruler", "在秦扩张压力下周旋、求援并最终降秦，主要行为受亡国危机限定", {
    emotion: "“债台高筑”等故事呈现窘迫形象，但成语化叙事不等于连续情绪记录",
    outerStates: "在秦与东方诸侯间反复求援和组织抗秦，最终因实力悬殊而失去王畿",
  }),

  // 秦
  "qin:秦始皇嬴政": profile("ENTJ", "medium", "authoritarian", "兼并六国、统一制度并持续推动大型工程，显示强烈战略组织和结果控制取向", {
    emotion: "巡行、求仙和对刺杀的防备显示安全与永续焦虑，但正史不能提供完整私人情绪曲线",
    ministers: "重用李斯、王翦等专业人才，同时以严刑和高度服从压缩异议",
    family: "与太子扶苏在治政路线上的冲突有诏令和事件支持，不能扩展为完整父子感情判断",
    outerStates: "以军事吞并六国并在统一后北击匈奴、南取百越，追求单一帝国秩序而非平等共存",
  }),
  "qin:秦二世胡亥": profile("ISFP", "low", "court-bound", "即位过程和统治高度受赵高操控，享乐与回避政务的指控较多但也来自亡秦叙事", {
    ministers: "依赖赵高并隔绝其他意见，最终又被赵高逼死，显示名义君权与实际信息控制分离",
    family: "诛杀兄弟姐妹与扶苏之死有政治记录支撑，但具体主动程度受赵高、李斯操纵影响",
  }),
  "qin:秦王子婴": profile("ISTP", "medium", "crisis-ruler", "在极短危局中设谋诛赵高、收缩帝号并向刘邦投降，表现现实判断与快速应变", {
    ministers: "与近臣或家属密谋除赵高，显示在信息有限时使用小范围可信网络",
    outerStates: "面对刘邦入关选择降服以减少无望抵抗，主要是危机求存而非稳定外交风格",
  }),

  // 西汉
  "western-han:汉高祖刘邦": profile("ENTP", "medium", "founder", "从反秦联盟到楚汉战争不断调整策略，并善用不同专长臣将，表现高适应和外向动员", {
    emotion: "史籍保留其喜怒、戏谑和临场反应，情绪外露但也常服务于政治试探",
    ministers: "能让萧何、张良、韩信、陈平各展所长，同时对功臣坐大保持强烈戒心",
    partners: "吕后长期参与守关中和清除政治对手，能确认政治伙伴关系，私人亲密程度不作推断",
    family: "曾欲改立戚夫人之子如意，后在群臣压力下保留刘盈，显示家庭安排服从继承政治",
    outerStates: "对异姓诸侯王先联合后削平，并以和亲应对匈奴，联盟和妥协均高度务实",
  }),
  "western-han:汉惠帝刘盈": profile("ISFJ", "medium", "court-bound", "在吕后掌权下维持宽缓政策，对戚夫人遭遇表现强烈不适，呈现关系敏感但权力受限", {
    emotion: "《史记》《汉书》记其见“人彘”后悲恸并称不能治天下，虽具文学性仍是少有明确情绪线索",
    partners: "婚姻由吕后安排且皇后为近亲，材料主要关乎继承政治，不足以判断夫妻情感",
    family: "对母亲吕后的残酷做法表达拒斥却无力阻止，体现孝道、恐惧和君权受制的冲突",
  }),
  "western-han:前少帝刘恭": profile("INFP", "low", "court-bound", "幼年傀儡且因得知生母遭害后发怨言而被废杀，只能低置信看到情感性反应", {
    family: "关于怨恨吕后杀生母的记载是其唯一较具体表达，但年龄、传述与政治语境限制判断",
  }),
  "western-han:后少帝刘弘": profile("ISFJ", "low", "court-bound", "幼年在吕后和诸吕控制下即位，诸吕败后被废杀，几乎无独立行为记录"),
  "western-han:汉文帝刘恒": profile("ISFJ", "medium", "consolidator", "轻徭节用、慎刑与克制宫廷开支形成稳定守成风格，也善于在功臣集团间维持平衡", {
    emotion: "诏书多以自责、恤民和克制表达公共情感，但帝王诏令也有规范化修辞",
    ministers: "能容纳张释之、袁盎等直谏，并通过成例和节制维持官僚合作",
    partners: "窦皇后及慎夫人材料多涉及礼制位次；张释之纠正同席礼序后获采纳，不据此推测亲疏",
    family: "以代王入继后尊奉薄太后，孝行是政治与伦理共同语言，私人生活仍不可尽知",
    outerStates: "对匈奴以和亲、防御和有限反击并用，优先降低长期战争成本",
  }),
  "western-han:汉景帝刘启": profile("ESTJ", "medium", "consolidator", "削藩、平定七国并强化中央秩序体现果断执行，但处置晁错显示危机中的功利转向", {
    ministers: "采纳晁错削藩又在叛乱压力下诛晁错，显示对臣下以政策效果和危机需要为先",
    family: "废栗太子、改立刘彻与后宫外戚竞争相连，继承安排高度政治化",
    outerStates: "对诸侯国以削地和军事镇压重塑中央关系，对匈奴总体延续和亲防御",
  }),
  "western-han:汉武帝刘彻": profile("ENTJ", "medium", "conqueror", "长期推进边疆战争、财政动员与官僚改革，呈现连贯的扩张愿景和高度结果导向", {
    emotion: "求仙、封禅及晚年罪己调整显示宏大愿景与焦虑并存，但不作临床式解释",
    ministers: "广泛征用卫青、霍去病、桑弘羊等人才，同时严刑和政治案件使臣下安全感很低",
    partners: "后妃关系与外戚任用紧密相连；卫子夫最终卷入巫蛊之祸，不能以宠衰简单解释全部政治后果",
    family: "巫蛊之祸导致太子刘据起兵自杀，晚年又追悔平反，是其家庭与权力冲突的强证据",
    outerStates: "对匈奴转向大规模主动进攻，并经营西域、朝鲜和南越，追求帝国安全边界外推",
  }),
  "western-han:汉昭帝刘弗陵": profile("ISTJ", "medium", "court-bound", "幼年受霍光辅政，成年后在燕王等指控中继续信任霍光，显示谨慎守序但独立证据有限", {
    ministers: "面对上官桀等告发仍判断霍光无罪，显示对辅政核心的稳定信任；多数政策仍需区分霍光作用",
    partners: "上官皇后幼年入宫并与辅政权力结构相连，不能推断成熟亲密关系",
  }),
  "western-han:刘贺": profile("ESFP", "low", "court-bound", "二十七日被废时列举的失礼纵乐行为多由霍光集团定性，能见即时体验倾向但证据偏置", {
    emotion: "被废奏议集中描写其哀期纵乐，属于政治问罪材料，不能无条件当作完整性格",
    ministers: "从昌邑带来的属官与中央辅政集团冲突，是被废过程的重要结构背景",
  }),
  "western-han:汉宣帝刘询": profile("INTJ", "medium", "consolidator", "成长于民间后重视吏治实效、逐步削除霍氏并平衡儒法，表现审慎布局和现实治理", {
    ministers: "前期尊重霍光权势，霍光死后有步骤处理霍氏并重用能吏，体现耐心权力收束",
    partners: "“故剑”诏意支持册立旧妻许平君，能说明对既有关系的维护，但后续宫廷亦受霍氏暴力影响",
    family: "坚持立许平君之子刘奭为太子，即使不满其政治取向也未轻易更换，名分责任较强",
    outerStates: "在匈奴内部分裂时以军事与受降并用，形成呼韩邪入朝的相对稳定格局",
  }),
  "western-han:汉元帝刘奭": profile("INFP", "medium", "scholar", "好儒而重伦理名分，却在宦官外戚和用人判断间摇摆，表现价值理想强于执行控制", {
    emotion: "史籍称其多材艺、柔仁好儒，属于明确但带评价性的性情描述",
    ministers: "信任石显而疏远萧望之等儒臣，说明关系信任有时压过制度性核验",
    partners: "后妃与太子之争深受傅昭仪等宫廷关系影响，材料偏重继承政治而非亲密生活",
    outerStates: "延续与呼韩邪单于的和亲关系，王昭君出塞主要是国家婚姻安排，勿浪漫化为个人故事",
  }),
  "western-han:汉成帝刘骜": profile("ESFP", "medium", "aesthete", "游宴、后宫宠爱和把政务交给外戚的记载较集中，表现即时关系与体验压过长期控制", {
    emotion: "班婕妤、赵氏姐妹等材料呈现兴趣和亲近对象变化，但宫廷记述常带道德评判",
    ministers: "王氏外戚长期掌权，成帝对亲缘信任削弱了对官僚与权力边界的控制",
    partners: "宠赵飞燕、赵合德并废许后是明确宫廷政治事件，但不能把亡国责任归咎后妃个人",
    family: "无在世继承人使宗室选嗣成为核心问题，史书中的后宫案件需注意指控偏见",
  }),
  "western-han:汉哀帝刘欣": profile("ISFP", "medium", "court-bound", "试图抑制王氏却又把权力集中给董贤及祖母傅氏，显示私人忠诚和即时关系强烈影响用人", {
    emotion: "对董贤的特殊亲近有同时代政治记录，但“断袖”故事的文学化细节不等于完整情感画像",
    ministers: "一面起用改革派限制兼并，一面骤然提拔董贤，制度目标常被亲近关系干扰",
    partners: "婚姻后妃材料不足；董贤作为男性近臣与宠幸对象更能说明亲近关系政治化，但不替其确定现代性身份",
    family: "傅太皇太后与丁氏外戚影响朝局，表明宗族关系与皇权资源重新分配密切相连",
  }),
  "western-han:汉平帝刘衎": profile("ISFJ", "low", "court-bound", "幼年被王莽控制，婚姻、任命和礼制均由摄政集团安排，难见独立人格", {
    partners: "王莽将女儿立为皇后属于权力联姻，平帝当时年幼，不推断夫妻情感",
    family: "母族卫氏被限制入京，反映王莽隔离幼主亲族，而非平帝本人的态度",
  }),

  // 新末
  "xin:王莽": profile("INTJ", "medium", "reformer", "借儒家名分长期积累权力并大规模重构土地、货币和官制，显示抽象制度规划与强控制", {
    emotion: "反复以谦让、礼制和天命符号表达自我，既可能有信念也具有明确政治表演功能",
    ministers: "偏好能执行古制方案者，政策频繁而僵硬，对反对与失败反馈容忍度低",
    family: "曾逼迫或处死涉案儿子以维护名声与纪律，显示政治正当性可压过亲情；具体案情仍由官方叙述塑形",
    outerStates: "更改匈奴、高句丽等称号并强行套用等级名分，引发边疆关系恶化",
  }),
  "xin:更始帝刘玄": profile("ESFP", "low", "court-bound", "由绿林军拥立后畏惧临朝、用人受亲近集团影响，乱局中缺乏稳定控制", {
    emotion: "《后汉书》记其即位时羞愧流汗、举手不能言，呈现强烈场合焦虑但只是单次观察",
    ministers: "政权由绿林诸将分权，封赏与任用缺少有效整合，不能把全部失败归于个人",
    outerStates: "面对赤眉和各地割据缺乏连贯策略，最终向赤眉投降求存",
  }),
  "xin:刘盆子": profile("ISFJ", "low", "court-bound", "少年牧牛时被赤眉抽签立为帝，始终缺乏实权，任何人格判断都只能依据其被动与求生", {
    emotion: "记载称其仍想脱离帝位并在受降时惶恐，符合少年处境但不足以建立稳定类型",
    ministers: "赤眉将领掌握实际决策，他只是合法性符号，不能把军队行为归为其态度",
    outerStates: "向刘秀投降后获赦并被安置，显示危局中接受现实而非形成独立外交路线",
  }),

  // 东汉
  "eastern-han:光武帝刘秀": profile("ISTJ", "medium", "founder", "从河北逐步整合群雄、统一后恢复农桑并安置功臣，表现审慎节奏和务实秩序感", {
    emotion: "公开叙事常见克制、幽默与念旧，但这些片段不足以还原完整私人情感",
    ministers: "能长期使用邓禹、冯异等功臣并以荣养解除兵权，兼顾信任与皇权安全",
    partners: "阴丽华与郭圣通的后位变更兼有旧情、功臣联盟和继承政治，不能简化为爱情选择",
    family: "接受刘疆辞让太子位并保全其东海王爵，随后改立刘庄，显示继承调整与宗室安置并重",
    outerStates: "对割据者先招降后征讨，并对匈奴分裂采取谨慎边防，避免持续高动员",
  }),
  "eastern-han:明帝刘庄": profile("ESTJ", "medium", "authoritarian", "严察官吏、强化中央并主动经营西域，表现制度执行和高标准控制，惩治也相当严厉", {
    ministers: "尊师桓荣而对官吏考核苛严，既重经术名分也强调服从与绩效",
    family: "楚王英案牵连广泛宗室臣民，显示对宗族政治威胁采取严厉处置",
    outerStates: "派窦固等击匈奴、恢复西域联系，偏向主动军事与行政推进",
  }),
  "eastern-han:章帝刘炟": profile("ESFJ", "medium", "mediator", "白虎观议经、宽缓刑政和协调儒家异说，呈现重礼制共识与关系整合", {
    ministers: "召集诸儒讨论五经同异并形成白虎观议，表现以公开礼学共识服务治理",
    partners: "窦皇后与宋、梁贵人冲突影响继承，史书带有后族立场，不推断其真实亲密偏好",
    outerStates: "总体延续对北匈奴压力和西域经营，同时对财政战争成本较审慎",
  }),
  "eastern-han:和帝刘肇": profile("INTJ", "medium", "court-bound", "少年受窦氏控制后联合宦官清除窦宪，亲政显示隐忍布局与权力收束", {
    ministers: "借郑众等少数近臣突然解除窦宪兵权，证明其能在受制环境中秘密组织行动",
    family: "政变针对外戚窦氏而窦太后仍获尊奉，显示政治清算与礼制名分被分别处理",
    outerStates: "窦宪北征主要发生在亲政前，不能直接当作和帝个人扩张偏好",
  }),
  "eastern-han:殇帝刘隆": profile("ISFJ", "low", "ritual-ruler", "百日婴儿即位且次年夭折，完全没有可归属于本人的决策行为"),
  "eastern-han:安帝刘祜": profile("ISFJ", "low", "court-bound", "早期由邓太后主持政务，亲政后又依赖乳母王圣和宦官，独立风格与宫廷网络难分", {
    ministers: "先受邓氏辅政，后清算邓氏并信任宦官乳母集团，显示用人受亲近网络显著影响",
    family: "与邓太后、宋氏母族的关系被继承斗争塑造，不可直接转换成亲疏心理",
  }),
  "eastern-han:北乡侯刘懿": profile("ISFJ", "low", "court-bound", "由阎太后外戚拥立且在位仅数月病死，没有独立行为材料"),
  "eastern-han:顺帝刘保": profile("ISFJ", "low", "court-bound", "经宦官政变拥立即位后长期受梁氏与宦官结构影响，个人施政证据有限", {
    ministers: "宦官十九侯因拥立获封，随后梁氏外戚坐大，说明皇权依赖宫廷集团",
    partners: "梁皇后婚姻与梁氏权力扩张相连，现存材料主要是外戚政治",
  }),
  "eastern-han:冲帝刘炳": profile("ISFJ", "low", "court-bound", "两岁即位、三岁夭折，政策属于梁太后与辅政集团，不能归因本人"),
  "eastern-han:质帝刘缵": profile("INFJ", "low", "court-bound", "幼年称梁冀为跋扈将军后被毒杀，片段显示敏锐道德判断但不足以形成稳定类型", {
    emotion: "对梁冀的公开批评显示直接不满和价值判断，但其年龄与单一事件要求低置信",
    ministers: "与权臣梁冀的冲突最终致命，君臣名分完全不能转化为实际控制",
  }),
  "eastern-han:桓帝刘志": profile("ISTP", "medium", "crisis-ruler", "联合宦官诛梁冀时行动果断，随后又倚宦官并压制士人，表现危局应变强于制度建设", {
    ministers: "借单超等宦官除梁冀后重赏五侯，党锢又打击士人，信任集中于宫廷执行者",
    partners: "梁皇后、邓皇后与窦皇后的更替均牵涉外戚政治，不能据废立直接推断亲密情感",
  }),
  "eastern-han:灵帝刘宏": profile("ESFP", "medium", "aesthete", "西园游乐、卖官聚财与倚重宦官的持续记录，显示即时兴趣和亲近网络凌驾制度约束", {
    emotion: "亲自模拟市肆、营建西园等记载表现强烈体验兴趣，但史家亦借此构造亡国警示",
    ministers: "信任十常侍并称张让为父、赵忠为母，是宫廷依赖的明确政治语言",
    partners: "何皇后与王美人冲突影响皇子继承，材料涉及宫廷暴力，不能归咎单一后妃",
    family: "迟疑于刘辩、刘协之间的继承安排，未能在生前建立稳定交接",
  }),
  "eastern-han:少帝刘辩": profile("ISFP", "low", "court-bound", "少年即位后受何进、宦官和董卓相继控制，被废杀前几无自主施政", {
    family: "母何太后及舅何进主导其政治位置，亲缘保护随后因宫廷政变瓦解",
  }),
  "eastern-han:献帝刘协": profile("INFJ", "medium", "crisis-ruler", "长期在董卓、李傕和曹操控制下仍借礼制、密诏与有限联盟维护汉统，显示价值坚持但行动空间狭窄", {
    emotion: "流离与受制叙事记录其恐惧、哀求和维护尊严，但多发生在极端危机环境",
    ministers: "衣带诏等反曹行动显示会使用少数忠臣网络，同时多数任命受曹操政权控制",
    partners: "伏皇后卷入反曹密谋并被杀，夫妻关系只能从共同政治风险观察，勿补写私人对白",
    family: "董贵人、伏皇后及皇子遭政治清洗，宗室家庭成为权臣控制皇权的直接对象",
    outerStates: "对各割据势力几无独立军政资源，诏命主要提供汉室合法性",
  }),

  // 三国
  "three-kingdoms:曹丕": profile("ENTJ", "medium", "consolidator", "完成代汉、建立九品中正并整合曹魏权力，同时文学创作显示战略与审美并存", {
    emotion: "与文士唱和和《典论》显示强烈自我表达，猜忌与竞争叙事也多见于继承斗争",
    ministers: "倚重陈群等建立制度，也对不顺从者惩处严厉，重执行和个人服从",
    partners: "赐死甄氏、立郭氏的事实可见，具体缘由夹杂宫廷指控，不推断单一情感动机",
    family: "与曹植争储并在即位后限制诸弟，是政治安全优先于手足信任的明确结构",
    outerStates: "对孙权先册封后征伐、数次南征，体现机会主义联盟和统一目标",
  }),
  "three-kingdoms:曹叡": profile("INTJ", "medium", "authoritarian", "能处理蜀吴战争和辽东问题，却大兴宫室并在晚年托孤失当，呈现集中规划与控制欲", {
    ministers: "使用司马懿等应对多线战争，也拒绝部分大臣对营建和后宫的劝谏",
    family: "养子继承与宗室疏远使托孤选择受限，材料不足以推断具体亲子情感",
    outerStates: "对蜀汉北伐采取防御调度，并令司马懿灭公孙渊，重视消除边缘割据",
  }),
  "three-kingdoms:曹芳": profile("ISFJ", "low", "court-bound", "幼年由曹爽、司马懿辅政，成年后的反司马行动也由臣下谋划，最终被废", {
    ministers: "先后受曹爽与司马师控制，李丰等密谋失败显示皇帝缺乏独立执行网络",
  }),
  "three-kingdoms:曹髦": profile("INFJ", "medium", "crisis-ruler", "公开称司马昭之心路人皆知并亲率近侍反抗至死，表现价值尊严与孤注一掷", {
    emotion: "在受制和废立威胁下选择公开反抗，显示羞愤与名分意识，但处境极端",
    ministers: "召王沈、王经、王业议讨司马昭，泄密与忠死并见，反映其可信网络脆弱",
  }),
  "three-kingdoms:曹奂": profile("ISFJ", "low", "ritual-ruler", "由司马氏拥立并最终禅位，政策几乎均由司马昭、司马炎集团决定"),
  "three-kingdoms:刘备": profile("ENFJ", "medium", "founder", "在长期流动中以汉室名分和个人关系聚合人才，屡败仍能重建联盟与政权", {
    emotion: "哭泣、礼贤和报仇等叙事使其情感表达外显，但其中也有政治表演与文学塑形",
    ministers: "与关羽、张飞及诸葛亮建立高信任关系，能礼请人才并给予军政空间",
    partners: "多次因战乱与妻子分离，孙夫人婚姻兼具孙刘联盟性质，无法据此判断稳定亲密模式",
    family: "托孤诸葛亮并嘱其辅佐刘禅，是把继承安全交给核心臣僚的明确信任行为",
    outerStates: "在曹操、孙权、刘璋等力量间结盟与转向，现实适应强但始终以恢复汉室自我定位",
  }),
  "three-kingdoms:刘禅": profile("ISFJ", "medium", "mediator", "长期信任诸葛亮并维持内部合作，后期依赖黄皓且面对魏军选择投降，偏向关系维持与风险回避", {
    ministers: "诸葛亮在世时充分授权，蒋琬费祎继之；后期黄皓干政显示对亲近者缺乏制衡",
    family: "诸葛亮托孤后的君臣关系近似制度化监护，不能简单等同亲情但体现长期信任",
    outerStates: "延续吴蜀联盟，邓艾入成都后接受谯周意见投降，以减少无望抵抗",
  }),
  "three-kingdoms:孙权": profile("ENTJ", "medium", "consolidator", "善用周瑜鲁肃等建立江东秩序并灵活联魏联刘，晚年二宫之争则暴露猜疑与继承失控", {
    emotion: "早中期能公开表达信任和哀悼，晚年因继承焦虑转向反复与严厉",
    ministers: "能给周瑜、鲁肃、吕蒙、陆逊较大空间，晚年逼死陆逊显示纳谏和信任显著退化",
    partners: "后妃材料多与太子之争相连，不把宠爱变化直接视为完整情感画像",
    family: "孙和、孙霸二宫并立引发长期党争，说明对儿子的平衡策略最终破坏制度边界",
    outerStates: "在曹魏与蜀汉间结盟、称臣和称帝皆随实力调整，外交高度现实主义",
  }),
  "three-kingdoms:孙亮": profile("INTJ", "low", "court-bound", "幼年受诸葛恪、孙綝控制，稍长后密谋除孙綝而失败被废，显示隐蔽反制但样本很少", {
    ministers: "与全公主等谋诛孙綝的行动显示试图夺回权力，但计划泄露且执行网络不足",
  }),
  "three-kingdoms:孙休": profile("ISTJ", "medium", "crisis-ruler", "借丁奉诛孙綝后恢复文教并谨慎维持国政，呈现务实收束和秩序修复", {
    ministers: "与张布、丁奉密谋除权臣后仍依赖其集团，显示功臣信任与皇权平衡并存",
    family: "临终原托付自己的太子；其死后濮阳兴、张布等另改立孙和之子孙皓，最终继承并非孙休本人决定",
  }),
  "three-kingdoms:孙皓": profile("ESTP", "medium", "authoritarian", "严酷惩罚、好酒宴和频繁迁都征役的记载持续，表现冲动控制与即时反应", {
    ministers: "对直谏者施以严刑并信任佞幸，造成高压且信息失真的宫廷环境",
    partners: "后宫规模和宠幸记载常用于亡国道德批评，不据此推断个别关系",
    outerStates: "在国力下降时仍多次对晋采取强硬姿态，最终面对大举进攻选择投降",
  }),

  // 晋
  "jin:司马炎": profile("ESTJ", "medium", "founder", "完成代魏与灭吴、建立制度并分封宗室，表现秩序整合；后期奢靡和继承安排削弱长期判断", {
    ministers: "能任羊祜、杜预等推进灭吴，也在朝臣反对中坚持关键决策",
    partners: "后宫扩张与选妃记载反映帝国资源和继承政治，不宜当作稳定情感类型证据",
    family: "明知太子能力受质疑仍维持其继承，并大封宗室以为屏藩，亲缘信任带来结构风险",
    outerStates: "灭吴实现统一，对内迁族群与边疆治理则未建立足够稳固安排",
  }),
  "jin:司马衷": profile("ISFJ", "low", "court-bound", "认知能力和独立决策均受史籍质疑，统治被皇后、宗室与权臣争夺，不能把政令归为本人", {
    emotion: "“何不食肉糜”等轶事高度符号化；少数对身边人的依恋也不足以完成心理分类",
    partners: "贾南风主导宫廷并废杀太子，婚姻是权力结构核心，无法据此判断互相情感",
    family: "八王之乱围绕皇帝与太子名分展开，宗亲关系实际成为争权工具",
  }),
  "jin:司马炽": profile("INFP", "low", "crisis-ruler", "在八王之乱后被拥立，试图任用较清望士人却受权臣和战争压制，价值愿望强于执行资源", {
    ministers: "试图亲政但朝廷军政已经碎片化，臣下忠诚与实际能力难以统一",
    outerStates: "面对汉赵进攻缺乏可调动资源，洛阳陷落后成为俘虏并被杀",
  }),
  "jin:司马邺": profile("ISFJ", "low", "crisis-ruler", "长安孤立中依靠少数臣将维持晋统，粮绝后投降，行为几乎全由求存危机界定", {
    ministers: "依赖麴允、索綝等守长安，内部资源枯竭限制其真实选择",
    outerStates: "向汉赵投降意在结束无望围困，后遭侮辱杀害，不能形成稳定对外风格",
  }),
  "jin:司马睿": profile("ISFJ", "medium", "founder", "依靠王导协调北来士族与江东大族建立东晋，重关系整合但对王敦军权控制不足", {
    ministers: "与王导合作形成政权基础，“王与马共天下”概括士族共治结构",
    family: "以宗室名分承接晋统并安排诸王，实际安全更多依赖士族联盟",
    outerStates: "对北方割据多采取名义号召和有限北伐，首要目标是稳住江南政权",
  }),
  "jin:司马绍": profile("ENTJ", "medium", "crisis-ruler", "亲自组织抵抗并平定王敦之乱，短期统治表现迅速动员和恢复皇权的决断", {
    ministers: "能联合温峤、庾亮等抗王敦，且在权臣威胁下维持秘密与执行",
    family: "尊重王导等父朝旧臣，同时把恢复司马氏权威置于核心",
  }),
  "jin:司马衍": profile("ISFJ", "low", "court-bound", "幼年即位，庾太后、庾亮与王导等掌政，成年后个人施政记录仍有限"),
  "jin:司马岳": profile("ISFJ", "low", "court-bound", "在位仅两年且朝政受庾氏与大臣体系主导，难建立个体行为样本"),
  "jin:司马聃": profile("ISFJ", "low", "court-bound", "两岁即位并早逝，褚太后与辅政大臣承担实际决策"),
  "jin:司马丕": profile("INTP", "low", "aesthete", "亲政后沉迷服食丹药并因药物中毒失能，显示个人兴趣压过治理，但材料带有劝诫色彩", {
    emotion: "对方术与长生实践的持续投入是少数可见个人偏好，不等于完整内在性格",
    ministers: "失能后由褚太后临朝，说明个人兴趣直接削弱了君臣治理能力",
  }),
  "jin:司马奕": profile("ISFP", "low", "court-bound", "在桓温控制下被以私德指控废黜，指控真实性和本人政治能力都难评估", {
    partners: "桓温以不能生育及后宫子嗣血统为废立理由，属于政治攻击材料，不据此判断亲密关系",
  }),
  "jin:司马昱": profile("INFP", "medium", "scholar", "以玄学清谈和温和名望著称，被桓温拥立后权力受限，表现内省价值取向", {
    emotion: "临终诏令与对桓温压力的忧惧记录较多，反映危局中的克制和责任焦虑",
    ministers: "对桓温既依赖又戒惧，实际难以制衡；与谢安、王坦之等士人关系更接近协商",
  }),
  "jin:司马曜": profile("INTJ", "medium", "consolidator", "借谢安集团赢得淝水之战后逐步收权，显示战略耐心；晚年用人和宫廷冲突削弱成果", {
    ministers: "依赖谢安、谢玄完成淝水防御，战后又逐步限制士族权力，信任与收权并行",
    partners: "张贵人因酒后戏言而弑帝见于正史，但单一极端事件不足以概括长期伴侣关系",
    family: "与弟司马道子共享权力后渐生冲突，宗亲合作转为派系竞争",
    outerStates: "淝水之战以防御动员挫败前秦，随后有限北伐而未持续全面扩张",
  }),
  "jin:司马德宗": profile("ISFJ", "low", "court-bound", "史籍称其严重缺乏独立生活与判断能力，政权由宗室、桓玄和刘裕相继控制", {
    family: "弟司马德文长期照料其生活并代为表达，是少数较可靠的家庭支持线索",
  }),
  "jin:司马德文": profile("ISFJ", "low", "crisis-ruler", "在刘裕控制下受禅退位，过去曾陪护兄长并参与复晋，表现责任维持但选择空间极小", {
    family: "长期照顾无法自理的兄长司马德宗，史籍对此有连续记载，可见责任性关系",
    ministers: "即位与禅让均由刘裕集团安排，名义君臣关系与实际权力完全分离",
  }),

  // 十六国：主要依据《晋书·载记》等传世叙述；短命政权尤其容易受胜利者叙事影响。
  "sixteen-kingdoms:李雄": profile("ENFJ", "medium", "founder", "整合流民与地方力量建立成汉，延揽范长生并以宽简政令稳定蜀地，呈现关系动员型领导", {
    ministers: "尊重范长生并吸纳蜀地士人，愿以高位和实际空间换取不同群体合作",
    family: "越过亲子而选择兄子李班继位，显示把能力与王朝安排置于直接父子继承之上",
    outerStates: "对东晋既有军事冲突也曾释放归附者，主要目标是巩固蜀地独立秩序",
  }),
  "sixteen-kingdoms:李班": profile("ISFJ", "low", "ritual-ruler", "按李雄安排以侄继位并遵行丧礼，却迅速在宗室冲突中被杀，独立决策样本很少", {
    family: "继承本身打破父子直系次序，随后被李雄之子李越、李期一派杀害，宗族名分与权力发生冲突",
  }),
  "sixteen-kingdoms:李期": profile("ESTP", "low", "authoritarian", "借宗室政变即位并清洗异己，后受李寿逼迫自杀，行为集中在短期权力斗争", {
    ministers: "任用亲近者并处置不附者的记载较多，但来源带有李寿胜利后的贬抑",
    family: "参与推翻堂兄李班又被族叔李寿废黜，宗族关系几乎完全被继承斗争支配",
  }),
  "sixteen-kingdoms:李寿": profile("ESTJ", "medium", "authoritarian", "以军权逼宫夺位、改国号并强化刑罚，晚年仿效石虎营建，表现高压控制和结果优先", {
    ministers: "起初借臣下谋划夺权，称帝后对反对者和旧臣日趋猜忌严厉",
    family: "废黜侄李期并清理宗室反对力量，政治安全明显压过宗族名分",
    outerStates: "一度考虑联合后赵攻晋，后因臣下劝阻作罢，反映机会主义对外评估",
  }),
  "sixteen-kingdoms:李势": profile("ISFP", "low", "crisis-ruler", "继承后宗室与人才流失、政权收缩，面对桓温进军最终投降，个体行为多受亡国局势限定", {
    ministers: "诛杀宗室和重臣使内部支持进一步削弱，但具体责任和派系背景仍需谨慎",
    outerStates: "成都失守后向桓温投降并获东晋安置，是在军事实力悬殊下的求存选择",
  }),

  "sixteen-kingdoms:刘渊": profile("ENFJ", "medium", "founder", "兼具经学教育与匈奴贵族号召力，以汉室外甥名分聚合反晋力量，呈现身份叙事和联盟动员", {
    ministers: "吸纳汉人与匈奴部众共同建政，并使用王弥、石勒等不同背景军事力量",
    family: "以祖先与汉朝和亲关系建构国号合法性，这是政治身份策略而非私人情感证据",
    outerStates: "对西晋采取扩张战争，同时把流民将领纳入松散联盟以扩大影响",
  }),
  "sixteen-kingdoms:刘和": profile("INTJ", "low", "crisis-ruler", "即位后听信密告、试图先发制人清除诸弟，数日内反被刘聪杀死，样本只见高度猜防", {
    ministers: "采纳呼延攸等针对宗室的急迫谋划，未能核验实力与忠诚，迅速引发反击",
    family: "企图同时清除握兵诸弟，说明继承安全压倒手足关系，但记录来自政变结果",
  }),
  "sixteen-kingdoms:刘聪": profile("ENTJ", "medium", "authoritarian", "军事上攻陷洛阳长安并扩张汉赵，宫廷中又严刑、纵欲和信任外戚近臣，显示强动员伴随失控", {
    emotion: "经史能力、诗赋兴趣与盛怒惩罚并见，公共行为呈现智识投入和强烈情绪反应",
    ministers: "能使用石勒等将领扩张，也因亲近宦官外戚而让军政派系坐大",
    partners: "多立皇后及大规模后宫的记载服务于史家道德评价，不据此判定具体亲密关系",
    family: "杀兄刘和后即位并卷入诸子外戚竞争，继承秩序持续被宗族暴力重塑",
    outerStates: "以攻取西晋两京为核心战略，追求军事征服而非稳定共存",
  }),
  "sixteen-kingdoms:刘粲": profile("ESFP", "low", "court-bound", "继位后沉溺宫廷并把军政交给靳准，旋即遭政变杀害，记载带有典型亡国模板", {
    ministers: "对靳准过度信任并诛除其政治对手，使近臣获得发动政变的条件",
    partners: "宫廷淫乱指控集中见于敌对史叙，不作为具体伴侣态度的可靠证据",
  }),
  "sixteen-kingdoms:刘曜": profile("ENTJ", "medium", "conqueror", "从靳准之乱中重建政权、迁都长安并改国号赵，持续亲征显示战略重组和军事主导", {
    ministers: "能在政权破碎后重新聚合将领官僚，但亲征失败也暴露决策过度集中于个人",
    outerStates: "与后赵石勒由分立走向全面战争，最终亲征被俘，偏向以军事解决权力边界",
  }),
  "sixteen-kingdoms:刘熙": profile("ISFJ", "low", "crisis-ruler", "父刘曜被俘后在残余臣将拥护下继位并西撤，旋即被后赵消灭，没有稳定施政记录", {
    family: "其政治位置完全来自承接刘曜残余政权，无法据此判断父子私人关系",
    outerStates: "面对后赵追击只能转移和抵抗，所有对外行为均属末期求存",
  }),

  "sixteen-kingdoms:石勒": profile("ESTJ", "medium", "founder", "从奴隶和流民军首领成长为建国者，重军功、行政和人才实用，呈现强执行与秩序建设", {
    emotion: "史载其好听儒生讲史并能从历史人物中定位自己，显示现实自信与学习兴趣",
    ministers: "高度信任张宾谋划并吸纳汉族士人，按能力分工而仍牢牢掌握最终军权",
    family: "立较温和的石弘而又纵容石虎坐大，继承安排未能匹配实际权力",
    outerStates: "以战争吞并汉赵残部和北方割据，同时对东晋使者保留现实交涉空间",
  }),
  "sixteen-kingdoms:石弘": profile("ISFJ", "low", "court-bound", "性情宽和的记载与主动让位请求并存，但始终被石虎控制，最终宗室被杀", {
    ministers: "名义继承石勒，实际军政掌握在石虎手中，无法把朝廷行动归于本人",
    family: "面对叔父石虎权势曾请求让位，宗族服从未换来安全，显示极端受制处境",
  }),
  "sixteen-kingdoms:石虎": profile("ESTP", "medium", "authoritarian", "持续战争、巨型营建和残酷惩罚的记载密集，呈现追求即时威势、冒险动员与暴力控制", {
    emotion: "游猎、营建和盛怒杀戮记录表现刺激追求与惩罚性反应，但传记有强烈暴君书写",
    ministers: "要求绝对服从并以酷刑压制异议，人才使用高度依赖军功和个人忠诚",
    partners: "刘皇后等后妃深度卷入废立，材料主要说明外戚与继承政治，不作亲密推断",
    family: "太子石邃、石宣等相继因争权被残酷处死，显示皇权安全彻底压倒父子关系",
    outerStates: "多线征伐前燕、前凉及东晋边境，倾向用高成本军事威慑塑造秩序",
  }),
  "sixteen-kingdoms:石世": profile("ISFJ", "low", "court-bound", "幼年因母刘皇后和张豺安排继位，在位三十三日即被石遵废杀，没有自主行为", {
    family: "其被立和被杀都源于石虎诸子继承斗争，不能推断幼主对宗族的态度",
  }),
  "sixteen-kingdoms:石遵": profile("ESTP", "low", "crisis-ruler", "借军事政变夺位后又迅速与冉闵等翻脸被杀，短期行动表现机会主义和控制失灵", {
    ministers: "借冉闵兵力入都却未兑现政治期待，双方信任迅速破裂",
    family: "废杀幼主石世后自己又被宗室政变推翻，继承名分完全从属于武力",
  }),
  "sixteen-kingdoms:石鉴": profile("ISFP", "low", "court-bound", "由冉闵拥立又暗中联络诸将反制，数月后被杀，所有行为均处于监控和政变压力", {
    ministers: "名义任用冉闵而实际互相猜防，多次反制计划失败，不能形成稳定君臣模式",
  }),
  "sixteen-kingdoms:石祗": profile("ESTJ", "low", "crisis-ruler", "据襄国号召后赵残部抵抗冉魏，最终被部将杀害，主要线索是末期军事动员", {
    ministers: "依赖刘显等将领延续政权，却最终死于部将之手，显示忠诚结构极不稳定",
    outerStates: "与冉闵进行存亡战争，并寻求前燕等力量牵制，属于危机联盟",
  }),

  "sixteen-kingdoms:张轨": profile("ISTJ", "medium", "consolidator", "长期经营凉州、安置流民并奉西晋正朔，表现务实行政和维护成例", {
    ministers: "重用地方士人整顿凉州，在病重和叛乱时仍依靠稳定官僚网络",
    family: "让子弟承接军政属于边镇世袭化过程，私人亲疏不从名分直接推断",
    outerStates: "在中原乱局中继续向晋廷输送贡赋和援军，以名义忠诚换取地方自主",
  }),
  "sixteen-kingdoms:张寔": profile("ESTJ", "low", "consolidator", "继承父政并维持凉州行政，后遭宗教叛党刺杀，行为样本较短", {
    ministers: "政权依赖张氏旧僚，刺杀事件显示边镇内部派系与宗教动员风险",
  }),
  "sixteen-kingdoms:张茂": profile("ISFJ", "low", "crisis-ruler", "承接侄位并在前赵压力下称藩，重在保存凉州而非主动扩张", {
    family: "以叔继侄属于危机中的宗族接班，史料不足以判断私人关系",
    outerStates: "面对刘曜进攻接受爵号以换取停战，表现现实求存",
  }),
  "sixteen-kingdoms:张骏": profile("ENTJ", "medium", "consolidator", "整顿州郡、拓展西域交通并在多强权间维持自主，表现长期经营和组织扩张", {
    ministers: "依靠宋配、阴据等僚属处理军政，能以制度和任务分工经营辽阔边地",
    outerStates: "对前赵、后赵保持名义周旋，又向西域拓展影响，外交现实且有扩张性",
  }),
  "sixteen-kingdoms:张重华": profile("ISFJ", "low", "consolidator", "年少继位后使用谢艾抵御后赵，整体延续守土路线，但晚年继承安排受近臣干扰", {
    ministers: "能破格任谢艾统军并取得防御胜利，也因宠信赵长等使托孤秩序失稳",
    outerStates: "主要对外目标是抵御后赵入侵、保存凉州",
  }),
  "sixteen-kingdoms:张曜灵": profile("ISFJ", "low", "court-bound", "幼年继位后立即被张祚与权臣废黜，后来被杀，没有独立行为材料"),
  "sixteen-kingdoms:张祚": profile("ESTP", "low", "authoritarian", "借近臣与后宫政变夺权、称帝并严惩反对者，旋在内乱中被杀，记载集中于冒进控制", {
    ministers: "依靠赵长等夺位后又以恐惧和清洗维持权力，无法形成稳定官僚合作",
    family: "废侄张曜灵并在宗族反击中败亡，继承政治压倒宗亲名分",
  }),
  "sixteen-kingdoms:张玄靓": profile("ISFJ", "low", "court-bound", "幼年被拥立，先后受张瓘、宋混等摄政，最终被叔父张天锡杀害", {
    family: "叔父张天锡夺权致其死亡，宗族监护转化为继承暴力，不能据此评价幼主性格",
  }),
  "sixteen-kingdoms:张天锡": profile("ESTP", "low", "crisis-ruler", "通过政变掌权、好亲近文士又在前秦入侵时仓促应战，最终投降，行为兼具冒险与现实妥协", {
    ministers: "任用亲近少年和文士受到旧臣批评，面对强敌时内部协调不足",
    family: "取代并杀死侄张玄靓是其掌权关键，显示政治野心压过宗族监护责任",
    outerStates: "拒绝前秦最后通牒后战败投降，后来又随东晋生活，路线受实力变化驱动",
  }),

  "sixteen-kingdoms:慕容皝": profile("ENTJ", "medium", "founder", "在宗族竞争中巩固辽东、扩军屯田并吸纳汉人士人，表现战略扩张和制度建设", {
    ministers: "任用封奕、阳骛等汉族士人建立行政，同时对宗室和异议控制严厉",
    family: "与兄弟慕容仁等发生致命争位战争，宗族关系完全政治化",
    outerStates: "在后赵、高句丽、宇文部和段部之间战争结盟并用，持续扩大辽东优势",
  }),
  "sixteen-kingdoms:慕容儁": profile("ENTJ", "medium", "conqueror", "乘后赵崩溃入主中原并称帝，善于扩大既有军事成果，统合速度快", {
    ministers: "倚重慕容恪等宗亲将领与汉族官僚，形成分工明确的征服集团",
    family: "对弟慕容恪保持军政信任，为幼主托孤奠定基础",
    outerStates: "快速夺取幽冀并与前秦、东晋竞争，追求中原霸权",
  }),
  "sixteen-kingdoms:慕容暐": profile("ISFJ", "low", "court-bound", "幼年即位，前期由慕容恪辅政、后期受慕容评控制，最终降前秦，难见独立判断", {
    ministers: "慕容恪死后未能制衡慕容评，国政与军事失误不能完全归于幼主",
    outerStates: "面对前秦进攻迅速亡国并被迁往长安，后续反秦谋划亦发生在受制环境",
  }),

  "sixteen-kingdoms:苻健": profile("ESTJ", "medium", "founder", "率氐众入关中、建立前秦并恢复行政秩序，表现现实组织和军事执行", {
    ministers: "能使用雷弱儿等不同族群人才，但宗室与功臣平衡仍不稳定",
    outerStates: "在后赵崩溃后迅速占据关中，并与东晋、前凉及地方势力交战",
  }),
  "sixteen-kingdoms:苻生": profile("ESTP", "low", "authoritarian", "史书集中记其酗酒、猜忌和任意杀戮，显示冲动高压形象，但叙述出自推翻他的政权", {
    emotion: "对残疾称谓极端敏感、盛怒杀人的故事高度戏剧化，应视作敌对史叙中的低置信线索",
    ministers: "频繁诛杀大臣并以恐惧控制朝廷，最终促成苻坚集团政变",
  }),
  "sixteen-kingdoms:苻坚": profile("ENFJ", "medium", "reformer", "倚王猛整顿吏治、吸纳多族精英并以统一愿景动员，淝水前又过度相信整合能力", {
    emotion: "对降将和异族首领常显示宽容、自信与理想化信任，失败后这些关系迅速反转",
    ministers: "高度信任王猛并采纳改革；王猛死后对南征的反对意见采纳不足",
    family: "对宗室和降服贵族多保留地位，宽缓安排既体现关系信任也埋下安全风险",
    outerStates: "先逐步统一北方，后不顾多方劝阻大举攻晋，试图用一次战争完成天下整合",
  }),
  "sixteen-kingdoms:苻丕": profile("ESTJ", "low", "crisis-ruler", "邺城长期受围后重组前秦残部称帝，主要表现坚守与军事求存，统治时间短", {
    ministers: "依赖苻纂等宗室将领维持残余政权，资源不足使内部合作脆弱",
    outerStates: "在后燕、西燕和东晋多方夹击间寻求突围，缺少稳定外交选择",
  }),
  "sixteen-kingdoms:苻登": profile("ESTJ", "medium", "crisis-ruler", "在前秦残部中长期组织对后秦战争，以礼仪和复仇叙事维持军心，表现坚韧动员", {
    emotion: "家属被杀后以复仇和宗庙仪式激励军队，情感表达与战时政治高度结合",
    ministers: "依靠地方将领分区作战，但长期战争下资源和忠诚不断流失",
    outerStates: "几乎把全部统治投入对姚苌、姚兴战争，政策被存亡对抗锁定",
  }),
  "sixteen-kingdoms:苻崇": profile("ISFJ", "low", "crisis-ruler", "承接已瓦解的前秦名号不久即战败身亡，没有足够个体行为可稳定分类"),

  "sixteen-kingdoms:慕容垂": profile("INTJ", "medium", "founder", "历经前燕排挤、投前秦和淝水后复国，长期保存军政网络并把握时机，表现战略耐心", {
    ministers: "能吸纳旧部与降将重建后燕，重视军事能力，但核心决策高度集中",
    family: "长期培养诸子领军却选择慕容宝继承，后续失控显示家庭信任与能力评估存在落差",
    outerStates: "先借前秦庇护，淝水后迅速独立并击败翟魏、西燕，联盟随战略阶段调整",
  }),
  "sixteen-kingdoms:慕容宝": profile("ISFP", "low", "crisis-ruler", "继位后在参合陂报复战与北魏进攻中屡次迟疑失措，最终流亡被杀，危机压倒稳定风格", {
    ministers: "将领意见分裂且本人反复改变路线，难以维持慕容垂留下的指挥体系",
    family: "诸子宗室在撤退与争位中互不信任，父子兄弟关系被政权崩溃撕裂",
    outerStates: "对北魏从报复进攻转为仓促退守，战略连续性很弱",
  }),
  "sixteen-kingdoms:慕容盛": profile("INTJ", "medium", "authoritarian", "隐忍返回龙城、策动诛兰汗复国后以严刑防政变，表现秘密布局与高度猜防", {
    ministers: "夺权依赖少数可信者，掌权后频繁诛罚使臣下恐惧，最终仍死于宫变",
    family: "借姻亲兰氏关系得以自保又转而清算兰汗集团，亲缘与复仇政治交织",
    outerStates: "在国力有限时仍持续攻击高句丽、库莫奚等以维持军威",
  }),
  "sixteen-kingdoms:慕容熙": profile("ESFP", "medium", "aesthete", "大兴宫苑、远征取悦后妃和为苻后举行超规格丧礼的记载持续，个人体验明显影响国政", {
    emotion: "苻训英死后长期哀恸并强迫百官哭临，显示情感公开化且压倒行政边界",
    ministers: "对劝阻者严惩、以亲近和恐惧维持朝廷，最终在出殡时被冯跋政变推翻",
    partners: "与苻氏姐妹的宠爱及由此产生的营建、远征有具体政治后果，但史书仍带亡国道德框架",
    outerStates: "多次远征高句丽和契丹而忽视后勤，外交军事易受个人冲动牵引",
  }),

  "sixteen-kingdoms:姚苌": profile("ESTP", "medium", "founder", "从前秦将领转为反叛建国，善抓苻坚败后的权力真空并以机动战争求存", {
    ministers: "依靠羌族部众与前秦降将形成实战网络，奖惩以即时军功和忠诚为主",
    outerStates: "与苻登长期拉锯并灵活避战、诱敌，偏向机会判断而非固定名分",
  }),
  "sixteen-kingdoms:姚兴": profile("INFJ", "medium", "scholar", "尊崇佛教、延请鸠摩罗什译经并整顿文教，同时能进行现实军事扩张，呈现理念与治理结合", {
    emotion: "对佛学辩论和译经事业的持续投入是明确个人兴趣，但也服务于政权文化整合",
    ministers: "礼遇鸠摩罗什及文臣学者，也能任将征战；晚年储位派系削弱用人秩序",
    family: "太子姚泓与诸子争权成为晚期危机，宽容宗室未能阻止派系化",
    outerStates: "在北魏、东晋、南凉和胡夏之间战和并用，早期扩张而晚期转向多线防守",
  }),
  "sixteen-kingdoms:姚泓": profile("ISFJ", "low", "crisis-ruler", "史载性情温和而体弱，继位时宗室叛乱与刘裕北伐并至，最终投降，个人选择空间狭窄", {
    ministers: "依赖姚绍等宗室将领应敌，内部多次争位严重分散执行力量",
    outerStates: "长安失守后向刘裕投降以结束抵抗，随后被杀，完全是亡国危局中的选择",
  }),

  "sixteen-kingdoms:乞伏国仁": profile("ESTP", "low", "founder", "前秦崩溃后迅速整合陇西鲜卑部众自立，以军事机会和部落号召为主要能力", {
    outerStates: "在前秦、后凉和地方部族夹缝中扩张，关系随军事实力快速调整",
  }),
  "sixteen-kingdoms:乞伏乾归": profile("ESTP", "medium", "crisis-ruler", "多次战败、降附后秦又返回复国，表现高度机动和生存导向，最终死于宗族政变", {
    ministers: "依靠部族将领复国，权力仍深受宗族军事首领制约",
    family: "被侄乞伏公府杀害，说明宗族继承与军权矛盾未被制度化解决",
    outerStates: "在后秦、南凉和后凉之间反复战降，外交以保存核心部众为先",
  }),
  "sixteen-kingdoms:乞伏炽磐": profile("ENTJ", "medium", "conqueror", "在父死后平乱、重建西秦并吞并南凉，显示持续军事组织和扩张目标", {
    ministers: "能重新聚合父辈部众并任将连续作战，权力建立在军功与宗族网络上",
    outerStates: "吞南凉并与北凉、吐谷浑等竞争，倾向以军事扩大陇右控制",
  }),
  "sixteen-kingdoms:乞伏暮末": profile("ISFP", "low", "crisis-ruler", "继承时灾荒、叛乱和胡夏压力并发，处置宗室严厉却未能稳定政权，最终投降被杀", {
    ministers: "内部背叛与清洗频繁，危机中信任范围不断缩小",
    outerStates: "试图东投北魏未果，后向胡夏投降，路线主要由生存通道决定",
  }),

  "sixteen-kingdoms:吕光": profile("ESTJ", "medium", "founder", "远征龟兹后据凉州建国，以军事纪律和既得军团建立后凉，表现执行和控制导向", {
    ministers: "依赖西征军将领接管凉州，也因严厉处置地方士人造成持续反叛",
    outerStates: "西征、回师和对河西诸部战争构成政权基础，偏好以军力解决边界",
  }),
  "sixteen-kingdoms:吕绍": profile("ISFJ", "low", "court-bound", "按父命继位却缺乏军权，面对兄吕纂政变自杀，在位数日无独立施政", {
    family: "继承名分未能约束掌兵兄长，手足竞争直接终结其统治",
  }),
  "sixteen-kingdoms:吕纂": profile("ESTP", "medium", "authoritarian", "以军力夺位后频繁游猎征战、轻率处置宗族，最终在宴饮政变中被杀", {
    emotion: "游猎饮宴和当面冲突的连续记载表现即时刺激偏好，但史家有明显贬责",
    ministers: "重军事亲随而轻制度防范，对吕超等宗族将领的羞辱触发致命反击",
    outerStates: "持续攻击南凉、北凉，常在补给与内部稳定不足时冒险用兵",
  }),
  "sixteen-kingdoms:吕隆": profile("ISFP", "low", "crisis-ruler", "参与推翻吕纂后受拥立，面对南北凉和后秦围攻只能降附，主要表现被动求存", {
    ministers: "实际权力与兄弟吕超共享，内部缺少重建稳定官僚的时间",
    outerStates: "先向后秦称藩、最终交出姑臧迁往长安，以投降保存宗族",
  }),

  "sixteen-kingdoms:秃发乌孤": profile("ENTJ", "medium", "founder", "脱离后凉、广纳河西人才并迅速占据要地，表现主动组织和建立新秩序", {
    ministers: "吸纳后凉失意官员和各族首领，以能力与联盟共同扩张",
    outerStates: "利用后凉衰弱结盟征战并用，逐步建立南凉势力范围",
  }),
  "sixteen-kingdoms:秃发利鹿孤": profile("ISTJ", "low", "consolidator", "继兄位后迁治、整顿官制并听取臣下建议，统治短但较偏稳健守成", {
    ministers: "史载能召集群臣讨论政务并接纳务实建议，是少数较具体的用人线索",
    outerStates: "在后凉、后秦和北凉间维持独立，重在巩固而非大举扩张",
  }),
  "sixteen-kingdoms:秃发傉檀": profile("ESTP", "medium", "crisis-ruler", "频繁在后秦、北凉与西秦之间用兵和迁徙，敢于冒险但资源透支，最终降西秦被杀", {
    ministers: "多次不纳对冒进战争的劝阻，军事行动削弱内部人口和粮源",
    family: "投降后宗族被分散控制，最终死亡发生在乞伏氏猜防环境中",
    outerStates: "联盟、称藩与战争快速切换，显示高度现实但缺乏可持续边界策略",
  }),

  "sixteen-kingdoms:慕容德": profile("INTJ", "medium", "founder", "后燕崩溃时率部南迁、舍弃滑台转据广固并建立南燕，表现审势和重建能力", {
    ministers: "能听取潘聪等关于迁都和经营齐地的意见，依靠鲜卑宗室与汉族士人共同建政",
    family: "无亲子继承人而选择侄慕容超，认亲与选嗣同时服务王朝延续",
    outerStates: "在北魏与东晋夹缝中转移核心区，优先选择可防守和可供养的齐地",
  }),
  "sixteen-kingdoms:慕容超": profile("ESFP", "medium", "authoritarian", "前期能伪装脱身，继位后好游猎音乐、信近臣且拒谏，个人偏好直接引发对晋战争", {
    emotion: "为迎回母妻表现强烈孝亲责任，亡国前又与宠姬相泣；这些片段均处极端政治情境",
    ministers: "偏信公孙五楼并压制封孚、韩𧨳等谏言，造成信息封闭和宗室反叛",
    partners: "妻呼延氏与母亲被后秦扣留，他以送乐伎为条件迎回，能见家庭承诺但亦是国家谈判",
    family: "以降号和输送乐伎换母妻归国，明确把亲属安全置入外交优先级",
    outerStates: "为补充乐伎掠东晋边民并拒绝守险建议，最终招致刘裕灭国战争",
  }),

  "sixteen-kingdoms:李暠": profile("INTJ", "medium", "founder", "据敦煌建西凉后重农、兴学并谋划东进，文书与政策呈现长期经营和文化自我定位", {
    emotion: "诗赋与诫子书显示对家族、文化和功业的反思，但属于规范化自我表达",
    ministers: "重用宋繇等河西士人并鼓励文教，以行政和文化共同巩固政权",
    family: "诫勉诸子守成并安排李歆继承，显示明确宗族责任期待",
    outerStates: "对北凉保持竞争又避免过早决战，东进中原更多是长期愿景",
  }),
  "sixteen-kingdoms:李歆": profile("ESTP", "low", "conqueror", "不顾母亲与臣下劝阻主动攻北凉，遭伏击战死，最清晰线索是高风险军事决策", {
    ministers: "宋繇等劝其休养而未获采纳，显示在关键战争上压过集体意见",
    family: "尹太后曾劝阻用兵，其拒绝主要是战略分歧，不能扩展为母子情感冷淡",
    outerStates: "趁沮渠蒙逊伪退贸然出兵，偏好抓取短期战机而低估诱敌风险",
  }),
  "sixteen-kingdoms:李恂": profile("ISFJ", "low", "crisis-ruler", "在西凉主力覆亡后据敦煌继续抵抗，城破自杀，行为完全由末期守城限定", {
    ministers: "依靠敦煌地方人士短暂复国，外援与资源均不足",
    outerStates: "拒绝北凉招降并守城至败，体现名分坚持但无从建立一般外交风格",
  }),

  "sixteen-kingdoms:段业": profile("ISFJ", "low", "court-bound", "由沮渠部将推举为首领，缺乏自己的军事基础，最终被沮渠蒙逊取代杀害", {
    ministers: "依赖沮渠男成、蒙逊等掌兵者，猜忌并杀男成后失去关键支持",
  }),
  "sixteen-kingdoms:沮渠蒙逊": profile("ESTP", "medium", "founder", "善用叛乱、诈降和伏击夺取河西，以军事机会扩张北凉，同时对异己极为冷酷", {
    emotion: "能长期隐忍并以哀兵、诈退等操纵对手判断，公开情感常具有军事工具性",
    ministers: "重用能战者却不断清除潜在威胁，合作建立在军功与恐惧上",
    family: "借伯父之死起兵又设计除去堂兄男成，宗族纽带被用于动员也被权力竞争破坏",
    outerStates: "在西凉、南凉、后秦与北魏间战和反复，外交高度机会主义",
  }),
  "sixteen-kingdoms:沮渠牧犍": profile("ISFJ", "low", "crisis-ruler", "在北魏压力下以婚姻称藩并维持河西，战败后投降，后因谋反指控被赐死", {
    partners: "娶北魏武威公主属于明确政治婚姻，宫廷冲突材料不足以判断双方私人感情",
    family: "与嫂李氏及宗族案件成为北魏问罪内容，指控具有征服后的政治语境",
    outerStates: "向北魏称藩联姻又保持地方自主，最终因两者矛盾遭军事吞并",
  }),

  "sixteen-kingdoms:赫连勃勃": profile("ESTP", "medium", "authoritarian", "以机动作战建立胡夏、营筑统万城并施用极端惩罚，呈现冒险征服和暴力威慑", {
    emotion: "史书反复记录盛怒、猜防与以残酷展示威势，但敌对传统可能强化暴君形象",
    ministers: "重军功和绝对服从，筑城与军械验收以杀戮建立恐惧责任制",
    family: "晚年改立太子引发诸子内战，继承偏好迅速转化为宗族暴力",
    outerStates: "利用刘裕撤军突取长安，并在后秦、东晋夹缝进行高机动扩张",
  }),
  "sixteen-kingdoms:赫连昌": profile("ESTP", "low", "crisis-ruler", "继位即面对北魏攻势，连续野战失利后被俘，独立统治几乎只有军事应急", {
    outerStates: "对北魏采取直接会战而失去统万、长安，后被俘受封，行为由战败求存决定",
  }),
  "sixteen-kingdoms:赫连定": profile("ESTP", "low", "crisis-ruler", "赫连昌被俘后在平凉继位，继而攻灭西秦并谋取河西，后被吐谷浑截获，表现冒险恢复而资源不足", {
    outerStates: "同时与北魏、南朝及吐谷浑周旋，试图以进攻西秦获得新基地，最终路线失败",
  }),

  "sixteen-kingdoms:高云": profile("ISFJ", "low", "court-bound", "在冯跋政变后被推为君主，因缺乏安全感重用近侍护卫，最终被宠臣刺杀", {
    ministers: "把防卫交给离班、桃仁等近侍并厚赏，狭窄信任网络反而形成致命风险",
    family: "作为慕容宝养子承接燕号，宗族名分具有政治合法性意义而非血缘亲疏",
  }),
  "sixteen-kingdoms:冯跋": profile("ISTJ", "medium", "consolidator", "推翻慕容熙后稳定北燕、轻徭整政并维持长期统治，表现务实守成和制度连续", {
    ministers: "以政变伙伴和旧燕官僚共同治理，能较长期维持分工，但晚年继承问题仍失控",
    family: "弟冯弘在其病重时夺权并排除太子一系，显示宗族信任未转化为可靠交接",
    outerStates: "与北魏、高句丽等保持使节和防御关系，优先延续辽西政权生存",
  }),
  "sixteen-kingdoms:冯弘": profile("ISFP", "low", "crisis-ruler", "以宗室政变继位后难挡北魏压力，先求南朝册封再逃高句丽，最终被杀，路线以求存为主", {
    family: "夺取兄长冯跋家系权力并清除侄辈，使继承安全建立在宗族暴力上",
    outerStates: "在北魏、刘宋和高句丽之间寻求庇护与转移，缺乏足以维持独立的实力",
  }),
};
