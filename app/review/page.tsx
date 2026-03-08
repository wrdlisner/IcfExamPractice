'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { allQuestions } from '@/lib/questions';
import { getActiveSessionId, getSessions } from '@/lib/storage';

export default function ReviewPage() {
  const session = useMemo(() => {
    const sessionId = getActiveSessionId();
    const sessions = getSessions();
    if (!sessionId) return sessions[0];
    return sessions.find((item) => item.id === sessionId) ?? sessions[0];
  }, []);

  if (!session) {
    return (
      <div className="card">
        <p>レビュー対象の学習履歴がありません。先に問題演習を実施してください。</p>
        <Link href="/" className="mt-3 inline-block text-teal-700 underline">ホームへ戻る</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">レビュー</h1>
      {session.answers.map((answer, idx) => {
        const question = allQuestions.find((item) => item.id === answer.questionId);
        if (!question) return null;

        const correctText =
          question.exam === 'ACC'
            ? `正解: ${String.fromCharCode(65 + question.correctAnswer)}.`
            : `BEST: ${String.fromCharCode(65 + question.bestAnswer)} / WORST: ${String.fromCharCode(65 + question.worstAnswer)}`;

        return (
          <div key={answer.questionId} className="card">
            <p className="text-xs text-slate-500">問題 {idx + 1} / {question.id}</p>
            <p className="mt-2 text-sm leading-relaxed">{'stem' in question ? question.stem : question.scenario}</p>
            <p className="mt-3 text-sm">あなたの回答: {String.fromCharCode(65 + answer.selectedAnswer)}{question.exam === 'PCC_MCC' ? ` / WORST: ${answer.selectedWorstAnswer !== undefined ? String.fromCharCode(65 + answer.selectedWorstAnswer) : '-'}` : ''}</p>
            <p className="text-sm font-semibold text-teal-800">{correctText}</p>
            <p className="mt-2 text-sm text-slate-700">解説: {question.explanation}</p>
            {question.exam === 'PCC_MCC' && (
              <p className="mt-1 text-sm text-slate-700">BEST理由: {question.bestRationale} / WORST理由: {question.worstRationale}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">自信度: {answer.confidence} / 回答時間: {(answer.responseTimeMs / 1000).toFixed(1)}秒 / 判定: {answer.isCorrect ? '正答' : '誤答'}</p>
          </div>
        );
      })}
      <div className="flex gap-3">
        <Link href="/diagnostics" className="rounded-lg bg-teal-700 px-4 py-2 text-sm text-white">診断サマリーへ</Link>
        <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm">ホームへ</Link>
      </div>
    </div>
  );
}
