import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl translate-y-1/3" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-pink-400 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M12 2C12 2 8 6 8 10C8 14 12 22 12 22C12 22 16 14 16 10C16 6 12 2 12 2Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
          </div>
          <span className="font-bold text-slate-800 text-lg group-hover:text-primary-600 transition-colors">
            PsycheAge 心理年龄测试
          </span>
        </div>

        {!isHome && (
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium text-primary-700 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            ← 返回首页
          </button>
        )}
      </header>

      <main className="relative z-10 flex items-center justify-center px-4 pb-10">
        {children}
      </main>
    </div>
  );
}
