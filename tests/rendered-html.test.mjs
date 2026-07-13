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
  assert.match(readableHtml, /全部 443 位/);
  assert.match(readableHtml, /找到 443 位/);
  assert.match(readableHtml, /暂无可靠传世画像/);
  assert.match(readableHtml, /MBTI 为基于史料行为与兴趣的趣味推演/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps ruler profiles accessible and portrait assets local", async () => {
  const [page, profiles, catalog, layout, packageJson, portraits] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-profiles.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readdir(new URL("../public/rulers/", import.meta.url)),
  ]);

  assert.match(page, /<dialog/);
  assert.match(page, /aria-haspopup="dialog"/);
  assert.match(page, /onCancel=/);
  assert.match(page, /非心理诊断/);
  assert.match(profiles, /宫廷画像|传世画像|后世绘像/);
  assert.match(profiles, /code: "(?:ENTJ|ISTJ|ESTJ|ENFJ|INTJ|ENTP|ESTP|INFJ)"/);
  assert.match(profiles, /Wikimedia Commons 公版/);
  assert.match(catalog, /code: "待考"/);
  assert.match(catalog, /kind: "暂无可靠传世画像"/);
  assert.match(catalog, /未采用现代想象图/);
  assert.match(layout, /443 位君主身份档案/);
  assert.match(layout, /images: \[\{ url: "\/og\.png"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  const referencedPortraits = [...profiles.matchAll(/src: "\/rulers\/([^"/]+)"/g)].map((match) => match[1]);
  assert.equal(portraits.length, referencedPortraits.length);
  assert.deepEqual([...portraits].sort(), [...referencedPortraits].sort());
  assert.ok(portraits.every((name) => /\.(?:jpe?g|png)$/i.test(name)));

  await access(new URL("../public/og.png", import.meta.url));

  await assert.rejects(access(new URL("app/_sites-preview/", root)));
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
