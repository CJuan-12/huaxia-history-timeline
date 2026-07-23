import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the portal and separated feature pages", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const readableHtml = html.replaceAll("<!-- -->", "");
  assert.match(readableHtml, /<title>华夏长卷｜中国古代历史时间轴<\/title>/);
  assert.match(readableHtml, /选择一种方式进入历史/);
  assert.match(readableHtml, /朝代时间轴/);
  assert.match(readableHtml, /文化版图/);
  assert.match(readableHtml, /帝王关系星谱/);
  assert.match(readableHtml, /君王档案馆/);
  assert.match(readableHtml, /href="\/timeline"/);
  assert.match(readableHtml, /href="\/atlas"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);

  const timelineResponse = await render("/timeline");
  assert.equal(timelineResponse.status, 200);
  const timelineHtml = (await timelineResponse.text()).replaceAll("<!-- -->", "");
  assert.match(timelineHtml, /中国古代历史横向时间轴/);
  assert.match(timelineHtml, /代表君王/);
  assert.match(timelineHtml, /秦始皇/);
  assert.match(timelineHtml, /君王档案/);

  const rulersResponse = await render("/rulers");
  assert.equal(rulersResponse.status, 200);
  const rulersHtml = (await rulersResponse.text()).replaceAll("<!-- -->", "");
  assert.match(rulersHtml, /君王档案馆/);
  assert.match(rulersHtml, /收录 443 位/);
  assert.match(rulersHtml, /MBTI 为基于史料行为、兴趣与关系的候选推演/);
  assert.match(rulersHtml, /暂无可靠传世画像/);
});

test("keeps ruler profiles accessible and portrait assets local", async () => {
  const [page, profiles, portraitCatalog, catalog, constellations, lineage, lineageData, layout, packageJson, portraits] = await Promise.all([
    readFile(new URL("../app/history-explorer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-profiles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-portraits.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-constellations.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-lineage.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-lineage-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readdir(new URL("../public/rulers/", import.meta.url)),
  ]);

  assert.match(page, /<dialog/);
  assert.match(page, /role="tablist"/);
  assert.match(page, /className="constellation-node"/);
  assert.match(page, /handleConstellationWheel/);
  assert.match(page, /handleConstellationPointerMove/);
  assert.match(page, /handleConstellationTabsScroll/);
  assert.match(page, /handleConstellationTabsWheel/);
  assert.match(page, /可自由滚动和拖拽的帝王关系星谱/);
  assert.match(page, /data-archive-file=\{ruler\.id\}/);
  assert.match(page, /archive-spine-avatar/);
  assert.match(page, /ruler-teaser-extracting/);
  assert.match(page, /classList\.contains\("ruler-teaser"\)/);
  assert.match(page, /aria-haspopup="dialog"/);
  assert.match(page, /onCancel=/);
  assert.match(page, /非心理诊断/);
  assert.match(page, /展开九项标准/);
  assert.match(page, /关系行为观察/);
  assert.match(page, /五项辅助判定标准/);
  assert.match(page, /结构代理/);
  assert.match(page, /母亲与承袭来源/);
  assert.match(page, /皇位从哪里来/);
  assert.match(page, /selectedRuler\.lineage\.mother/);
  assert.match(page, /className="topbar-nav"/);
  assert.match(page, /snapToNearestEra/);
  assert.match(page, /wheelSettleRef/);
  assert.match(page, /isHorizontalGesture/);
  assert.match(page, /isMouse \? "x" : "pending"/);
  assert.match(page, /clearDirectoryFilters/);
  assert.match(page, /era-panel\$\{index === current \? " active" : ""\}/);
  assert.match(page, /<sup aria-hidden="true">\?<\/sup>/);

  const mbtiCriteriaBlock = page.match(/const mbtiCriteria = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  const relationshipCriteriaBlock = page.match(/const relationshipCriteria = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  assert.equal([...mbtiCriteriaBlock.matchAll(/\{ key: /g)].length, 4);
  assert.equal([...relationshipCriteriaBlock.matchAll(/\{ title: /g)].length, 5);
  for (const criterion of [
    "互动取向",
    "信息取向",
    "权衡取向",
    "行动取向",
    "个人情感",
    "大臣与近侍",
    "伴侣与后妃",
    "父母与宗族",
    "藩属与外部政权",
  ]) {
    assert.match(page, new RegExp(criterion));
  }

  assert.match(profiles, /宫廷画像|传世画像|后世绘像|历史照片/);
  assert.match(profiles, /code: "(?:ENTJ|ISTJ|ESTJ|ENFJ|INTJ|ENTP|ESTP|INFJ)"/);
  assert.match(profiles, /Wikimedia Commons 公版/);
  assert.doesNotMatch(catalog, /code: "待考"/);
  assert.match(catalog, /psychology: PsychologyAssessment/);
  assert.match(catalog, /lineage: RulerLineage/);
  assert.match(catalog, /kind: "暂无可靠传世画像"/);
  assert.match(catalog, /未采用现代想象图/);
  assert.match(layout, /443 位君主身份档案/);
  assert.match(layout, /帝王关系星谱/);
  assert.match(layout, /metadataBase: new URL\(publicSiteOrigin\)/);
  assert.match(layout, /images: \[\{ url: `\$\{publicBasePath\}\/og\.png`/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  const referencedPortraits = [profiles, portraitCatalog]
    .flatMap((source) => [...source.matchAll(/src: "\/rulers\/([^"/]+)"/g)].map((match) => match[1]));
  assert.equal([...portraitCatalog.matchAll(/^  "[^"\n]+": \{/gm)].length, 32);
  assert.match(portraitCatalog, /Wikimedia Commons 公版/);
  assert.equal(portraits.length, referencedPortraits.length);
  assert.deepEqual([...portraits].sort(), [...referencedPortraits].sort());
  assert.ok(portraits.every((name) => /\.(?:jpe?g|png)$/i.test(name)));

  assert.equal([...constellations.matchAll(/^  constellation\(/gm)].length, 23);
  const constellationEraIds = [...constellations.matchAll(/eraId: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(constellationEraIds.length, 23);
  assert.equal(new Set(constellationEraIds).size, 23);
  const constellationRulers = [...constellations.matchAll(/\["[^"]+", "([^"]+)", "[^"]+", "[^"]+"(?:, \d+)?\]/g)]
    .map((match) => match[1]);
  assert.ok(constellationRulers.length >= 120);
  for (const rulerName of constellationRulers) {
    assert.ok(catalog.includes(rulerName), `${rulerName} 应对应君王档案馆中的真实条目`);
  }
  assert.match(constellations, /"lineage"/);
  assert.match(constellations, /"partnership"/);
  assert.match(constellations, /"conflict"/);
  assert.doesNotMatch(page, /<svg/);
  assert.match(lineage, /前任亲生子/);
  assert.match(lineage, /兄弟承袭/);
  assert.match(lineage, /非直系入继/);
  assert.match(lineage, /母亲身份未见可核对记录/);
  assert.ok([...lineageData.matchAll(/^  "[^"\n]+": \{/gm)].length >= 400);
  assert.ok([...lineageData.matchAll(/mother: /g)].length >= 250);
  assert.ok([...lineageData.matchAll(/father: /g)].length >= 380);
  assert.match(lineageData, /"qing:顺治帝福临"[\s\S]*mother: "孝庄文皇后"/);

  await access(new URL("../public/og.png", import.meta.url));

  await assert.rejects(access(new URL("app/_sites-preview/", root)));
});

test("keeps the 23-period cultural atlas complete, sourced, and reachable from the UI", async () => {
  const [page, atlas] = await Promise.all([
    readFile(new URL("../app/history-explorer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/culture-atlas.ts", import.meta.url), "utf8"),
  ]);

  const erasBlock = page.match(/const eras: Era\[\] = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const timelineEraIds = [...erasBlock.matchAll(/^    id: "([^"]+)",/gm)].map((match) => match[1]);
  const atlasEraMatches = [...atlas.matchAll(/^    eraId: "([^"]+)",/gm)];
  const atlasEraIds = atlasEraMatches.map((match) => match[1]);

  assert.equal(timelineEraIds.length, 23, "timeline should continue to define exactly 23 periods");
  assert.equal(new Set(timelineEraIds).size, 23, "timeline period ids should be unique");
  assert.equal(atlasEraIds.length, 23, "cultural atlas should define exactly one entry per period");
  assert.equal(new Set(atlasEraIds).size, 23, "cultural atlas period ids should be unique");
  assert.deepEqual([...atlasEraIds].sort(), [...timelineEraIds].sort());

  const legalStatuses = new Set(["core", "controlled", "exchange", "rival", "uncertain"]);
  const declaredStatuses = [...atlas.matchAll(/region\("([^"]+)"/g)].map((match) => match[1]);
  assert.ok(declaredStatuses.length >= 23, "every atlas entry should expose at least one interactive region");
  assert.ok(declaredStatuses.every((status) => legalStatuses.has(status)), "atlas regions should use only documented statuses");

  const atlasRegionKeysByEra = new Map();
  for (let index = 0; index < atlasEraMatches.length; index += 1) {
    const start = atlasEraMatches[index].index;
    const end = atlasEraMatches[index + 1]?.index ?? atlas.indexOf("\n];", start);
    const entry = atlas.slice(start, end);
    const eraId = atlasEraMatches[index][1];

    for (const field of ["atmosphere", "culture", "customs", "routes"]) {
      const values = entry.match(new RegExp(`${field}: \\[([^\\]]+)\\]`))?.[1] ?? "";
      assert.match(values, /"[^"]+"/, `${eraId} should include non-empty ${field} notes`);
    }
    assert.match(entry, /phases: \{\s*early: "[^"]+",\s*middle: "[^"]+",\s*late: "[^"]+"\s*\}/, `${eraId} should cover early, middle, and late phases`);
    assert.match(entry, /regions: \{[\s\S]*?region\("(?:core|controlled|exchange|rival|uncertain)"/, `${eraId} should include a mapped region`);
    const regionKeys = [...entry.matchAll(/^\s{6}(?:"([^"]+)"|([a-z-]+)):\s*region/gm)].map((match) => match[1] ?? match[2]);
    atlasRegionKeysByEra.set(eraId, regionKeys);
  }

  const sourceBlock = atlas.match(/export const cultureAtlasSources = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const sourceUrls = [...sourceBlock.matchAll(/url: "([^"]+)"/g)].map((match) => match[1]);
  assert.ok(sourceUrls.length >= 10, "atlas should retain a useful official-source bibliography");
  assert.equal(new Set(sourceUrls).size, sourceUrls.length, "atlas source links should not be duplicated");
  assert.ok(sourceUrls.every((url) => url.startsWith("https://")));
  for (const officialHost of ["www.chnmuseum.cn", "whc.unesco.org", "www.dpm.org.cn"]) {
    assert.ok(sourceUrls.some((url) => new URL(url).hostname === officialHost), `missing official source host: ${officialHost}`);
  }

  assert.match(page, /id="culture-atlas"/);
  assert.match(page, /showCultureAtlas/);
  assert.match(page, /rulersByEra\[atlasEraId\]/);
  assert.match(page, /(?:cultureRegionLayout|activeAtlasRegionLayout)\.map/);
  assert.match(page, /cultureAtlasMapAssets\[atlasEraId\]/, "every era should resolve its own generated raster base");
  assert.doesNotMatch(page, /atlasEraId\s*===\s*"xia"/, "the generated raster base should no longer be hard-coded to Xia");
  assert.match(atlas, /xia:\s*\{[\s\S]*?src:\s*"\/atlas\/xia-cultural-map-v1\.webp"/, "the Xia atlas should reference its generated local raster base");

  const generatedAssets = [...atlas.matchAll(/generatedAtlasAsset\("([^"]+)",\s*"[^"]+",\s*([^\n]+)\)/g)].map((match) => ({
    eraId: match[1],
    regionKeys: [...match[2].matchAll(/"([^"]+)"/g)].map((keyMatch) => keyMatch[1]),
  }));
  assert.equal(generatedAssets.length, 22, "every post-Xia era should expose a generated map asset");
  assert.equal(new Set(generatedAssets.map((asset) => asset.eraId)).size, 22, "generated map asset paths should be unique");
  assert.deepEqual(["xia", ...generatedAssets.map((asset) => asset.eraId)].sort(), [...timelineEraIds].sort());
  for (const asset of generatedAssets) {
    assert.deepEqual(asset.regionKeys, atlasRegionKeysByEra.get(asset.eraId), `${asset.eraId} map hit areas should match its atlas data`);
    await access(new URL(`../public/atlas/${asset.eraId}-cultural-map-v1.webp`, import.meta.url));
  }

  const atlasImageLayer = [...page.matchAll(/<(?:img|div)\b[^>]*>/g)]
    .map((match) => match[0])
    .find((tag) => /(?:atlas-map-(?:image|base)|has-image-base)/i.test(tag) && /aria-hidden="true"/.test(tag));
  assert.ok(atlasImageLayer, "the decorative raster should live in an aria-hidden map base layer");

  const regionMapStart = ["{activeAtlasRegionLayout.map", "{cultureRegionLayout.map"]
    .map((marker) => page.indexOf(marker))
    .find((index) => index >= 0) ?? -1;
  const regionMapBlock = page.slice(regionMapStart, page.indexOf("</div>", regionMapStart));
  assert.ok(regionMapStart >= 0, "page should render the atlas region layout");
  assert.match(regionMapBlock, /<button/);
  assert.match(regionMapBlock, /className=\{`atlas-region/, "interactive hit areas should remain transparent HTML button overlays");
  assert.match(regionMapBlock, /disabled=\{!regionData\}/);
  assert.match(regionMapBlock, /aria-pressed=\{isActive\}/);
  assert.match(page, /className="atlas-region-shortcuts"/);
  assert.match(page, /width=\{1539\}/);
  assert.match(page, /height=\{1022\}/);
  assert.match(page, /\u6587\u5316\u7248\u56fe/);
  assert.match(page, /\u671d\u4ee3\u603b\u89c8/);
  assert.match(page, /\u5386\u53f2\u793a\u610f/);
  assert.doesNotMatch(page, /<svg/);

  await access(new URL("../public/atlas/xia-cultural-map-v1.webp", import.meta.url));
});


test("places literary figures and portraits on the cultural atlas", async () => {
  const [page, figures] = await Promise.all([
    readFile(new URL("../app/history-explorer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/literary-figures.ts", import.meta.url), "utf8"),
  ]);

  const erasBlock = page.match(/const eras: Era\[\] = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const timelineEraIds = [...erasBlock.matchAll(/^    id: "([^"]+)",/gm)].map((match) => match[1]);
  const figureEraIds = [...figures.matchAll(/^    eraId: "([^"]+)",/gm)].map((match) => match[1]);
  const uniqueFigureEraIds = [...new Set(figureEraIds)];

  assert.equal(timelineEraIds.length, 23);
  assert.equal(uniqueFigureEraIds.length, 23);
  assert.deepEqual([...uniqueFigureEraIds].sort(), [...timelineEraIds].sort());
  assert.ok(figureEraIds.length >= 60, "literary layer should cover a broad cross-section of figures");
  assert.ok([...figures.matchAll(/works: \[/g)].length >= figureEraIds.length);
  assert.ok([...figures.matchAll(/sourceUrls: \[/g)].length >= figureEraIds.length);
  assert.match(figures, /未采用现代想象图/);
  assert.match(figures, /本页尚未采用未经逐件核验的图像/);
  assert.match(figures, /export const literaryWorkReadings/);
  assert.ok([...figures.matchAll(/kind: "(?:全文|节选|导读)"/g)].length >= 30, "poetry reader should include a substantial first batch");
  for (const title of ["《早发白帝城》", "《春望》", "《水调歌头·明月几时有》", "《天净沙·秋思》", "《长相思·山一程》"]) {
    assert.match(figures, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(page, /literaryFiguresByEra/);
  assert.match(page, /atlasFiguresVisible/);
  assert.match(page, /id="atlas-figure-layer"/);
  assert.match(page, /className="atlas-figure-marker"/);
  assert.match(page, /id="atlas-figure-shortcuts"/);
  assert.match(page, /className="literary-dialog"/);
  assert.match(page, /literaryWorkReadings/);
  assert.match(page, /古诗词与代表作/);
  assert.match(page, /className="poetry-reading"/);
  assert.match(page, /查看原文出处/);
  assert.match(page, /aria-haspopup="dialog"/);
  assert.match(page, /本时期人物层 · 独立于君主三阶段版图/);
  assert.match(page, /名人画像层共 \{literaryFigureStats\.total\} 位/);

  const remoteImageRefs = [...figures.matchAll(/src: "https?:\/\//g)];
  assert.equal(remoteImageRefs.length, 0, "figure portraits should use local files only");
  const localPortraits = [...figures.matchAll(/src: "(\/(?:figures|rulers)\/[^"/]+)"/g)].map((match) => match[1]);
  assert.ok(localPortraits.length >= 4, "at least the verified first-batch portraits should be visible");
  for (const src of localPortraits) {
    await access(new URL(`../public${src}`, import.meta.url));
  }
});
test("resolves ruler territory through 66 polity baselines and three same-polity stages", async () => {
  const [page, territory, catalog, atlas] = await Promise.all([
    readFile(new URL("../app/history-explorer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-territory.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/culture-atlas.ts", import.meta.url), "utf8"),
  ]);

  const catalogGroups = [...catalog.matchAll(/\{ eraId: "([^"]+)", polity: "([^"]+)", rulers: "([^"]+)" \}/g)]
    .map(([, eraId, polity, rulers]) => ({ eraId, polity, rulers: rulers.split("|") }));
  const catalogPolityKeys = catalogGroups.map(({ eraId, polity }) => `${eraId}:${polity}`);

  const polityTemplates = [...territory.matchAll(
    /^\s*\[polityKey\("([^"]+)", "([^"]+)"\)\]: template\("\1", "\2"/gm,
  )].map(([, eraId, polity]) => `${eraId}:${polity}`);
  assert.equal(catalogPolityKeys.length, 66, "the ruler catalogue should continue to expose 66 era-polity groups");
  assert.equal(polityTemplates.length, 66, "every era-polity group should have one territory baseline");
  assert.equal(new Set(polityTemplates).size, 66, "territory baselines should not be duplicated");
  assert.deepEqual([...polityTemplates].sort(), [...catalogPolityKeys].sort());

  const changeRules = [...territory.matchAll(
    /^\s*\[rulerRuleKey\("([^"]+)", "([^"]+)", "([^"]+)"\)\]:/gm,
  )].map(([, eraId, polity, ruler]) => ({ eraId, polity, ruler, key: `${eraId}:${polity}:${ruler}` }));
  const catalogRulerKeys = new Set(catalogGroups.flatMap(({ eraId, polity, rulers }) =>
    rulers.map((ruler) => `${eraId}:${polity}:${ruler}`),
  ));
  assert.ok(changeRules.length >= 40, "the sparse model should retain at least 40 historically meaningful change points");
  assert.equal(new Set(changeRules.map(({ key }) => key)).size, changeRules.length, "ruler change rules should be unique");
  for (const rule of changeRules) {
    assert.ok(catalogRulerKeys.has(rule.key), `${rule.key} should refer to a catalogued ruler in the same polity`);
  }

  assert.match(territory, /export type RulerMapMoment = "accession" \| "middle" \| "end";/);
  assert.match(territory, /const canonicalName = rulerOrEraId\.aliases\?\.\[0\] \?\? rulerOrEraId\.name;/, "curated short display names should still resolve catalogue-keyed territory rules");
  assert.match(territory, /const momentOrder: RulerMapMoment\[\] = \["accession", "middle", "end"\];/);
  assert.match(territory, /accession: "即位时",\s*middle: "统治中期",\s*end: "末期",/);
  assert.match(page, /const rulerMapMoments: RulerMapMoment\[\] = \["accession", "middle", "end"\];/);
  assert.match(page, /className="atlas-moment-switch" role="group"/);
  assert.match(page, /rulerMapMoments\.map\(\(moment\) => \(/);
  assert.match(page, /className=\{`atlas-moment-button/);
  assert.match(page, /aria-pressed=\{atlasRulerMoment === moment\}/);
  assert.match(page, /aria-controls="atlas-region-inspector"/);
  assert.ok([...page.matchAll(/setAtlasRulerMoment\("accession"\)/g)].length >= 4, "era, ruler, overview, and neighbour changes should reset to accession");

  assert.match(page, /atlasRulers\.filter\(\(ruler\) => ruler\.polity === selectedAtlasRuler\.polity\)/);
  assert.match(page, /if \(!atlasPolityRulers\.length\) return;/);
  assert.match(page, /setAtlasRulerId\(atlasPolityRulers\[nextIndex\]\.id\);/);
  assert.match(territory, /\.filter\(\(candidate\) => candidate\.eraId === ruler\.eraId && candidate\.polity === ruler\.polity\)/);
  assert.match(territory, /predecessor end -> current accession -> current middle -> current end/);

  for (const label of ["政权核心", "有效控制", "藩属／影响", "同期政权／争夺", "边界／实控存疑"]) {
    assert.match(page, new RegExp(label));
  }
  assert.match(page, /activeMapStatusLabels = selectedAtlasRuler \? territoryStatusLabels : atlasStatusLabels/);
  assert.match(page, /Object\.entries\(activeMapStatusLabels\)/);
  assert.match(page, /activeMapRegions = rulerTerritoryState\?\.regions \?\? activeAtlas\.regions/);
  assert.match(page, /材料不足时会沿用上一状态并明确标注，不代表疆界没有变化/);
  assert.match(territory, /材料有限 · 承袭\$\{predecessor\.name\}末期示意/);
  assert.match(territory, /材料有限 · 沿用\$\{ruler\.polity\}政权基线/);
  assert.match(territory, /当前沿用\$\{inheritedSourceLabel\}的宏观示意，不表示疆域保持不变/);
  assert.match(territory, /沿用\$\{ruler\.polity\}政权模板示意，不表示疆域保持不变/);

  assert.match(page, /cultureAtlasMapAssets\[atlasEraId\]/, "ruler mode should reuse the selected era's painted base map");
  assert.doesNotMatch(territory, /\/atlas\//, "territory states should remain overlays instead of replacing painted base assets");
  const generatedBaseMaps = [...atlas.matchAll(/generatedAtlasAsset\("([^"]+)",/g)].map((match) => match[1]);
  assert.equal(generatedBaseMaps.length, 22);
  assert.equal(new Set(generatedBaseMaps).size, 22);
  assert.match(atlas, /src:\s*"\/atlas\/xia-cultural-map-v1\.webp"/);
  for (const eraId of ["xia", ...generatedBaseMaps]) {
    await access(new URL(`../public/atlas/${eraId}-cultural-map-v1.webp`, import.meta.url));
  }
});

test("catalogues every ruler in the 23-part timeline without duplicate restoration cards", async () => {
  const catalog = await readFile(new URL("../app/ruler-catalog.ts", import.meta.url), "utf8");
  const groups = [...catalog.matchAll(/\{ eraId: "([^"]+)", polity: "([^"]+)", rulers: "([^"]+)" \}/g)]
    .map(([, eraId, polity, rulers]) => ({ eraId, polity, rulers: rulers.split("|") }));

  const expectedByEra = {
    xia: 17,
    shang: 30,
    "western-zhou": 12,
    "eastern-zhou": 25,
    qin: 3,
    "western-han": 14,
    xin: 3,
    "eastern-han": 14,
    "three-kingdoms": 11,
    jin: 15,
    "sixteen-kingdoms": 68,
    "northern-southern": 58,
    sui: 5,
    tang: 22,
    "five-dynasties": 56,
    liao: 9,
    "northern-song": 9,
    "western-xia": 10,
    "jin-dynasty": 10,
    "southern-song": 9,
    yuan: 11,
    ming: 20,
    qing: 12,
  };

  const actualByEra = Object.fromEntries(Object.keys(expectedByEra).map((eraId) => [
    eraId,
    groups.filter((group) => group.eraId === eraId).reduce((sum, group) => sum + group.rulers.length, 0),
  ]));
  const rulerKeys = groups.flatMap((group) => group.rulers.map((name) => `${group.eraId}:${group.polity}:${name}`));

  assert.deepEqual(actualByEra, expectedByEra);
  assert.equal(rulerKeys.length, 443);
  assert.equal(new Set(rulerKeys).size, 443);
  assert.ok(!rulerKeys.some((key) => /复位|共和行政|孺子婴/.test(key)));
  assert.match(catalog, /唐中宗李显": "684年；705—710年（两度在位）"/);
  assert.match(catalog, /图帖睦尔": "1328—1329年；1329—1332年（两度在位）"/);
  assert.match(catalog, /朱祁镇": "1435—1449年；1457—1464年（两度在位）"/);
});

test("assigns every catalogued ruler one evidence-ranked MBTI candidate", async () => {
  const [catalog, early, late, psychology] = await Promise.all([
    readFile(new URL("../app/ruler-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-psychology-early.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-psychology-late.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-psychology.ts", import.meta.url), "utf8"),
  ]);

  const groups = [...catalog.matchAll(/\{ eraId: "([^"]+)", polity: "([^"]+)", rulers: "([^"]+)" \}/g)]
    .map(([, eraId, , rulers]) => ({ eraId, rulers: rulers.split("|") }));
  const expectedKeys = groups.flatMap((group) => group.rulers.map((name) => `${group.eraId}:${name}`));

  function parseEntries(source, sourceName) {
    const declaredKeys = [...source.matchAll(/^\s*"([^"]+)":\s*(?:profile|r)\(/gm)].map((match) => match[1]);
    const entries = [...source.matchAll(
      /^\s*"([^"]+)":\s*(?:profile|r)\(\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"/gm,
    )].map(([, key, code, confidence, archetype, basis]) => ({ key, code, confidence, archetype, basis }));

    assert.equal(entries.length, declaredKeys.length, `${sourceName} 中每个条目都应包含可解析的 code、confidence、archetype 与 basis`);
    for (const entry of entries) {
      assert.match(entry.code, /^[EI][NS][TF][JP]$/, `${entry.key} 的 MBTI code 不合法`);
      assert.ok(["medium", "low"].includes(entry.confidence), `${entry.key} 的 confidence 不合法`);
      assert.ok(entry.basis.trim().length > 0, `${entry.key} 的 basis 不能为空`);
    }
    return entries;
  }

  const entries = [
    ...parseEntries(early, "ruler-psychology-early.ts"),
    ...parseEntries(late, "ruler-psychology-late.ts"),
  ];
  const entryCounts = new Map();
  for (const entry of entries) {
    entryCounts.set(entry.key, (entryCounts.get(entry.key) ?? 0) + 1);
  }

  assert.equal(expectedKeys.length, 443);
  assert.equal(new Set(expectedKeys).size, 443);
  assert.equal(entries.length, 443);
  assert.deepEqual([...entryCounts.keys()].sort(), [...expectedKeys].sort());
  assert.ok([...entryCounts.values()].every((count) => count === 1), "每位君王应恰好有一个 MBTI 候选条目");
  assert.match(psychology, /throw new Error\(`Missing psychology assessment for \$\{context\.key\}`\)/);
  assert.doesNotMatch(psychology, /fallback/i);
  assert.match(psychology, /const code = entry\.code/);
  assert.match(psychology, /typeof relation === "string" \? "limited"/);
});

test("supports a static GitHub Pages deployment under the repository path", async () => {
  const [nextConfig, pagesTsconfig, workflow, packageJson] = await Promise.all([
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../tsconfig.pages.json", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(nextConfig, /output: isGitHubPages \? "export" : undefined/);
  assert.match(nextConfig, /basePath/);
  assert.match(nextConfig, /tsconfigPath: isGitHubPages \? "tsconfig\.pages\.json"/);
  assert.doesNotMatch(pagesTsconfig, /db\/\*\*/);
  assert.match(packageJson, /"build:pages": "next build"/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(workflow, /NEXT_PUBLIC_SITE_ORIGIN/);
  await access(new URL("../public/.nojekyll", import.meta.url));
});

test("hides the ruler profile modal scrollbar without removing scrolling", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /\.ruler-dialog-shell \{/);
  assert.match(styles, /scrollbar-width: none/);
  assert.match(styles, /\.ruler-dialog-shell::\-webkit-scrollbar/);
});
test("uses page-mode workbench layouts and smoother page transitions", async () => {
  const page = await readFile(new URL("../app/history-explorer.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(page, /site-mode-\$\{pageMode\}/);
  assert.match(styles, /site-mode-constellation \.constellation-section/);
  assert.match(styles, /site-mode-archive \.ruler-directory/);
  assert.match(styles, /@keyframes soft-page-enter/);
  assert.match(styles, /sheet-turn-in/);
});
test("uses roomy workbench layouts without squeezing archive cards", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /grid-auto-flow: column/);
  assert.match(styles, /grid-template-rows: repeat\(2, minmax\(100px, 1fr\)\)/);
  assert.match(styles, /site-mode-constellation \.constellation-section \{[\s\S]*height: calc\(100svh - 70px\)/);
  assert.match(styles, /constellation-relations \{[\s\S]*overflow-x: auto/);
});
test("uses paper book opening motion and archive cabinet styling", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /@keyframes archive-book-open/);
  assert.match(styles, /archive-file-book-pull/);
  assert.match(styles, /content: "档案柜 · 拉开卷宗"/);
  assert.match(styles, /backdrop-filter: none/);
  assert.match(styles, /ruler-dialog-shell::after/);
});
test("replaces glassy hover sheen with paper-like hover states", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /\.portal-card::before,[\s\S]*content: none/);
  assert.doesNotMatch(styles, /animation: ink-sheen 760ms ease/);
  assert.match(styles, /\.portal-card:hover,[\s\S]*box-shadow:[\s\S]*0 16px 28px/);
  assert.match(styles, /ruler-teaser\.archive-spine:hover \.ruler-teaser-copy/);
});

test("centers the ruler dossier dialog on a full-screen stage", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /Keep the ruler dossier visually centered/);
  assert.match(styles, /\.ruler-dialog \{[\s\S]*position: fixed;[\s\S]*width: 100vw/);
  assert.match(styles, /\.ruler-dialog \{[\s\S]*place-items: center/);
  assert.match(styles, /\.ruler-dialog-shell \{[\s\S]*width: min\(1060px, calc\(100vw - clamp\(28px, 7vw, 96px\)\)\)/);
});

test("uses the generated homepage history backdrop with animated layers", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  await access(new URL("../public/backgrounds/home-history-parallax-bg.webp", import.meta.url));
  assert.match(styles, /home-history-parallax-bg\.webp/);
  assert.match(styles, /@keyframes portal-cloud-drift/);
  assert.match(styles, /@keyframes portal-star-float/);
  assert.match(styles, /\.portal-shell::before,[\s\S]*\.portal-shell::after/);
});

test("injects the homepage backdrop path through the deployment base path", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(page, /portalBackgroundStyle/);
  assert.match(page, /\$\{publicBasePath\}\/backgrounds\/home-history-parallax-bg\.webp/);
  assert.match(page, /style=\{portalBackgroundStyle\}/);
  assert.match(styles, /var\(--portal-history-bg, url\("\/backgrounds\/home-history-parallax-bg\.webp"\)\)/);
});

test("uses generated image frames for the four homepage entry cards", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const frameFiles = [
    "home-card-border-timeline.webp",
    "home-card-border-atlas.webp",
    "home-card-border-constellation.webp",
    "home-card-border-archive.webp",
  ];
  for (const file of frameFiles) {
    await access(new URL(`../public/borders/${file}`, import.meta.url));
    assert.match(page, new RegExp(file.replace(".", "\\.")));
  }
  assert.match(page, /--portal-card-frame/);
  assert.match(page, /publicBasePath\}\$\{entry\.frame\}/);
  assert.match(styles, /Generated image frames for the four homepage entry cards/);
  assert.match(styles, /\.portal-card::before \{[\s\S]*background: var\(--portal-card-frame\)/);
});

test("lets generated frames replace the original homepage card borders", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /Let generated frames fully replace the original portal card border/);
  assert.match(styles, /\.portal-card,[\s\S]*\.portal-card:hover,[\s\S]*\.portal-card:focus-visible \{[\s\S]*border: 0;[\s\S]*box-shadow: none/);
  assert.match(styles, /\.portal-card::before \{[\s\S]*background: var\(--portal-card-frame\)/);
  assert.match(styles, /\.portal-card::after \{[\s\S]*linear-gradient\(145deg, rgb\(255 252 242 \/ 0\.76\)/);
});

test("uses Chinese-only homepage card layout with generated arrow art", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  await access(new URL("../public/ornaments/home-card-arrow.webp", import.meta.url));
  assert.doesNotMatch(page, /portal-card-eyebrow/);
  assert.doesNotMatch(page, /entry\.glyph|entry\.eyebrow/);
  assert.match(page, /portal-card-index/);
  assert.match(page, /portal-card-arrow/);
  assert.match(page, /--portal-card-arrow/);
  assert.match(styles, /Homepage card typography and layout pass/);
  assert.match(styles, /aspect-ratio: 1 \/ 1/);
  assert.match(styles, /华文行楷/);
  assert.match(styles, /background: var\(--portal-card-arrow\) center \/ contain no-repeat/);
});

test("uses generated measured frames for timeline dynasty panels", async () => {
  const explorer = await readFile(new URL("../app/history-explorer.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const eraIds = [
    "xia",
    "shang",
    "western-zhou",
    "eastern-zhou",
    "qin",
    "western-han",
    "xin",
    "eastern-han",
    "three-kingdoms",
    "jin",
    "sixteen-kingdoms",
    "northern-southern",
    "sui",
    "tang",
    "five-dynasties",
    "liao",
    "northern-song",
    "western-xia",
    "jin-dynasty",
    "southern-song",
    "yuan",
    "ming",
    "qing",
  ];
  assert.match(explorer, /const eraFrameAssets/);
  assert.match(explorer, /--era-frame/);
  assert.match(explorer, /--era-accent/);
  assert.match(explorer, /--timeline-rulers-frame/);
  assert.match(explorer, /--timeline-events-frame/);
  assert.match(explorer, /era-overview-frame/);
  assert.match(explorer, /events-shell/);
  for (const id of eraIds) {
    const file = `era-frame-${id}.webp`;
    await access(new URL(`../public/timeline-frames/${file}`, import.meta.url));
    assert.match(explorer, new RegExp(file.replace(".", "\\.")));
  }
  assert.match(styles, /Timeline dynasty generated image frames/);
  await access(new URL(`../public/timeline-frames/timeline-rulers-section-frame.webp`, import.meta.url));
  await access(new URL(`../public/timeline-frames/timeline-events-section-frame.webp`, import.meta.url));
  assert.match(styles, /1550 x 1000 dynasty frame assets/);
  assert.match(styles, /1550 x 520 generated border assets/);
  assert.match(styles, /background: var\(--era-frame\) center \/ 100% auto no-repeat/);
  assert.match(styles, /border-image-source: var\(--timeline-rulers-frame\)/);
  assert.match(styles, /border-image-source: var\(--timeline-events-frame\)/);
  assert.match(styles, /\.site-mode-timeline \.era-panel \{[\s\S]*height: auto;[\s\S]*overflow: visible/);
  assert.match(styles, /\.era-panel,\r?\n\.era-panel\.active \{[\s\S]*border: 0;[\s\S]*box-shadow: none/);
});