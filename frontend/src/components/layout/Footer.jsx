function Footer() {
  return (
    <footer className="bg-[#063d2d] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <h3 className="mb-6 text-lg font-bold">
              The IELTS Dictionary
            </h3>

            <p className="text-sm leading-relaxed text-white/60">
              Nền tảng học và luyện thi IELTS trực tuyến.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">
              Tài nguyên
            </h3>

            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="/vocabulary" className="hover:text-white">
                  Sổ từ vựng
                </a>
              </li>

              <li>
                <a href="/grammar" className="hover:text-white">
                  Ngữ pháp
                </a>
              </li>

              <li>
                <a href="/shadowing" className="hover:text-white">
                  Shadowing
                </a>
              </li>

              <li>
                <a href="/blog" className="hover:text-white">
                  Kinh Nghiệm Sĩ Tử
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">
              IELTS
            </h3>

            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="/listening" className="hover:text-white">
                  IELTS Listening
                </a>
              </li>

              <li>
                <a href="/reading" className="hover:text-white">
                  IELTS Reading
                </a>
              </li>

              <li>
                <a href="/writing" className="hover:text-white">
                  IELTS Writing
                </a>
              </li>

              <li>
                <a href="/speaking" className="hover:text-white">
                  IELTS Speaking
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">
              Đăng Ký Nhận Tin
            </h3>

            <p className="mb-4 text-sm text-white/60">
              Nhận tài liệu độc quyền và thông tin các khóa học
              ưu đãi hàng tuần.
            </p>

            <input
              type="email"
              placeholder="Email của bạn"
              className="
                w-full rounded-xl
                border border-white/10
                bg-white/10
                px-4 py-3
                text-sm text-white
                outline-none
                placeholder:text-white/40
              "
            />
          </div>

        </div>


      </div>
    </footer>
  )
}

export default Footer