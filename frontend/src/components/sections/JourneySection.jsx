import { ArrowRight } from 'lucide-react'

function JourneySection() {
  return (
    <section className="relative z-30 w-full bg-white pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[2rem]">

          {/* Image */}
          <div className="relative h-[320px] overflow-hidden">
            <img
              src="/assets/path-finall.webp"
              alt="Hành trình The IELTS Dictionary"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="
              relative z-20
              flex flex-col
              gap-6 bg-white
              p-6
              md:flex-row
              md:items-center
              md:justify-between
              md:px-12 md:py-10
            "
          >
            <div className="max-w-2xl">
              <h3 className="mb-2 text-[18px] font-bold text-slate-800 md:text-[22px]">
                5 năm – Hành trình kiến tạo
              </h3>

              <h2
                className="
                  mb-4 text-[32px]
                  font-black uppercase
                  tracking-tight
                  text-[#0a5c41]
                  md:text-[48px]
                  lg:text-[56px]
                "
              >
                TƯƠNG LAI NGÔN NGỮ
              </h2>

              <p className="text-[14px] font-medium leading-relaxed text-slate-500 md:text-[15px] lg:text-[17px]">
                Chúng tôi không ngừng nỗ lực để mang đến
                phương pháp học tập hiện đại, cá nhân hóa
                và hiệu quả nhất cho mỗi học viên.
              </p>
            </div>

            <a
              href="/about"
              className="
                group flex w-full
                max-w-[300px]
                items-center
                justify-between
                rounded-full
                border border-[#0a5c41]/20
                bg-white
                py-2 pl-7 pr-2
                shadow-sm
                transition-all
                hover:border-[#0a5c41]/50
                hover:shadow-md
                md:w-[320px]
              "
            >
              <span className="text-[16px] font-bold text-[#0a5c41]">
                Tìm hiểu thêm về TID
              </span>

              <span
                className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  bg-[#0a5c41]
                  text-white
                "
              >
                <ArrowRight size={24} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneySection