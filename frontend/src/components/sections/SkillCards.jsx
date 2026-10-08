import SkillCard from './SkillCard'
import { skills } from '../../data/skills'
import { useNavigate } from 'react-router-dom'

function SkillCards({ onOpenReadingModal, onMascotSmile }) {
  const navigate = useNavigate()

  const handleSkillClick = (skill) => {
    if (skill.action === 'open-reading-modal') {
      onOpenReadingModal()
      return
    }

    if (skill.action === 'navigate') {
      navigate(skill.path)
    }
  }
  return (
    <section className="relative z-30 w-full overflow-hidden bg-white py-10">
      <div className="mx-auto max-w-[1300px] px-4 md:px-8">
        <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {skills.map((skill) => (
            <SkillCard
              key={skill.title}
              skill={skill}
              EventOnClick={handleSkillClick}
              onMouseEnter={() => onMascotSmile(true)}
              onMouseLeave={() => onMascotSmile(false)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillCards