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
        <div className='mt-5'>
          <h1 className="text-3xl font-black tracking-tight text-[#111] sm:text-4xl">
            Thư viện{' '}
            <span className="underline decoration-[#ffc926] decoration-4 underline-offset-4">
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