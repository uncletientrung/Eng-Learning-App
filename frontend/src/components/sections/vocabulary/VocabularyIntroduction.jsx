import vocabularyImage from "../../../assets/vocabulary/vocab-page.webp";

export default function VocabularyIntroduction() {
  return (
    <section className="mb-12 grid items-center gap-8 md:grid-cols-2">
      <img src={vocabularyImage} alt="Minh họa học từ vựng tiếng Anh" className="w-full rounded-3xl object-contain" />
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Tích lũy từng từ, tiến bộ mỗi ngày</h2>
        <p className="mt-4 leading-relaxed text-slate-600">Khám phá các tài nguyên từ vựng, kết hợp ghi nhớ và ôn tập để xây dựng nền tảng tiếng Anh vững chắc.</p>
      </div>
    </section>
  );
}
