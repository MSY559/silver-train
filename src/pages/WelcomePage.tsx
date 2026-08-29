import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto text-center py-8 md:py-16"
    >
      <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 md:mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse" />
        <div className="relative w-full h-full bg-white/80 backdrop-blur-xl rounded-full shadow-xl border border-white/60 flex items-center justify-center">
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none" className="text-primary-600">
            <path
              d="M50 15C50 15 30 25 30 50C30 62 35 72 40 78C42 80 38 82 36 85C34 88 37 92 42 90C46 88 48 84 50 82C52 84 54 88 58 90C63 92 66 88 64 85C62 82 58 80 60 78C65 72 70 62 70 50C70 25 50 15 50 15Z"
              fill="currentColor"
              opacity="0.15"
            />
            <path
              d="M38 50C38 42 44 36 50 36C56 36 62 42 62 50C62 58 56 64 50 64C44 64 38 58 38 50Z"
              fill="currentColor"
              opacity="0.3"
            />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
            <circle cx="35" cy="35" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="65" cy="35" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="35" cy="65" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="65" cy="65" r="3" fill="currentColor" opacity="0.5" />
            <path
              d="M42 42L58 58M58 42L42 58"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
        <span className="text-gradient">心理年龄测试</span>
      </h1>

      <p className="text-xl md:text-2xl text-slate-600 font-medium mb-2">
        你的身体在成长，但你的灵魂几岁了？
      </p>

      <p className="text-base md:text-lg text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
        通过40道深度心理题，探索你潜意识里的真实年龄。
      </p>

      <motion.button
        onClick={() => navigate("/age")}
        className="btn-primary text-xl md:text-2xl px-10 py-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        开始探索 <span className="ml-2">→</span>
      </motion.button>

      <p className="mt-8 text-sm text-slate-400 flex items-center justify-center gap-2">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
          无需登录
        </span>
        <span className="text-slate-300">·</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
          即时结果
        </span>
      </p>
    </motion.div>
  );
}
