import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Home from './pages/Home'
import WritingLibrary from './pages/Writing/WritingLibrary'
import WritingTest from './pages/Writing/WritingTest'
import TranslationLandingPage from './pages/Translation/TranslationLandingPage'
import SpeakingLibrary from './pages/Speaking/SpeakingLibrary'
import SpeakingPart1 from './pages/Speaking/SpeakingPart1'
import SpeakingPart2 from './pages/Speaking/SpeakingPart2'
import SpeakingPart3 from './pages/Speaking/SpeakingPart3'
import GrammarLandingPage from './pages/Grammar/GrammarLandingPage'
import Theory from './pages/Grammar/Theory'
import ReadingLibrary from "./pages/Reading/ReadingLibrary.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import ListeningLibrary from "./pages/Listening/ListeningLibrary.jsx";
import ExamPage from "./components/sections/reading/reading-test/ExamPage.jsx";
import {ReadingResultPage} from "./components/sections/reading/Result/index.js";
import ReviewPage from "./pages/Reading/ReviewPage.jsx";
import RequireAuth from './components/layout/RequireAuth';
import ListeningResultPage from "./components/sections/listening/Result/ListeningResultPage.jsx";
import ListeningExamPage from "./pages/Listening/ListeningExamPage.jsx";
import RequireAdmin from "./components/admin/RequireAdmin";

const VocabularyDashboard = lazy(() => import('./pages/Vocabulary/VocabularyDashboard'))
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"))
const AdminDashboardPage = lazy(() => import("./pages/Admin/AdminDashboardPage"))
const AdminWritingExercisesPage = lazy(() => import("./pages/Admin/AdminWritingExercisesPage"))
const AdminWritingExerciseFormPage = lazy(() => import("./pages/Admin/AdminWritingExerciseFormPage"))
const AdminWritingExerciseDetailPage = lazy(() => import("./pages/Admin/AdminWritingExerciseDetailPage"))
const AdminWritingSubmissionsPage = lazy(() => import("./pages/Admin/AdminWritingSubmissionsPage"))
const AdminWritingSubmissionDetailPage = lazy(() => import("./pages/Admin/AdminWritingSubmissionDetailPage"))
const AdminSpeakingExercisesPage = lazy(() => import("./pages/Admin/AdminSpeakingExercisesPage"))
const AdminSpeakingExerciseFormPage = lazy(() => import("./pages/Admin/AdminSpeakingExerciseFormPage"))
const AdminSpeakingExerciseDetailPage = lazy(() => import("./pages/Admin/AdminSpeakingExerciseDetailPage"))
const AdminSpeakingSubmissionsPage = lazy(() => import("./pages/Admin/AdminSpeakingSubmissionsPage"))
const AdminSpeakingSubmissionDetailPage = lazy(() => import("./pages/Admin/AdminSpeakingSubmissionDetailPage"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route element={<RequireAuth />}>
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={
            <Suspense fallback={<div className="min-h-screen bg-slate-100 p-6" role="status">Đang tải khu vực quản trị...</div>}>
              <AdminLayout />
            </Suspense>
          }>
            <Route index element={<AdminDashboardPage />} />
            <Route path="writing" element={<AdminWritingExercisesPage />} />
            <Route path="writing/create" element={<AdminWritingExerciseFormPage />} />
            <Route path="writing/edit/:id" element={<AdminWritingExerciseFormPage />} />
            <Route path="writing/submissions" element={<AdminWritingSubmissionsPage />} />
            <Route path="writing/submissions/:id" element={<AdminWritingSubmissionDetailPage />} />
            <Route path="writing/:id" element={<AdminWritingExerciseDetailPage />} />
            <Route path="speaking" element={<AdminSpeakingExercisesPage />} />
            <Route path="speaking/create" element={<AdminSpeakingExerciseFormPage />} />
            <Route path="speaking/edit/:id" element={<AdminSpeakingExerciseFormPage />} />
            <Route path="speaking/submissions" element={<AdminSpeakingSubmissionsPage />} />
            <Route path="speaking/submissions/:id" element={<AdminSpeakingSubmissionDetailPage />} />
            <Route path="speaking/:id" element={<AdminSpeakingExerciseDetailPage />} />
          </Route>
        </Route>
      </Route>
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
      <Route element={<RequireAuth />}>
        <Route path="/vocabulary/dashboard" element={<Suspense fallback={<div className="min-h-screen bg-[#0e1014]" role="status" aria-label="Đang tải dashboard" />}><VocabularyDashboard /></Suspense>} />
        <Route path="/vocabulary/flashcard" element={<Suspense fallback={<div className="min-h-screen bg-[#0e1014]" role="status" aria-label="Đang tải flashcard" />}><VocabularyDashboard flashcardPage /></Suspense>} />
      </Route>

      <Route path="/grammar" element={<GrammarLandingPage />} />
      <Route path="/grammar/theory" element={<Theory />} />

      <Route path="/reading" element={<ReadingLibrary />} />
      <Route path="/reading/exam" element={<ExamPage />} />
      <Route path="/reading/exam/result" element={<ReadingResultPage />} />
      <Route path="/reading/exam/result/review" element={<ReviewPage />} />

      <Route path="/listening" element={<ListeningLibrary/>}/>
      <Route path="/listening/exam/:examid" element={<ListeningExamPage />} />

      <Route path="/listening/result/:submissionid" element={<ListeningResultPage/>} />
    </Routes>
  )
}

export default App
