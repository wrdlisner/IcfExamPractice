import Link from 'next/link';
import { ExamCard } from '@/components/ExamCard';
import { appDisclaimer } from '@/lib/questions';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="card">
        <h1 className="text-2xl font-bold text-slate-900">ICF資格試験 日本語学習アプリ</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          日本語話者向けに、ACC ExamとICF PCC/MCC Credentialing Examの学習を支援する演習アプリです。
          各問題は、倫理・境界・合意・コンピテンシーに基づく判断力を養うためのオリジナル問題として設計しています。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <ExamCard
          exam="ACC"
          description="単一選択式（4択）で、倫理、コーチング定義、境界、コア・コンピテンシーの基礎理解を確認します。"
        />
        <ExamCard
          exam="PCC_MCC"
          description="状況判断形式で、各設問についてBEST（最適）とWORST（最も不適切）を選び、実務的判断力を鍛えます。"
        />
      </section>

      <section className="card bg-amber-50">
        <h2 className="text-lg font-semibold text-amber-900">重要なご案内</h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-900">{appDisclaimer}</p>
      </section>

      <div className="flex justify-end">
        <Link href="/diagnostics" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium">
          学習診断サマリーを見る
        </Link>
      </div>
    </div>
  );
}
