import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { TestProvider } from "./context/TestContext";
import WelcomePage from "./pages/WelcomePage";
import AgePage from "./pages/AgePage";
import QuizPage from "./pages/QuizPage";
import LoadingPage from "./pages/LoadingPage";
import ResultPage from "./pages/ResultPage";
import Layout from "./components/Layout";

function App() {
  const location = useLocation();

  return (
    <TestProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/age" element={<AgePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </TestProvider>
  );
}

export default App;
