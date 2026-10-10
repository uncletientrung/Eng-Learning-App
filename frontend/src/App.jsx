import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import WritingLibrary from './pages/Writing/WritingLibrary'
import WritingTest from './pages/Writing/WritingTest'
import SpeakingLibrary from './pages/Speaking/SpeakingLibrary'

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
    </Routes>
  )
}

export default App