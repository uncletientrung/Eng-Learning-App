import WritingTestCard from './WritingTestCard'

function WritingTestList({ tests, onTestClick }) {
  if (tests.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-semibold text-slate-500">
          Không tìm thấy bài Writing nào.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {tests.map((test) => (
        <WritingTestCard
          key={test.id}
          test={test}
          onClick={onTestClick}
        />
      ))}
    </div>
  )
}

export default WritingTestList