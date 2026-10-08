import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { writingTests } from '../../data/writingTests'
import LinkButton from '../../components/ui/LinkButton'
import WritingTestHeader from '../../components/sections/writing/writing-test/WritingTestHeader'
import WritingPrompt from '../../components/sections/writing/writing-test/WritingPrompt'
import WritingGuide from '../../components/sections/writing/writing-test/WritingGuide'
import WritingEditor from '../../components/sections/writing/writing-test/WritingEditor'

function WritingTest() {
  const { id } = useParams()
  const pageRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const test = writingTests.find(
    (item) => item.id === Number(id)
  )
  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await pageRef.current?.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === pageRef.current
      )
    }

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange
    )

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange
      )
    }
  }, [])

  if (!test) {
    return <div>Không tìm thấy bài viết.</div>
  }
  

  return (
    <main ref={pageRef} className="min-h-screen bg-brand relative text-slate-800">
      
      {/* Grid background */}
      <div
        className="
          absolute inset-0
          opacity-[0.15]
          pointer-events-none
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgb(255,255,255) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgb(255,255,255) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-8">
        {/* Quay về */}
        <LinkButton
            to="/writing"
            backgroundColor = "bg-white"
            textColor = 'text-black'
            className="px-10 py-2"
        >
            <ArrowLeft size={16} />
            Quay lại
        </LinkButton>

        <WritingTestHeader test={test} />

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[400px_1fr]
            xl:grid-cols-[450px_1fr]
            gap-6
            items-start
          "
        >

          {/* LEFT */}
          <div className="flex flex-col gap-4 sticky top-6">

            <WritingPrompt test={test} />

            <WritingGuide test={test} />

          </div>

          {/* RIGHT */}
          <WritingEditor
            test={test}
            isFullscreen={isFullscreen}
            onFullscreen={handleFullscreen}
          />

        </div>
      </div>
    </main>
  )
}

export default WritingTest