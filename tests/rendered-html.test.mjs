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
  assert.match(html, /<title>华夏长卷｜中国古代历史时间轴<\/title>/);
  assert.match(html, /中国古代历史横向时间轴/);
  assert.match(html, /代表君王/);
  assert.match(html, /秦始皇/);
  assert.match(html, /MBTI 为基于史料行为与兴趣的趣味推演/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps ruler profiles accessible and portrait assets local", async () => {
  const [page, profiles, layout, packageJson, portraits] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ruler-profiles.ts", import.meta.url), "utf8"),
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
  assert.match(layout, /君王身份档案、MBTI 行为推演/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.equal(portraits.length, 12);
  assert.ok(portraits.every((name) => /\.(?:jpe?g|png)$/i.test(name)));

  await assert.rejects(access(new URL("app/_sites-preview/", root)));
});
