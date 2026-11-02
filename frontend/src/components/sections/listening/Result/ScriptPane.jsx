import  { useState } from 'react';
import { SCRIPTS } from '../../../../data/ListeningResultData.js';

const ScriptPane = () => {
    // State quản lý tab đang active: 'sentence' (từng câu) hoặc 'full' (toàn bộ)
    const [activeTab, setActiveTab] = useState('sentence');

    // Gộp toàn bộ text của các câu lại thành 1 đoạn văn cho tab Toàn bộ script
    const fullTextHtml = SCRIPTS.map(item => item.text).join(' ');

    return (
        <div className="hidden md:flex w-full md:w-[46%] shrink-0 md:border-r-2 border-slate-200 flex-col bg-[#fdfcf8]">

            {/* Thanh Tabs */}
            <div className="flex border-b border-slate-200 bg-white shrink-0">
                {/* Tab Từng câu */}
                <button
                    onClick={() => setActiveTab('sentence')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-black uppercase tracking-widest transition-colors ${
                        activeTab === 'sentence'
                            ? 'bg-emerald-50 text-emerald-800 border-r border-slate-200'
                            : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
                        <path d="M16 9a5 5 0 0 1 0 6"></path>
                        <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
                    </svg>
                    Script từng câu
                </button>

                {/* Tab Toàn bộ */}
                <button
                    onClick={() => setActiveTab('full')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-black uppercase tracking-widest transition-colors ${
                        activeTab === 'full'
                            ? 'bg-emerald-50 text-emerald-800 border-r border-slate-200'
                            : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                        <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                        <path d="M10 9H8"></path>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                    </svg>
                    Toàn bộ script
                </button>
            </div>

            {/* Nội dung hiển thị theo Tab */}
            <div className="flex-1 overflow-y-auto px-5 md:px-7 py-6">

                {activeTab === 'sentence' ? (
                    // GIAO DIỆN TỪNG CÂU
                    <div className="space-y-2">
                        <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-1">Part 1</div>
                        {SCRIPTS.map((item) => (
                            <div key={item.q} className="relative px-4 py-3 rounded-xl cursor-pointer transition-all border-2 border-transparent hover:border-slate-200 hover:bg-slate-50">
                                <span className="inline-block text-[11px] font-black rounded-full px-2 py-0.5 mb-1.5 bg-slate-200 text-slate-700">Q{item.q}</span>
                                <p
                                    className="text-[16px] leading-[1.75] text-slate-700 whitespace-pre-line"
                                    style={{ fontFamily: 'var(--font-inter), "Inter", system-ui, sans-serif' }}
                                    dangerouslySetInnerHTML={{ __html: item.text }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    // GIAO DIỆN TOÀN BỘ SCRIPT
                    <div className="space-y-4">
                        <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-1">Toàn bộ Part 1</div>
                        <div className="px-4 py-3 rounded-xl bg-white border border-slate-200">
                            <p
                                className="text-[16px] leading-[1.75] text-slate-700 whitespace-pre-line"
                                style={{ fontFamily: 'var(--font-inter), "Inter", system-ui, sans-serif' }}
                                dangerouslySetInnerHTML={{ __html: fullTextHtml }}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ScriptPane;