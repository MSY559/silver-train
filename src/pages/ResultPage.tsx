import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTest } from "../context/TestContext";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ResultPage() {
  const navigate = useNavigate();
  const { result, reset } = useTest();
  const chartRef = useRef<ChartJS<"radar">>(null);
  const [shareStatus, setShareStatus] = useState<string>("");

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  if (!result) return null;

  const handleRestart = () => {
    reset();
    navigate("/");
  };

  const handleShare = async () => {
    const shareText = `我的心理年龄是 ${result.mentalAge} 岁！我是「${result.personalityTitle}」。来测测你的心理年龄吧！`;
    setShareStatus("正在分享...");

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setShareStatus("已复制到剪贴板！");
      } else {
        setShareStatus("分享文本已生成！");
      }
    } catch {
      setShareStatus(shareText);
    }

    setTimeout(() => setShareStatus(""), 3000);
  };

  const chartData = {
    labels: result.dimensions.map((d) => d.label),
    datasets: [
      {
        label: "人格维度",
        data: result.dimensions.map((d) => d.value),
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(139, 92, 246, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(139, 92, 246, 1)",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        angleLines: {
          display: true,
          color: "rgba(156, 163, 175, 0.3)",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
        },
        pointLabels: {
          font: {
            size: 12,
            weight: 500 as const,
          },
          color: "#475569",
        },
        ticks: {
          display: false,
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `得分：${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto py-4 md:py-8 space-y-5"
    >
      {/* 顶部标题卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 md:p-10 text-center overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-pink-100/50 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            {result.keywords.slice(0, 3).map((kw, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
              >
                {kw}
              </motion.span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">{result.personalityTitle}</span>
          </h1>

          <div className="flex items-center justify-center gap-6 my-5">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-slate-900">{result.mentalAge}</div>
              <div className="text-sm text-slate-500">心理年龄</div>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold text-slate-700">{result.actualAge}</div>
              <div className="text-sm text-slate-500">实际年龄</div>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-center">
              <div
                className={`text-2xl md:text-3xl font-bold ${
                  result.ageDifference > 0
                    ? "text-primary-600"
                    : result.ageDifference < 0
                    ? "text-pink-500"
                    : "text-slate-600"
                }`}
              >
                {result.ageDifference > 0 ? "+" : ""}
                {result.ageDifference}
              </div>
              <div className="text-sm text-slate-500">偏差值</div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed max-w-lg mx-auto">
            {result.traits.join(" · ")}
          </p>
        </div>
      </motion.div>

      {/* 雷达图 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 md:p-8"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary-500 rounded-full" />
          人格维度雷达图
        </h3>
        <div className="max-w-xs mx-auto md:max-w-sm">
          <Radar ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* 深度自我分析 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 md:p-8"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary-500 rounded-full" />
          深度自我分析
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50/80 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-600">✓</span>
              <h4 className="font-semibold text-green-900">核心优势</h4>
            </div>
            <ul className="space-y-2">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-600">!</span>
              <h4 className="font-semibold text-amber-900">潜在盲点</h4>
            </div>
            <ul className="space-y-2">
              {result.blindSpots.map((s, i) => (
                <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-slate-800 mb-2">维度解读</h4>
          {result.dimensionAnalysis.map((dim, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-white/80"
            >
              <div className="flex-shrink-0">
                <div className="w-20 flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-700">{dim.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full">
                    {dim.level}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{dim.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 社交与匹配 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 md:p-8"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary-500 rounded-full" />
          社交与匹配
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.matches.map((match, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white/70 rounded-2xl p-5 text-center border border-white/80 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{match.avatar}</div>
              <h4 className="font-semibold text-slate-800 mb-2">{match.name}</h4>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{match.description}</p>
              <div className="flex items-center justify-center gap-1">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-pink-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${match.matchRate}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                  />
                </div>
                <span className="text-xs font-bold text-primary-600 ml-1">{match.matchRate}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 建议文本 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 md:p-8"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary-500 rounded-full" />
          给未来的建议
        </h3>
        <p className="text-slate-600 leading-relaxed">{result.advice}</p>
      </motion.div>

      {/* 操作按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
      >
        <button onClick={handleRestart} className="btn-secondary">
          🔄 重新测试
        </button>
        <button onClick={handleShare} className="btn-primary">
          {shareStatus || "📤 分享结果"}
        </button>
        <button onClick={() => navigate("/")} className="btn-secondary">
          🏠 返回首页
        </button>
      </motion.div>
    </motion.div>
  );
}
