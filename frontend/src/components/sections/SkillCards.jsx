import SkillCard from './SkillCard'
import { skills } from '../../data/skills'
import { useNavigate } from 'react-router-dom'
import { getAuthenticatedToken } from '../../services/authApi'
import './HeroClouds.css'

function SkillCards({ onOpenReadingModal, onMascotSmile }) {
  const navigate = useNavigate()

  const handleSkillClick = (skill) => {
    if (!getAuthenticatedToken()) {
      navigate('/login', { state: { from: skill.path } })
      return
    }

    if (skill.action === 'open-reading-modal') {
      onOpenReadingModal()
      return
    }

    if (skill.action === 'navigate') {
      navigate(skill.path)
    }
  }
  return (
    <section className="home-sky relative z-30 w-full overflow-hidden py-10">
      <div className="home-sky__clouds" aria-hidden="true">
        <span className="home-sky__cloud home-sky__cloud--one" />
        <span className="home-sky__cloud home-sky__cloud--two" />
        <span className="home-sky__cloud home-sky__cloud--three" />
        <span className="home-sky__cloud home-sky__cloud--four" />
        {[1, 2].map((bird) => (
          <span key={bird} className={`home-sky__bird home-sky__bird--${bird}`}>
            <svg viewBox="0 0 40 16" focusable="false">
              <path d="M1 3C8 3 14 5 20 11C26 5 32 3 39 3C32 7 26 9 20 15C14 9 8 7 1 3Z" />
            </svg>
          </span>
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-[1300px] px-4 md:px-8">
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