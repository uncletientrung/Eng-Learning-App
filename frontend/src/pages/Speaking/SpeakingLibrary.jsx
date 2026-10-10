import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SpeakingHeader from '../../components/sections/speaking/SpeakingHeader'
import SpeakingTopicFilters from '../../components/sections/speaking/SpeakingTopicFilters'
import SpeakingTestList from '../../components/sections/speaking/SpeakingTestList'
import MainLayout from '../../components/layout/MainLayout'

import { speakingTests } from '../../data/speakingTests'
import WritingPagination from '../../components/sections/writing/WritingPagination'

const PAGE_SIZE = 6

function SpeakingLibrary() {
  const [activeTopicGroup, setActiveTopicGroup] = useState('ALL')
  const [activePart, setActivePart] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()

  // Lọc bộ câu hỏi theo nhóm chủ đề và Part
  const filteredTests = useMemo(() => {
    let result = speakingTests

    if (activeTopicGroup !== 'ALL') {
      result = result.filter(
        (test) => test.categoryId === activeTopicGroup
      )
    }

    if (activePart !== 'ALL') {
      result = result.filter(
        (test) => test.part === activePart
      )
    }

    return result
  }, [activeTopicGroup, activePart])

  // Tính số trang
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTests.length / PAGE_SIZE)
  )

  // Lấy dữ liệu của trang hiện tại
  const paginatedTests = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE

    return filteredTests.slice(
      startIndex,
      startIndex + PAGE_SIZE
    )
  }, [filteredTests, currentPage])

  const handleTopicGroupChange = (group) => {
    setActiveTopicGroup(group)
    setCurrentPage(1)
  }

  const handlePartChange = (part) => {
    setActivePart(part)
    setCurrentPage(1)
  }

  const partRoutes = {
    INTRODUCTION_INTERVIEW: 'p1',
    TOPIC: 'p2',
    TOPIC_DISCUSS: 'p3',
    }

  const handleTestClick = (test) => {
    const part = partRoutes[test.part]
    if (!part) return
    navigate(`/speaking/${part}/${test.id}`)
  }

  return (
    <MainLayout>
      <main
        className="
          z-10 mx-auto
          w-full max-w-7xl
          flex-grow
          px-6 pb-25 pt-25
          lg:px-8
        "
      >
        <SpeakingHeader
          activePart={activePart}
          onPartChange={handlePartChange}
        />

        <SpeakingTopicFilters
          activeTopicGroup={activeTopicGroup}
          onTopicGroupChange={handleTopicGroupChange}
        />

        <SpeakingTestList
          tests={paginatedTests}
          onTestClick={handleTestClick}
        />

        <WritingPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </MainLayout>
  )
}

export default SpeakingLibrary