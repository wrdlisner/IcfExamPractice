import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ICF資格試験 学習アプリ',
  description: 'ICF ACC試験とPCC/MCCクレデンシャル試験の日本語演習アプリ'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja-JP">
      <body>
        <main className="mx-auto min-h-screen max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
