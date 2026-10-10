import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import WritingLibrary from './pages/Writing/WritingLibrary'
import WritingTest from './pages/Writing/WritingTest'
import SpeakingLibrary from './pages/Speaking/SpeakingLibrary'
import SpeakingPart1 from './pages/Speaking/SpeakingPart1'
import SpeakingPart2 from './pages/Speaking/SpeakingPart2'

function App() {
  return (
    <Routes>  
      <Route path="/" element={<Home />} />

      <Route
        path="/writing"
        element={<WritingLibrary />}
      />
      <Route
        path="/writing/:id"
        element={<WritingTest />}
      />
      <Route
        path="/speaking"
        element={<SpeakingLibrary />}
      />
      <Route path="/speaking/p1/:id" element={<SpeakingPart1 />} />
      <Route path="/speaking/p2/:id" element={<SpeakingPart2 />} />
    </Routes>
  )
}

export default App