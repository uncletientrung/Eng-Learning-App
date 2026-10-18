import { useNavigate } from "react-router-dom";
import "./VocabularyLibrary.css";
import MainLayout from "../../components/layout/MainLayout";
import VocabularyHeader from "../../components/sections/vocabulary/VocabularyHeader";
import VocabularyLearningPath from "../../components/sections/vocabulary/VocabularyLearningPath";
import VocabularyIntroduction from "../../components/sections/vocabulary/VocabularyIntroduction";
import VocabularyResources from "../../components/sections/vocabulary/VocabularyResources";

export default function VocabularyLibrary() {
  const navigate = useNavigate();

  // URL: /vocabulary
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8f8f4] selection:bg-[#cfdfb7] selection:text-[#283d1d]">
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-36 md:px-6 md:pt-40">
          <VocabularyHeader />
          <VocabularyLearningPath />
          <VocabularyIntroduction />
          <VocabularyResources onOpenResource={() => navigate("/vocabulary/dashboard")} />
        </main>
      </div>
    </MainLayout>
  );
}
