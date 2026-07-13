# 华夏长卷

横向浏览中国古代历史的交互式时间轴，从夏商周延伸到清末。网站收录 23 个历史时期、443 位实际在位君主，以及朝代大事记和覆灭原因。

公开网站：[https://cjuan-12.github.io/huaxia-history-timeline/](https://cjuan-12.github.io/huaxia-history-timeline/)

## 君王档案

- 姓名、政权、在位次序与可核验的公版画像
- 个人情感、君臣、伴侣／后妃、父母宗族、藩属／外部政权五类关系观察
- 按 E/I、S/N、T/F、J/P 四维给出的 MBTI 史料行为候选
- “中等置信”与带问号的“低置信候选”分级，以及结构代理和每类关系材料的缺载提示

历史人物不能完成现代标准化问卷，因此 MBTI 只是依据现存行为记录所作的现代映射，不是本人自测结果、学术定论或心理诊断。对幼主、傀儡、短祚及材料稀少者，网站会明确降低置信度；史料沉默不被解释为缺少某种情感。

## 本地开发

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

验证与构建：

```bash
npm test
npm run build:pages
```

`main` 分支通过 `.github/workflows/deploy-pages.yml` 自动发布到 GitHub Pages。
