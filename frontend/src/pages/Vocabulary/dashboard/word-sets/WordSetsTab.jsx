import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import DashboardTopicCards from "./DashboardTopicCards";
import { getVocabularySets } from "../../../../services/vocabularyApi";
export default function WordSetsTab() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");

    const activeTab = searchParams.get("tab") || "botu";
    const activeCat = searchParams.get("cat");
    const [topics, setTopics] = useState(null);
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        getVocabularySets(controller.signal).then((data) => {
            if (!controller.signal.aborted) { setTopics(data); setError(""); }
        }).catch((err) => {
            if (!controller.signal.aborted) setError(err.message);
        });
        return () => controller.abort();
    }, [attempt]);

    const handleSelectTopic = () => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("tab", "botu");
            next.delete("cat");
            next.delete("set");
            return next;
        });
    };

    const handleSelectIdioms = () => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("tab", "botu");
            next.set("cat", "idioms");
            next.delete("set");
            return next;
        });
    };

    return (
        <section className="vd-sets">
            <div className="vd-set-toolbar" role="tablist">
                <div style={{ display: "inline-flex", gap: "10px" }}>
                    <button
                        type="button"
                        className="vd-set-tab"
                        role="tab"
                        aria-selected={activeTab === "botu" && !activeCat}
                        onClick={handleSelectTopic}
                    >
                        Chủ đề {topics && <span>{topics.length} bộ</span>}
                    </button>

                    <button
                        type="button"
                        className="vd-set-tab"
                        role="tab"
                        aria-selected={activeTab === "botu" && activeCat === "idioms"}
                        onClick={handleSelectIdioms}
                    >
                        Thành ngữ <span>300</span>
                    </button>
                </div>

                <label className="vd-topic-search">
                    <Search size={18} />
                    <input
                        type="search"
                        aria-label="Tìm bộ từ"
                        placeholder="Tìm bộ từ..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </label>
            </div>

            {activeCat === "idioms" ? <DashboardTopicCards search={search} activeTab={activeTab} activeCat={activeCat} />
                : error ? <div role="alert" className="py-8 text-center"><p>{error}</p><button type="button" onClick={() => { setError(""); setAttempt((value) => value + 1); }}>Thử lại</button></div>
                    : topics === null ? <p role="status" className="py-8 text-center">Đang tải bộ từ...</p>
                        : <>{topics.length === 0 && <p className="py-4 text-center text-d-mute">Chưa có bộ từ hệ thống.</p>}<DashboardTopicCards search={search} topics={topics} /></>}
        </section>
    );
}
