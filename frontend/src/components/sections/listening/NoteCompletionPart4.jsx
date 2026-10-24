import GapInput from "./GapInput";

const NoteCompletionPart4 = ({ answers = {}, onChange }) => {
    return (
        <section className="space-y-3">
            <p className="text-[rgba(26,26,18,0.7)] text-[15px] mb-4 whitespace-pre-wrap">
                Complete the notes below. Write ONE WORD ONLY for each answer.
            </p>

            <div className="border-[2.5px] border-[#1a1a12] bg-white rounded-[14px] overflow-hidden text-[14px]">
                {/* Tiêu đề trên cùng của card */}
                <div className="text-center pt-2.5 pb-1 font-['Space_Grotesk'] text-[15px] font-bold text-[#1a1a12]">
                    RECLAIMING URBAN RIVERS
                </div>

                {/* Nội dung chi tiết */}
                <div className="px-6 py-3 text-slate-800 leading-[2]">
                    {/* --- Mục: Historical background --- */}
                    <div className="py-1">
                        <strong className="font-bold">Historical background</strong>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              Nearly all major cities were built on a river.
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              Rivers were traditionally used by city dwellers for transport, fishing and recreation.
            </span>
                    </div>

                    <div className="py-1">
                        <span>Industrial development and rising populations later led to:</span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              more sewage from houses being discharged into the river
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              pollution from{" "}
                            <GapInput qid={31} answers={answers} onChange={onChange} /> on the river bank
            </span>
                    </div>

                    <div className="py-1 flex flex-wrap items-baseline">
                        <span>In 1957, the River Thames in London was declared biologically </span>
                        <GapInput qid={32} answers={answers} onChange={onChange} />
                    </div>

                    {/* --- Mục: Recent improvements --- */}
                    <div className="py-1">
                        <strong className="font-bold">Recent improvements</strong>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              Seals and even a <GapInput qid={33} answers={answers} onChange={onChange} /> have been seen in the River Thames.
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              Riverside warehouses are converted to restaurants and <GapInput qid={34} answers={answers} onChange={onChange} />
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              In Los Angeles, there are plans to:
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              build a riverside <GapInput qid={35} answers={answers} onChange={onChange} />
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              display <GapInput qid={36} answers={answers} onChange={onChange} /> projects
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              In Paris, <GapInput qid={37} answers={answers} onChange={onChange} /> are created on the sides of the river every summer.
            </span>
                    </div>

                    {/* --- Mục: Transport possibilities --- */}
                    <div className="py-1">
                        <strong className="font-bold">Transport possibilities</strong>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              Over 2 billion passengers already travel by <GapInput qid={38} answers={answers} onChange={onChange} /> in cities around the world.
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              Changes in shopping habits mean the number of deliveries that are made is increasing.
            </span>
                    </div>

                    <div className="flex gap-2 items-baseline py-1">
                        <span className="shrink-0 text-slate-600 leading-[1.9]">•</span>
                        <span className="flex-1">
              Instead of road transport, goods could be transported by large freight barges and electric{" "}
                            <GapInput qid={39} answers={answers} onChange={onChange} />, or in the future, by{" "}
                            <GapInput qid={40} answers={answers} onChange={onChange} />
            </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoteCompletionPart4;