const Gap = ({ num }) => {
    return (
        <span className="inline align-middle leading-normal mx-1 max-w-full" id={`question-${num}`} style={{ scrollMarginTop: 80 }}>
      <label className="inline-flex items-center gap-1 max-w-full">
        <span className="border-2 border-[#1a1a12] min-w-[20px] text-[#1a1a12] select-none bg-white rounded-[6px] flex-none flex justify-center items-center px-1 font-['Space_Grotesk'] text-[11px] font-bold leading-[18px] transition-colors" aria-hidden="true">
          {num}
        </span>
        <span
            className="inline-grid items-center max-w-full box-content border-0 border-b-2 border-[#1a1a12] min-w-[8em] h-auto shadow-none text-[#1a1a12] bg-transparent rounded-none font-['Space_Grotesk'] text-[15px] font-semibold relative focus-within:border-b-[#e8b13a] focus-within:shadow-none after:content-[attr(data-value)] after:[grid-area:1/1] after:px-1 after:py-0.5 after:invisible after:whitespace-pre after:overflow-hidden"
            data-value=""
        >
          <input
              aria-label={`Question ${num}`}
              data-gap=""
              data-gap-qid={num}
              type="text"
              defaultValue=""
              className="[grid-area:1/1] w-full min-w-0 h-full text-inherit bg-transparent border-0 rounded-none outline-none px-1 py-0.5 text-[15px]"
          />
        </span>
      </label>
    </span>
    );
};

const FillBlanksNotes = () => {
    return (
        <div className="anchor-hl-note">
            <div className="border-[2.5px] border-[#1a1a12] bg-white rounded-[14px] px-6 py-[22px] relative">
                {[7, 8, 9, 10, 11, 12, 13].map((n) => (
                    <span
                        key={n}
                        id={`question-${n}`}
                        className="absolute -top-4 left-0"
                        style={{ scrollMarginTop: 80 }}
                    />
                ))}

                <div className="mb-2">
                    <div className="text-[#1a1a12] font-['Space_Grotesk'] text-[22px] font-bold leading-tight [&_*]:!my-0">
                        <p><strong>Questions 7–13</strong></p>
                    </div>
                </div>

                <div className="text-[#1a1a12]/70 text-[14px] leading-[1.55] mb-5 [&_p]:!my-2 [&_strong]:text-[#1a1a12]">
                    <p>Complete the notes below.</p>
                    <p>Choose <strong className="text-black font-semibold">ONE WORD AND/OR A NUMBER</strong> from the passage for each answer.</p>
                </div>

                <div className="text-[15px] leading-8 text-[#1a1a12]">
                    <p className="my-2 text-center mb-3"><strong className="font-bold">New Zealand's kākāpō</strong></p>
                    <p className="my-2"><strong className="font-bold">A type of parrot:</strong></p>
                    <p className="my-2">– diet consists of fern fronds, various parts of a tree and <Gap num={7} /></p>
                    <p className="my-2">– nests are created in <Gap num={8} /> where eggs are laid.</p>

                    <p className="my-2"><strong className="font-bold">Arrival of Polynesian settlers</strong></p>
                    <p className="my-2">– the <Gap num={9} /> of the kākāpō were used to make clothes.</p>

                    <p className="my-2"><strong className="font-bold">Arrival of European colonisers</strong></p>
                    <p className="my-2">– <Gap num={10} /> were an animal which they introduced that ate the kākāpō's food sources.</p>

                    <p className="my-2"><strong className="font-bold">Protecting kākāpō</strong></p>
                    <p className="my-2">– Richard Henry, a conservationist, tried to protect the kākāpō.</p>
                    <p className="my-2">– a definite sighting of female kākāpō on Rakiura Island was reported in the year <Gap num={11} /></p>
                    <p className="my-2">– the Recovery Plan included an increase in <Gap num={12} /></p>
                    <p className="my-2">– a current goal of the Recovery Plan is to maintain the involvement of <Gap num={13} /> in kākāpō protection.</p>
                </div>
            </div>
        </div>
    );
};

export default FillBlanksNotes;