import { readFile } from 'node:fs/promises';

const raw = await readFile(new URL('../data/questions.json', import.meta.url), 'utf8');
const json = JSON.parse(raw);

if (!json.disclaimer || !Array.isArray(json.questions)) {
  throw new Error('questions.json の構造が不正です。');
}

const acc = json.questions.filter((q) => q.exam === 'ACC');
const pcc = json.questions.filter((q) => q.exam === 'PCC_MCC');

if (acc.length !== 20 || pcc.length !== 20) {
  throw new Error(`問題数が不正です: ACC=${acc.length}, PCC/MCC=${pcc.length}`);
}

console.log('Lint OK: questions.json structure and counts are valid.');
