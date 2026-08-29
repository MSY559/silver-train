import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { questions } from "../data/questions";
import { useTest } from "../context/TestContext";

export default function QuizPage() {
  const navigate = useNavigate();
  const { setAnswer, answers } = useTest();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (isAnimating) return;
      setSelectedOption(optionIndex);
      setAnswer(currentQuestion.id, optionIndex, currentQuestion.options[optionIndex].scores);

      setIsAnimating(true);

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
        } else {
          navigate("/loading");
        }
        setIsAnimating(false);
      }, 600);
    },
    [currentIndex, currentQuestion, setAnswer, navigate, isAnimating]
  );

  const getOptionLabel = (index: number) => {
    const labels = ["A", "B", "C", "D"];
    return labels[index];
  };

  return (
    <div className="w-full max-w-xl mx-auto py-4 md:py-8 px-2">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-slate-500 font-medium mb-3">
          <span>
            Question <span className="text-primary-600 font-bold">{currentIndex + 1}</span>
          </span>
          <span>
            <span className="text-primary-600 font-bold">{questions.length}</span> total
          </span>
        </div>
        <div className="progress-bar-bg">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 leading-snug">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleSelect(index)}
                className={`option-card w-full text-left ${
                  selectedOption === index ? "option-card-selected" : ""
                }`}
                disabled={isAnimating}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                    selectedOption === index
                      ? "bg-primary-600 text-white"
                      : "bg-primary-100 text-primary-600"
                  }`}
                >
                  {getOptionLabel(index)}
                </span>
                <span className="text-slate-700 font-medium leading-relaxed">
                  {option.text}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <p className="mt-4 text-center text-xs text-slate-400">
        点击选项自动进入下一题 · 进度 {answers.length}/{questions.length}
      </p>
    </div>
  );
}
