import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "徒步北京 - 探索北京最美的徒步路线",
  description: "发现北京周边最受欢迎的徒步路线，包括香山、慕田峪长城、灵山等经典路线。提供详细的路线指南、难度评级和实用建议。",
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
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                徒步北京
              </Link>
              <div className="space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900">首页</Link>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900">徒步攻略</Link>
                <Link href="/activities" className="text-gray-600 hover:text-gray-900">活动日历</Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">关于我们</Link>
              </div>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-gray-50 border-t">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">关于我们</h3>
                <p className="text-gray-600">徒步北京致力于为徒步爱好者提供最优质的徒步路线信息和活动组织服务。</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">联系方式</h3>
                <p className="text-gray-600">邮箱：contact@hiking-beijing.com</p>
                <p className="text-gray-600">电话：010-12345678</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">关注我们</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-600 hover:text-gray-900">微信</Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">微博</Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">抖音</Link>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-gray-600">
              <p>&copy; 2024 徒步北京. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
