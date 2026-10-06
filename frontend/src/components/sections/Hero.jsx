import { ArrowRight } from 'lucide-react'
import Navbar from '../layout/Navbar'
import HeroMascot from './HeroMascot'

function Hero() {
  return (
    <section className="relative flex min-h-[101vh] w-full flex-col overflow-hidden bg-brand">

      {/* Grid background */}
      <div
        className="
          pointer-events-none
          absolute inset-0 z-0
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.15) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.15) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <Navbar />

      <main
        className="
          relative z-10
          mx-auto flex w-full
          max-w-7xl flex-1
          flex-col items-start
          justify-start
          px-6 pt-[22vh]
          md:pt-[24vh]
          lg:pt-[28vh]
        "
      >
        <div className="w-full max-w-2xl text-left">
          
          <div className="mb-3 flex flex-col items-start">
            <h2
              className="
                text-[28px]
                font-extrabold
                leading-tight
                tracking-tight
                text-white/90
                md:text-[48px]
              "
            >
              Nền tảng
            </h2>

            <h1
              className="
                relative mb-6
                text-[10vw]
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-5xl
                md:text-[72px]
              "
            >
              <span className="relative z-10">
                Luyện thi IELTS

                <span
                  className="
                    absolute -right-0 -top-1
                    rounded-sm bg-white
                    px-1.5 py-0.5
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.1em]
                    bg-white
                    md:-top-2.5
                    md:px-2
                    md:text-[10px]
                    text-brand
                  "
                >
                  trực tuyến
                </span>

                <span
                  className="
                    absolute left-0
                    top-[5%] -z-10
                    h-[90%] w-full
                    bg-white/20
                  "
                />
              </span>
            </h1>

            <p
              className="
                mb-6 hidden max-w-[480px]
                text-sm font-medium
                leading-relaxed
                text-white/80
                md:block md:text-[17px]
              "
            >
              The IELTS Dictionary quy tụ đội ngũ giáo viên
              IELTS 8.5, sở hữu nền tảng học thuật quốc tế
              và nhiều năm kinh nghiệm giảng dạy.
            </p>
          </div>

          <a
            href="/about"
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-full
              bg-white
              px-8 py-3.5
              text-[14px] font-black
              bg-brand
              shadow-2xl
              transition-all
              hover:-translate-y-0.5
              hover:bg-slate-50
              active:scale-95
              md:text-base
            "
          >
            chương trình học cam kết đầu ra tại TID

            <ArrowRight
              size={20}
              className="
                transition-transform
                group-hover:translate-x-1
              "
            />
          </a>
        </div>
      </main>

      {/* LINH THÚ / SVG GÓC PHẢI */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          right-[-150px]
          z-10

          w-[500px]
          h-[500px]

          md:bottom-[-250px]
          md:right-[-180px]
          md:w-[700px]
          md:h-[700px]

          lg:bottom-[-350px]
          lg:right-[-250px]
          lg:w-[900px]
          lg:h-[900px]
        "
      >
        <HeroMascot />
      </div>
    </section>
  )
}

export default Hero