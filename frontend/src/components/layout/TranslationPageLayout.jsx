import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

export function TranslationRequestState({ error, retry, label }) {
    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700" role="alert">
                <p>{error}</p>
                <button type="button" className="mt-3 rounded-full border-2 border-[#111] bg-white px-4 py-1.5 text-sm font-bold text-black shadow-[2px_2px_0_#1a1a1a] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc926] focus-visible:ring-offset-2" onClick={retry}>Thử tải lại</button>
            </div>
        );
    }
    return <p className="py-10 text-center font-semibold text-slate-500" role="status">{label}</p>;
}

export default function TranslationPageLayout() {
    return (
        <MainLayout>
            <section className="relative flex min-h-[101vh] w-full flex-col overflow-clip bg-brand">
                <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgb(255,255,255) 1px, transparent 1px),
                            linear-gradient(90deg, rgb(255,255,255) 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px",
                    }}
                />
                <main className="relative z-10 mx-auto mt-32 mb-10 w-[calc(100%-2rem)] max-w-[1400px] flex-grow rounded-[24px] border-4 border-[#111] bg-white px-6 pb-20 pt-8 shadow-[0_18px_50px_rgba(31,41,55,0.10)] md:w-[calc(100%-3rem)] md:px-10 lg:px-12">
                    <Outlet />
                </main>
            </section>
        </MainLayout>
    );
}
