import SpeakingTestCard from './SpeakingTestCard';

function SpeakingTestList({ tests, onTestClick }) {
  if (tests.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-semibold text-slate-500">
          Không tìm thấy bài Speaking nào.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {tests.map((test) => (
        <SpeakingTestCard
          key={test.id}
          test={test}
          onClick={onTestClick}
        />
      ))}
    </div>
  );
}

export default SpeakingTestList;