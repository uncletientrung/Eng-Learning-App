import { useMemo, useState } from 'react'

import WritingHeader from '../../components/sections/writing/WritingHeader'
import WritingTestList from '../../components/sections/writing/WritingTestList'
import WritingPagination from '../../components/sections/writing/WritingPagination'

import { writingTests } from '../../data/writingTests'

function WritingLibrary() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTests = useMemo(() => {
    if (activeFilter === 'ALL') {
      return writingTests
    }

    if (activeFilter === 'TASK_1') {
      return writingTests.filter(
        (test) => test.taskType === 'Task 1'
      )
    }

    if (activeFilter === 'TASK_2') {
      return writingTests.filter(
        (test) => test.taskType === 'Task 2'
      )
    }

    if (activeFilter === 'BUILDER') {
      return []
    }

    return writingTests
  }, [activeFilter])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const handleTestClick = (test) => {
    console.log('Selected writing test:', test)
  }

  return (
    <main
      className="
        z-10 mx-auto
        w-full max-w-7xl
        flex-grow
        px-6 pb-20 pt-32
        lg:px-8
      "
    >
      <WritingHeader
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <WritingTestList
        tests={filteredTests}
        onTestClick={handleTestClick}
      />

      <WritingPagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />
    </main>
  )
}

export default WritingLibrary