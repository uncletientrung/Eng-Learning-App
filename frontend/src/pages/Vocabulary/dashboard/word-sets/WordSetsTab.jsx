import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import DashboardTopicCards from "./DashboardTopicCards";
export default function WordSetsTab() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");

    const activeTab = searchParams.get("tab") || "botu";
    const activeCat = searchParams.get("cat");

    const handleSelectTopic = () => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("tab", "botu");
            next.delete("cat");
            return next;
        });
    };

    const handleSelectIdioms = () => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("tab", "botu");
            next.set("cat", "idioms");
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
                        Chủ đề <span>11 bộ</span>
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

            <DashboardTopicCards search={search} activeTab={activeTab} activeCat={activeCat} />
        </section>
    );
}