'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { allQuestions } from '@/lib/questions';
import { getSessions } from '@/lib/storage';

type Stats = { total: number; correct: number; highConfWrong: number; lowConfWrong: number; slowCorrect: number };

const SLOW_THRESHOLD_MS = 75_000;

export default function DiagnosticsPage() {
  const summary = useMemo(() => {
    const sessions = getSessions();
    const statsByKey: Record<string, Stats> = {};

    for (const session of sessions) {
      for (const answer of session.answers) {
        const q = allQuestions.find((item) => item.id === answer.questionId);
        if (!q) continue;

        const keys = [
          `試験:${q.exam}`,
          `領域:${q.domain}`,
          `コンピテンシー:${q.competency}`,
          `難易度:${q.difficulty}`
        ];

        for (const key of keys) {
          statsByKey[key] ??= { total: 0, correct: 0, highConfWrong: 0, lowConfWrong: 0, slowCorrect: 0 };
          const row = statsByKey[key];
          row.total += 1;
          if (answer.isCorrect) row.correct += 1;
          if (!answer.isCorrect && answer.confidence >= 4) row.highConfWrong += 1;
          if (!answer.isCorrect && answer.confidence <= 2) row.lowConfWrong += 1;
          if (answer.isCorrect && answer.responseTimeMs > SLOW_THRESHOLD_MS) row.slowCorrect += 1;
        }
      }
    }

    return Object.entries(statsByKey)
      .map(([key, value]) => ({
        key,
        ...value,
        accuracy: value.total ? Math.round((value.correct / value.total) * 100) : 0
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, []);

  const priorities = summary.filter((item) => item.total >= 2).slice(0, 8);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">学習診断サマリー</h1>
      <p className="text-sm text-slate-700">
        正答率、回答スピード、自信度の組み合わせから、誤概念の可能性や理解不足領域を可視化します。
      </p>

      {priorities.length === 0 ? (
        <div className="card">
          <p>まだ十分な履歴がありません。まずは演習に取り組んでください。</p>
        </div>
      ) : (
        <div className="space-y-3">
          {priorities.map((item) => (
            <div key={item.key} className="card">
              <h2 className="text-base font-semibold">{item.key}</h2>
              <p className="mt-1 text-sm">正答率: {item.accuracy}%（{item.correct}/{item.total}）</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                <li>低正答×高自信（誤概念の可能性）: {item.highConfWrong}件</li>
                <li>低正答×低自信（理解不足の可能性）: {item.lowConfWrong}件</li>
                <li>高正答×低速（試験対応力の課題）: {item.slowCorrect}件</li>
              </ul>
              <p className="mt-2 rounded bg-slate-100 p-2 text-sm">
                推奨: {item.highConfWrong > 0 ? '倫理・定義の再確認を優先。' : item.lowConfWrong > 0 ? '基礎理解の復習を優先。' : '時間制限を設けた演習を継続。'}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm">ホームへ</Link>
        <Link href="/review" className="rounded-lg bg-teal-700 px-4 py-2 text-sm text-white">レビューへ</Link>
      </div>
    </div>
  );
}
