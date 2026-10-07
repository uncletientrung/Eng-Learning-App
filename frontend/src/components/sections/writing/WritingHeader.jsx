import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import WritingFilters from './WritingFilters'

function WritingHeader({ activeFilter, onFilterChange }) {
  return (
    <div className="mb-10">

      <Link
        to="/"
        className="
          mb-6 inline-flex items-center
          font-medium text-slate-500
          transition-colors
          hover:text-indigo-600
        "
      >
        <ArrowLeft className="mr-2 h-4 w-4" />

        Trở về
      </Link>

      <div
        className="
          flex flex-col gap-6
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <h1
            className="
              text-4xl font-extrabold
              tracking-tight text-slate-900
            "
          >
            Thư Viện{' '}
            <span className="text-indigo-600">
              Writing-tests
            </span>
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Phát triển kỹ năng Writing-tests với bộ đề thi
            được mô phỏng bám sát định dạng thực tế.
          </p>
        </div>

        <WritingFilters
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  )
}

export default WritingHeader