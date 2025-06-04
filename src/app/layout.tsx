import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "北京徒步活动",
  description: "探索北京最美的徒步路线，体验专业的徒步活动",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <Link href="/" className="text-xl font-bold">
                徒步北京
              </Link>
            </div>
            <div className="space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">首页</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">活动</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">关于我们</a>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-gray-50 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center text-gray-500">
              <p>© 2024 北京徒步活动. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
