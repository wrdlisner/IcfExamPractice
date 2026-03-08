import Link from 'next/link';
import { notFound } from 'next/navigation';
import { QuizRunner } from '@/components/QuizRunner';
import { getQuestionsByExam } from '@/lib/questions';
import { ExamType } from '@/types/quiz';

export default function QuizPage({ params }: { params: { exam: string } }) {
  const exam = params.exam as ExamType;
  if (exam !== 'ACC' && exam !== 'PCC_MCC') return notFound();

  const questions = getQuestionsByExam(exam);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{exam === 'ACC' ? 'ACC Exam演習' : 'PCC/MCC試験演習'}</h1>
        <Link href="/" className="text-sm text-teal-700 underline">ホーム</Link>
      </div>
      <QuizRunner exam={exam} questions={questions} />
    </div>
  );
}
