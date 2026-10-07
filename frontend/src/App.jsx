import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import WritingLibrary from './pages/Writing/WritingLibrary'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/writing"
        element={<WritingLibrary />}
      />
    </Routes>
  )
}

export default App