import { ArrowLeft } from 'lucide-react'
import LinkButton from '../../ui/LinkButton'

function WritingHeader() {
  return (
    <div className="mb-2">
      <LinkButton
        to="/"
        backgroundColor = "bg-white"
        textColor = 'text-black'
        className="px-10 py-2"
      >
        <ArrowLeft size={16} />
        Trở về
      </LinkButton>


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
              mt-3
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
      </div>
    </div>
  )
}

export default WritingHeader