import { useMemo, useState } from 'react'

import WritingHeader from '../../components/sections/writing/WritingHeader'
import WritingChartFilters from '../../components/sections/writing/WritingChartFilters'
import WritingTestList from '../../components/sections/writing/WritingTestList'
import WritingPagination from '../../components/sections/writing/WritingPagination'
import MainLayout from '../../components/layout/MainLayout'

import { writingTests } from '../../data/writingTests'

function WritingLibrary() {
  const [activeChartFilter, setActiveChartFilter] =useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTests = useMemo(() => {
    let result = writingTests
    // Filter loại biểu đồ
    if (activeChartFilter !== 'ALL') {
      result = result.filter(
        (test) =>
          test.chartType === activeChartFilter
      )
    }

    return result
  }, [activeChartFilter])


  const handleChartFilterChange = (filter) => {
    setActiveChartFilter(filter)
    setCurrentPage(1)
  }

  const handleTestClick = (test) => {
    console.log(
      'Selected writing test:',
      test
    )
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
          <WritingHeader />

          <WritingChartFilters
            activeChartFilter={activeChartFilter}
            onChartFilterChange={handleChartFilterChange}
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
      </MainLayout>
    )
}

export default WritingLibrary