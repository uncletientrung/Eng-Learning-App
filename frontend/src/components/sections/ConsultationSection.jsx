import { Mail, User } from 'lucide-react'

function ConsultationSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col overflow-hidden rounded-[2rem] bg-slate-50 md:flex-row">

          {/* Image */}
          <div className="relative min-h-[400px] md:w-5/12">
            <img
              src="/assets/about-us/consultation.webp"
              alt="Tư vấn IELTS"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="flex w-full flex-col justify-center p-8 md:w-7/12 md:p-14 lg:p-16">
            <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-slate-800 lg:text-[48px]">
              Nhận tư vấn IELTS
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                miễn phí
              </span>
            </h2>

            <p className="mb-8 text-sm font-medium text-slate-500 md:text-base">
              Nhập thông tin để được tư vấn lộ trình học IELTS
              phù hợp với mục tiêu của bạn.
            </p>

            <form className="flex flex-col gap-4">
              <div className="relative flex items-center">
                <User
                  className="absolute left-4 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-white
                    py-4 pl-12 pr-4
                    font-medium text-slate-700
                    shadow-sm outline-none
                    transition-all
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />
              </div>

              <div className="relative flex items-center">
                <Mail
                  className="absolute left-4 text-slate-400"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="
                    w-full rounded-xl
                    border border-slate-200
                    bg-white
                    py-4 pl-12 pr-4
                    font-medium text-slate-700
                    shadow-sm outline-none
                    transition-all
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  mt-2 rounded-xl
                  bg-[#0a5c41]
                  py-4
                  font-bold text-white
                  transition
                  hover:bg-[#084c36]
                "
              >
                Đăng ký tư vấn
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationSection