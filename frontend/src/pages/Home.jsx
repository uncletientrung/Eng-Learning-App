import Footer from '../components/layout/Footer'
import { useState } from 'react'

import Hero from '../components/sections/Hero'
import SkillCards from '../components/sections/SkillCards'
import JourneySection from '../components/sections/JourneySection'
import ConsultationSection from '../components/sections/ConsultationSection'
import ReadingSelectionModal from '../components/sections/ReadingSelectionModal'


function Home() {
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false)
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">

      <Hero />

      <SkillCards
        onOpenReadingModal={() => setIsReadingModalOpen(true)}
      />

      <JourneySection />

      <ConsultationSection />

      {isReadingModalOpen && (
        <ReadingSelectionModal
          onClose={() => setIsReadingModalOpen(false)}
        />
      )}

      <Footer />

    </div>
  )
}

export default Home