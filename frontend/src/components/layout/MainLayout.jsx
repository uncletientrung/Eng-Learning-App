import Navbar from './Navbar'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function MainLayout({ children, transparentNavbar = false  }) {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [location.pathname])

  return (
    <div className="min-h-screen">
      <Navbar
        transparentOnTop={transparentNavbar}
      />

      {children}
    </div>
  )
}

export default MainLayout