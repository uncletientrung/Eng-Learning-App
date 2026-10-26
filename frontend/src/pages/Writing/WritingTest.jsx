import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import LinkButton from '../../components/ui/LinkButton'
import WritingTestHeader from '../../components/sections/writing/writing-test/WritingTestHeader'
import WritingPrompt from '../../components/sections/writing/writing-test/WritingPrompt'
import WritingGuide from '../../components/sections/writing/writing-test/WritingGuide'
import WritingEditor from '../../components/sections/writing/writing-test/WritingEditor'
import { getWritingExerciseById } from '../../services/writingAPI.js'
import { getAccessToken } from '../../services/authApi.js'

function WritingTest() {
  const { id } = useParams()
  const pageRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [test, setTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [topicName, setTopicName] = useState('Chưa có topic')

   // Lấy chi tiết bài Writing theo ID trên URL
  useEffect(() => {
    let cancelled = false
    async function fetchTest() {
      try {
        setLoading(true)
        setError('')
        setTest(null)
        const data = await getWritingExerciseById(id)

        if (cancelled) return
        setTest(data)
        setTopicName(data.topic != null ? data.topic.name :  'Chưa có topic')

      } catch (err) { 
        console.error('Lỗi tải bài Writing:', err)
        if (!cancelled) {
          setError('Không thể tải dữ liệu bài Writing.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    fetchTest()

    return () => {
      cancelled = true
    }
  }, [id])
  useEffect(() => {
    console.log('Tests hiện tại:', test);
  }, [test]);

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

  if (loading) {
    return <div className="p-8">Đang tải bài Writing...</div>
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>
  }

  if (!test) {
    return <div className="p-8">Không tìm thấy bài Writing.</div>
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

        <WritingTestHeader 
          topicName = {topicName}
        />

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

            {test.instruction?.trim() && (
              <WritingGuide test={test} />
            )}

          </div>

          {/* RIGHT */}
          <WritingEditor
            test={test}
            isFullscreen={isFullscreen}
            onFullscreen={handleFullscreen}
            token={getAccessToken()}
          />

        </div>
      </div>
    </main>
  )
}

export default WritingTest