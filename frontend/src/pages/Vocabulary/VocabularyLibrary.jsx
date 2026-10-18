import { useState } from "react";
import "./VocabularyLibrary.css";
import MainLayout from "../../components/layout/MainLayout";
import VocabularyHeader from "../../components/sections/vocabulary/VocabularyHeader";
import VocabularyLearningPath from "../../components/sections/vocabulary/VocabularyLearningPath";
import VocabularyIntroduction from "../../components/sections/vocabulary/VocabularyIntroduction";
import VocabularyResources from "../../components/sections/vocabulary/VocabularyResources";
import VocabularyResourceDialog from "../../components/sections/vocabulary/VocabularyResourceDialog";
import { vocabularyResources } from "../../data/vocabularyResources";

export default function VocabularyLibrary() {
  const [activeResource, setActiveResource] = useState(null);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8f8f4] selection:bg-[#cfdfb7] selection:text-[#283d1d]">
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-36 md:px-6 md:pt-40">
          <VocabularyHeader />
          <VocabularyLearningPath />
          <VocabularyIntroduction />
          <VocabularyResources onOpenResource={setActiveResource} />
        </main>
      </div>
      {activeResource && (
        <VocabularyResourceDialog
          resource={vocabularyResources[activeResource]}
          onClose={() => setActiveResource(null)}
        />
      )}
    </MainLayout>
  );
}
