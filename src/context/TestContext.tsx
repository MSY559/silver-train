import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Answer, TestResult, calculateMentalAge } from "../utils/calculator";

interface TestContextType {
  answers: Answer[];
  actualAge: number;
  result: TestResult | null;
  setAnswer: (questionId: number, optionIndex: number, scores: Record<string, number>) => void;
  setActualAge: (age: number) => void;
  calculateResult: () => void;
  reset: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [actualAge, setActualAge] = useState<number>(0);
  const [result, setResult] = useState<TestResult | null>(null);

  const setAnswer = useCallback(
    (questionId: number, optionIndex: number, scores: Record<string, number>) => {
      setAnswers((prev) => {
        const existingIndex = prev.findIndex((a) => a.questionId === questionId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = { questionId, optionIndex, scores };
          return updated;
        }
        return [...prev, { questionId, optionIndex, scores }];
      });
    },
    []
  );

  const calculateResult = useCallback(() => {
    const r = calculateMentalAge(answers, actualAge);
    setResult(r);
  }, [answers, actualAge]);

  const reset = useCallback(() => {
    setAnswers([]);
    setActualAge(0);
    setResult(null);
  }, []);

  return (
    <TestContext.Provider
      value={{ answers, actualAge, result, setAnswer, setActualAge, calculateResult, reset }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest(): TestContextType {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTest must be used within a TestProvider");
  }
  return context;
}
