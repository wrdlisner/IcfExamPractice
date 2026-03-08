'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConfidenceSelector } from '@/components/ConfidenceSelector';
import { clearActiveSessionId, saveSession, setActiveSessionId } from '@/lib/storage';
import { Question, QuizAnswer, QuizSession } from '@/types/quiz';

export function QuizRunner({ exam, questions }: { exam: 'ACC' | 'PCC_MCC'; questions: Question[] }) {
  const router = useRouter();
  const sessionId = useMemo(() => `${exam}-${Date.now()}`, [exam]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedWorst, setSelectedWorst] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5 | undefined>(undefined);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const questionStart = useRef<number>(Date.now());

  const question = questions[index];

  const submitAnswer = () => {
    if (!question || selected === null || !confidence) return;
    if (question.exam === 'PCC_MCC' && selectedWorst === null) return;

    const isCorrect =
      question.exam === 'ACC'
        ? selected === question.correctAnswer
        : selected === question.bestAnswer && selectedWorst === question.worstAnswer;

    const answer: QuizAnswer = {
      questionId: question.id,
      selectedAnswer: selected,
      selectedWorstAnswer: selectedWorst ?? undefined,
      isCorrect,
      confidence,
      responseTimeMs: Date.now() - questionStart.current,
      answeredAt: new Date().toISOString()
    };

    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);

    if (index === questions.length - 1) {
      const session: QuizSession = {
        id: sessionId,
        exam,
        startedAt: new Date(questionStart.current).toISOString(),
        completedAt: new Date().toISOString(),
        answers: nextAnswers
      };
      saveSession(session);
      setActiveSessionId(sessionId);
      router.push('/review');
      return;
    }

    setIndex((prev) => prev + 1);
    setSelected(null);
    setSelectedWorst(null);
    setConfidence(undefined);
    questionStart.current = Date.now();
  };

  const restart = () => {
    clearActiveSessionId();
    router.push('/');
  };

  if (!question) return null;

  return (
    <div className="space-y-4">
      <div className="card">
        <p className="text-sm text-slate-600">進捗 {index + 1} / {questions.length}</p>
        <div className="mt-2 h-2 w-full rounded bg-slate-200">
          <div className="h-2 rounded bg-teal-700" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="card">
        <p className="text-xs text-slate-500">領域: {question.domain} / コンピテンシー: {question.competency} / 難易度: {question.difficulty}</p>
        <h2 className="mt-2 text-lg font-semibold leading-relaxed">
          {'stem' in question ? question.stem : question.scenario}
        </h2>

        <div className="mt-4 space-y-2">
          {question.choices.map((choice, choiceIndex) => (
            <button
              key={choice}
              type="button"
              onClick={() => setSelected(choiceIndex)}
              className={`w-full rounded-lg border p-3 text-left text-sm ${
                selected === choiceIndex ? 'border-teal-800 bg-teal-50' : 'border-slate-300'
              }`}
            >
              {String.fromCharCode(65 + choiceIndex)}. {choice}
            </button>
          ))}
        </div>

        {question.exam === 'PCC_MCC' && (
          <div className="mt-5">
            <p className="text-sm font-medium text-slate-700">WORST（最も不適切）な選択肢を選んでください</p>
            <div className="mt-2 space-y-2">
              {question.choices.map((choice, choiceIndex) => (
                <button
                  key={`${choice}-worst`}
                  type="button"
                  onClick={() => setSelectedWorst(choiceIndex)}
                  className={`w-full rounded-lg border p-3 text-left text-sm ${
                    selectedWorst === choiceIndex ? 'border-rose-700 bg-rose-50' : 'border-slate-300'
                  }`}
                >
                  {String.fromCharCode(65 + choiceIndex)}. {choice}
                </button>
              ))}
            </div>
          </div>
        )}

        <ConfidenceSelector value={confidence} onSelect={setConfidence} />

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submitAnswer}
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            disabled={
              selected === null ||
              !confidence ||
              (question.exam === 'PCC_MCC' && selectedWorst === null)
            }
          >
            回答して次へ
          </button>
          <button type="button" onClick={restart} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
            ホームへ戻る
          </button>
        </div>
      </div>
    </div>
  );
}
