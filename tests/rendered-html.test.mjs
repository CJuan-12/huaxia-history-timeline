import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the history timeline and featured rulers", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const readableHtml = html.replaceAll("<!-- -->", "");
  assert.match(readableHtml, /<title>华夏长卷｜中国古代历史时间轴<\/title>/);
  assert.match(readableHtml, /中国古代历史横向时间轴/);
  assert.match(readableHtml, /代表君王/);
  assert.match(readableHtml, /秦始皇/);
  assert.match(readableHtml, /君王档案馆/);
  assert.match(readableHtml, /帝王关系星谱/);
  assert.match(readableHtml, /夏后氏世系星链/);
  assert.match(readableHtml, /覆盖全部 23 个历史时期/);
  assert.match(readableHtml, /全部 443 位/);
  assert.match(readableHtml, /找到 443 位/);
  assert.match(readableHtml, /暂无可靠传世画像/);
  assert.match(readableHtml, /MBTI 为基于史料行为、兴趣与关系的候选推演/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps ruler profiles accessible and portrait assets local", async () => {
  const [page, profiles, portraitCatalog, catalog, constellations, lineage, lineageData, layout, packageJson, portraits] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
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
  assert.match(page, /onClick=\{\(event\) => openRuler\(ruler, event\.currentTarget\)\}/);
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
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
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
