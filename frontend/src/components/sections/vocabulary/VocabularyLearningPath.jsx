const steps = ["Khám phá từ mới", "Ghi nhớ qua Flashcard", "Ôn tập và vận dụng"];

export default function VocabularyLearningPath() {
  return (
    <section aria-label="Lộ trình học từ vựng" className="mb-12 grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">{index + 1}</span>
          <h2 className="font-semibold text-slate-800">{step}</h2>
        </div>
      ))}
    </section>
  );
}
