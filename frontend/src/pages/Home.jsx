import MainLayout from '../components/layout/MainLayout'

import Hero from '../components/sections/Hero'
import SkillCards from '../components/sections/SkillCards'
import JourneySection from '../components/sections/JourneySection'
import ConsultationSection from '../components/sections/ConsultationSection'
import ReadingSelectionModal from '../components/sections/ReadingSelectionModal'
import Footer from '../components/layout/Footer'

import { useState } from 'react'

function Home() {
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false)

  return (
    <MainLayout transparentNavbar={true}>
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
    </MainLayout>
    
  )
}

export default Home