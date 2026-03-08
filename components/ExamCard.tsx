import Link from 'next/link';
import { ExamType } from '@/types/quiz';

const examLabels: Record<ExamType, string> = {
  ACC: 'ACC Exam',
  PCC_MCC: 'ICF PCC/MCC Credentialing Exam'
};

export function ExamCard({ exam, description }: { exam: ExamType; description: string }) {
  return (
    <div className="card flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-teal-800">{examLabels[exam]}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
      </div>
      <Link
        href={`/quiz/${exam}`}
        className="inline-flex w-fit rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
      >
        この試験を開始する
      </Link>
    </div>
  );
}
