import Footer from '../components/layout/Footer'

import Hero from '../components/sections/Hero'
import SkillCards from '../components/sections/SkillCards'
import JourneySection from '../components/sections/JourneySection'
import ConsultationSection from '../components/sections/ConsultationSection'


function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">

      <Hero />

      <SkillCards />

      <JourneySection />

      <ConsultationSection />

      <Footer />

    </div>
  )
}

export default Home