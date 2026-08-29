import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTest } from "../context/TestContext";

export default function AgePage() {
  const navigate = useNavigate();
  const { setActualAge } = useTest();

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = currentYear; y >= currentYear - 80; y--) {
      list.push(y);
    }
    return list;
  }, [currentYear]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = useMemo(() => {
    const list: number[] = [];
    for (let d = 1; d <= 31; d++) {
      list.push(d);
    }
    return list;
  }, []);

  const [year, setYear] = useState(currentYear - 25);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const handleSubmit = () => {
    const age = currentYear - year - (new Date().getMonth() + 1 < month || (new Date().getMonth() + 1 === month && new Date().getDate() < day) ? 1 : 0);
    setActualAge(age);
    navigate("/quiz");
  };

  const canSubmit = year && month && day;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto py-8"
    >
      <div className="glass-card p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-5 bg-primary-100 rounded-2xl flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-primary-600">
              <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
              <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="8" cy="14" r="1.5" fill="currentColor" />
              <circle cx="12" cy="14" r="1.5" fill="currentColor" />
              <circle cx="16" cy="14" r="1.5" fill="currentColor" />
              <circle cx="8" cy="17" r="1.5" fill="currentColor" />
              <circle cx="12" cy="17" r="1.5" fill="currentColor" />
              <circle cx="16" cy="17" r="1.5" fill="currentColor" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            首先，确认你的实际年龄
          </h2>
          <p className="text-slate-500 text-base">我们需要它来计算心理年龄偏差值</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">年份</label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-3 py-3 bg-white/60 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}年
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">月份</label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full px-3 py-3 bg-white/60 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all cursor-pointer"
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}月
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">日期</label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full px-3 py-3 bg-white/60 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all cursor-pointer"
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}日
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="btn-dark w-full text-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          进入测试 <span className="ml-2">→</span>
        </motion.button>

        <p className="mt-6 text-center text-sm text-slate-400">
          你的生日信息仅用于本次测试计算，不会被存储。
        </p>
      </div>
    </motion.div>
  );
}
