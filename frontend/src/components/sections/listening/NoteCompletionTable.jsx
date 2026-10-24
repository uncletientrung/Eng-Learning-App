import GapInput from "./GapInput";

const NoteCompletionTable = ({ answers, onChange }) => {
    return (
        <div className="py-6 flex justify-center overflow-x-auto">
            <table className="w-full max-w-6xl border-collapse border-[2.5px] border-[#1a1a12] bg-white rounded-sm">
                <thead>
                <tr>
                    <th colSpan={4} className="px-4 py-2.5 text-left font-bold text-[14px] border-[2px] border-[rgba(26,26,18,0.28)]">
                        Restaurant recommendations
                    </th>
                </tr>
                <tr>
                    <th className="px-4 py-2.5 text-left text-sm border-[2px] border-[rgba(26,26,18,0.28)]">
                        <span className="border-b-[2.5px] border-[#e8b13a] pb-0.5 font-bold">Name of restaurant</span>
                    </th>
                    <th className="px-4 py-2.5 text-left text-sm border-[2px] border-[rgba(26,26,18,0.28)]">
                        <span className="border-b-[2.5px] border-[#e8b13a] pb-0.5 font-bold">Location</span>
                    </th>
                    <th className="px-4 py-2.5 text-left text-sm border-[2px] border-[rgba(26,26,18,0.28)]">
                        <span className="border-b-[2.5px] border-[#e8b13a] pb-0.5 font-bold">Reason for recommendation</span>
                    </th>
                    <th className="px-4 py-2.5 text-left text-sm border-[2px] border-[rgba(26,26,18,0.28)]">
                        <span className="border-b-[2.5px] border-[#e8b13a] pb-0.5 font-bold">Other comments</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {/* Row 1 */}
                <tr>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div>The Junction</div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div>Greyson Street, near the station</div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div>
                            Good for people who are especially keen on{" "}
                            <GapInput qid={1} answers={answers} onChange={onChange} />
                        </div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div className="space-y-1">
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>Quite expensive</span>
                            </div>
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>
                    The <GapInput qid={2} answers={answers} onChange={onChange} /> is a good place for a drink
                  </span>
                            </div>
                        </div>
                    </td>
                </tr>

                {/* Row 2 */}
                <tr>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div>Paloma</div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div>In Bow Street next to the cinema</div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div>
                            <GapInput qid={3} answers={answers} onChange={onChange} /> food, good for sharing
                        </div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div className="space-y-1">
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>Staff are very friendly</span>
                            </div>
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>Need to pay £50 deposit</span>
                            </div>
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>
                    A limited section of <GapInput qid={4} answers={answers} onChange={onChange} /> food on the menu
                  </span>
                            </div>
                        </div>
                    </td>
                </tr>

                {/* Row 3 */}
                <tr>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div>
                            The <GapInput qid={5} answers={answers} onChange={onChange} />
                        </div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div>
                            At the top of a <GapInput qid={6} answers={answers} onChange={onChange} />
                        </div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div className="space-y-1">
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>A famous chef</span>
                            </div>
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>
                    All the <GapInput qid={7} answers={answers} onChange={onChange} /> are very good
                  </span>
                            </div>
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>
                    Only uses <GapInput qid={8} answers={answers} onChange={onChange} /> ingredients
                  </span>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-3 text-[15px] border-[2px] border-[rgba(26,26,18,0.28)] align-top">
                        <div className="space-y-1">
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>
                    Set lunch cost: £<GapInput qid={9} answers={answers} onChange={onChange} /> per person
                  </span>
                            </div>
                            <div className="flex gap-2 items-baseline">
                                <span className="shrink-0 text-[rgba(26,26,18,0.6)]">•</span>
                                <span>
                    Portions probably of <GapInput qid={10} answers={answers} onChange={onChange} /> size
                  </span>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default NoteCompletionTable;