import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTest } from "../context/TestContext";

interface ProcessingStep {
  title: string;
  description: string;
  status: "completed" | "processing" | "pending";
}

const STEPS: ProcessingStep[] = [
  { title: "读取作答结构", description: "同步 40 道题的作答轨迹", status: "pending" },
  { title: "计算心理年龄", description: "推导心理年龄与年龄偏差", status: "pending" },
  { title: "识别人格原型", description: "匹配最贴近的心理画像类型", status: "pending" },
  { title: "封装完整报告", description: "整理关键词、维度和建议", status: "pending" },
];

export default function LoadingPage() {
  const navigate = useNavigate();
  const { calculateResult } = useTest();
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<ProcessingStep[]>(STEPS);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  useEffect(() => {
    const duration = 4500;
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 89);
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stepDuration = 1100;
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((_, index) => {
      if (index < STEPS.length - 1) {
        const t = setTimeout(() => {
          setSteps((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], status: "completed" };
            if (index + 1 < STEPS.length) {
              updated[index + 1] = { ...updated[index + 1], status: "processing" };
              setCurrentStep(index + 1);
            }
            return updated;
          });
        }, stepDuration * (index + 1));
        timers.push(t);
      }
    });

    const finalTimer = setTimeout(() => {
      setProgress(100);
      setSteps((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], status: "completed" };
        return updated;
      });
      setTimeout(() => {
        navigate("/result");
      }, 600);
    }, stepDuration * (STEPS.length + 0.5));
    timers.push(finalTimer);

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto py-8"
    >
      <div className="glass-card p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-4 bg-gradient-to-br from-primary-500 to-pink-400 rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            正在整理你的心理画像
          </h2>
          <p className="text-slate-500 max-w-sm mx-auto">
            系统正在计算你的心理年龄、原型角色与完整的人格分析，请稍候片刻。
          </p>
        </div>

        <div className="bg-white/60 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-slate-700">
              正在处理：{steps[currentStep]?.title}
            </span>
            <span className="font-bold text-primary-600">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar-bg">
            <motion.div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/60"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === "completed"
                      ? "bg-green-500 text-white"
                      : step.status === "processing"
                      ? "bg-primary-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {step.status === "completed" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13L9 17L19 7"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : step.status === "processing" ? (
                    <motion.div
                      className="w-3 h-3 rounded-full bg-white"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ) : (
                    <span className="text-xs">...</span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">{step.title}</div>
                  <div className="text-xs text-slate-500">{step.description}</div>
                </div>
              </div>
              <span
                className={`text-sm font-medium ${
                  step.status === "completed"
                    ? "text-green-600"
                    : step.status === "processing"
                    ? "text-primary-600"
                    : "text-slate-400"
                }`}
              >
                {step.status === "completed"
                  ? "已完成"
                  : step.status === "processing"
                  ? "处理中"
                  : "等待中"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
