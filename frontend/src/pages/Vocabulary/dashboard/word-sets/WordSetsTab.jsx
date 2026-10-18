import { useState } from "react";
import { Search } from "lucide-react";
import DashboardTopicCards from "./DashboardTopicCards";

export default function WordSetsTab() {
  const [search, setSearch] = useState("");
  return <section className="vd-sets">
    <div className="vd-set-toolbar">
      <div className="vd-set-tab" aria-current="page">Chủ đề <span>11 bộ</span></div>
      <label className="vd-topic-search"><Search size={18} /><input type="search" aria-label="Tìm bộ từ" placeholder="Tìm bộ từ..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
    </div>
    <DashboardTopicCards search={search} />
  </section>;
}
