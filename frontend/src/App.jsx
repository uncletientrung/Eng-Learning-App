import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Home from './pages/Home'
import WritingLibrary from './pages/Writing/WritingLibrary'
import WritingTest from './pages/Writing/WritingTest'
import TranslationLandingPage from './pages/Writing/Translation/TranslationLandingPage'
import SpeakingLibrary from './pages/Speaking/SpeakingLibrary'
import SpeakingPart1 from './pages/Speaking/SpeakingPart1'
import SpeakingPart2 from './pages/Speaking/SpeakingPart2'
import SpeakingPart3 from './pages/Speaking/SpeakingPart3'
import GrammarLandingPage from './pages/Grammar/GrammarLandingPage'
import ReadingLibrary from "./pages/Reading/ReadingLibrary.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import ListeningLibrary from "./pages/Listening/ListeningLibrary.jsx";
import ExamPage from "./components/sections/reading/reading-test/ExamPage.jsx";
import {ReadingResultPage} from "./components/sections/reading/Result/index.js";
import ReviewPage from "./pages/Reading/ReviewPage.jsx";
import ListeningExam from "./pages/Listening/ListeningExam.jsx";

const VocabularyDashboard = lazy(() => import('./pages/Vocabulary/VocabularyDashboard'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route
        path="/writing"
        element={<WritingLibrary />}
      />
      <Route
        path="/writing/:id"
        element={<WritingTest />}
          />
      <Route path="/translation" element={<TranslationLandingPage />}/>
      <Route
        path="/speaking"
        element={<SpeakingLibrary />}
      />
      <Route path="/speaking/p1/:id" element={<SpeakingPart1 />} />
      <Route path="/speaking/p2/:id" element={<SpeakingPart2 />} />
      <Route path="/speaking/p3/:id" element={<SpeakingPart3 />} />

      {/* Vocab */}
      <Route path="/vocabulary/dashboard" element={<Suspense fallback={<div className="min-h-screen bg-[#0e1014]" role="status" aria-label="Đang tải dashboard" />}><VocabularyDashboard /></Suspense>} />
      <Route path="/vocabulary/flashcard" element={<Suspense fallback={<div className="min-h-screen bg-[#0e1014]" role="status" aria-label="Đang tải flashcard" />}><VocabularyDashboard flashcardPage /></Suspense>} />
      <Route path="/grammar" element={<GrammarLandingPage />}/>
      <Route path="/reading" element={<ReadingLibrary />} />
      <Route path="/reading/exam" element={<ExamPage />} />
      <Route path="/reading/exam/result" element={<ReadingResultPage />} />
      <Route path="/reading/exam/result/review" element={<ReviewPage />} />
      <Route path="/listening" element={<ListeningLibrary/>}/>
      <Route path="/listening/exam" element={<ListeningExam />} />
    </Routes>
  )
}

export default App
