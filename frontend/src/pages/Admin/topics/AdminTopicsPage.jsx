import { useEffect, useState } from "react";
import { Eye, EyeOff, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { deleteAdminTopic, getAdminTopics, updateAdminTopicStatus } from "../../../services/adminApi";
import { getAdminImageSrc } from "../../../components/admin/adminUtils";
import AdminPageTitle from "../../../components/admin/AdminPageTitle";
import TopicStatusBadge from "./TopicStatusBadge";
import { TOPIC_MODULES, getUsageTotal, moduleLabel, topicButtonClass } from "./adminTopicUtils";

const PAGE_SIZE = 10;

const selectClass = `
  min-h-10 w-auto min-w-31.25 rounded-[10px]
  border border-[#e4e7ed] bg-white px-2.75 py-2.25
  text-xs text-[#1b1d22] focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]
`;

const rowButtonBase = `
  inline-flex min-h-7.5 shrink-0 cursor-pointer
  items-center justify-center gap-1 rounded-lg border
  px-2 py-1.25 text-[10px] font-extrabold no-underline
  focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-[#4f7cf7]
  disabled:cursor-not-allowed disabled:opacity-55
`;

export default function AdminTopicsPage() {
  const location = useLocation();
  const [pageData, setPageData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [busyId, setBusyId] = useState(null);
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearchTerm(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let active = true;
    getAdminTopics({
      page,
      pageSize: PAGE_SIZE,
      search: searchTerm,
      moduleType,
      isActive: status === "" ? "" : status === "ACTIVE",
    })
      .then((data) => { if (active) setPageData(data); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, searchTerm, moduleType, status, refreshVersion]);

  async function changeStatus(topic) {
    const nextActive = !topic.isActive;
    setBusyId(topic.id);
    setLoading(true);
    setError("");
    setNotice("");
    try {
      await updateAdminTopicStatus(topic.id, nextActive);
      setNotice(nextActive ? `Đã hiển thị lại topic "${topic.name}".` : `Đã ẩn topic "${topic.name}".`);
      setRefreshVersion((version) => version + 1);
    } catch (requestError) {
      setError(requestError.message);
      setLoading(false);
    } finally {
      setBusyId(null);
    }
  }

  async function removeTopic(topic) {
    if (!window.confirm(`Xóa topic "${topic.name}"? Thao tác này không thể hoàn tác.`)) return;
    setBusyId(topic.id);
    setLoading(true);
    setError("");
    setNotice("");
    try {
      await deleteAdminTopic(topic.id);
      setNotice("Đã xóa topic.");
      if (page > 1 && pageData?.items.length === 1) {
        setPage((current) => current - 1);
      } else {
        setRefreshVersion((version) => version + 1);
      }
    } catch (requestError) {
      setError(requestError.message);
      setLoading(false);
    } finally {
      setBusyId(null);
    }
  }

  const pageCount = Math.max(1, Math.ceil((pageData?.totalCount || 0) / (pageData?.pageSize || PAGE_SIZE)));
  const moduleOptions = pageData?.moduleTypes?.length
    ? pageData.moduleTypes.map((value) => ({ value, label: moduleLabel(value) }))
    : TOPIC_MODULES;
  const changeFilter = (setter, value) => {
    setLoading(true);
    setError("");
    setter(value);
    setPage(1);
  };
  const changePage = (value) => {
    setLoading(true);
    setError("");
    setPage(value);
  };
  const refresh = () => {
    setLoading(true);
    setError("");
    setRefreshVersion((version) => version + 1);
  };

  return (
    <div className="mx-auto w-full max-w-360">
      <div
        className="
          mb-5.5 flex items-start justify-between gap-4
          max-[760px]:mb-4 max-[760px]:items-stretch
          max-[760px]:flex-col
        "
      >
        <AdminPageTitle title="Quản lý Topics" />
        <Link className={topicButtonClass.primary} to="/admin/topics/create">
          <Plus size={16} />
          Thêm topic
        </Link>
      </div>

      {notice && (
        <div
          className="
            mb-3.25 rounded-xl border border-[#b9e8cc]
            bg-[#effaf3] px-3.75 py-3.25 text-xs text-[#187347]
          "
          role="status"
        >
          {notice}
        </div>
      )}

      {error && (
        <div
          className="
            mb-3.25 rounded-xl border border-[#f1c1c5]
            bg-[#fff4f5] px-3.75 py-3.25 text-xs text-[#a63240]
            [&_p]:mb-2 [&_p]:mt-0
          "
          role="alert"
        >
          <p>{error}</p>
          <button type="button" className={topicButtonClass.outline} onClick={refresh}>
            <RefreshCw size={14} />
            Thử lại
          </button>
        </div>
      )}

      <div
        className="
          mb-3.5 flex flex-wrap items-center gap-2.25
          [&>select]:max-[760px]:min-w-[calc(50%-5px)]
          [&>select]:max-[760px]:flex-[1_1_130px]
        "
      >
        <label
          className="
            relative min-w-[min(100%,250px)] flex-[1_1_245px]
            [&_svg]:absolute [&_svg]:left-3 [&_svg]:top-1/2
            [&_svg]:-translate-y-1/2 [&_svg]:text-[#6b7080]
            [&_input]:pl-9.25
          "
        >
          <Search size={16} />
          <input
            className="
              min-h-10 w-full rounded-[10px] border border-[#e4e7ed]
              bg-white px-2.75 py-2.25 text-xs text-[#1b1d22]
              placeholder:text-[#9aa0ad] focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]
            "
            value={search}
            maxLength={255}
            onChange={(event) => changeFilter(setSearch, event.target.value)}
            placeholder="Tìm tên hoặc mô tả topic..."
            aria-label="Tìm kiếm topic"
          />
        </label>

        <select
          className={selectClass}
          value={moduleType}
          onChange={(event) => changeFilter(setModuleType, event.target.value)}
          aria-label="Lọc theo module"
        >
          <option value="">Tất cả module</option>
          {moduleOptions.map((module) => (
            <option value={module.value} key={module.value}>{module.label}</option>
          ))}
        </select>

        <select
          className={selectClass}
          value={status}
          onChange={(event) => changeFilter(setStatus, event.target.value)}
          aria-label="Lọc theo trạng thái"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="ACTIVE">Đang dùng</option>
          <option value="INACTIVE">Đã ẩn</option>
        </select>
      </div>

      <section
        className="
          min-w-0 rounded-2xl border border-[#e4e7ed]
          bg-white shadow-[0_7px_22px_#17203308]
        "
      >
        {loading ? (
          <div
            className="
              rounded-xl border border-[#e4e7ed] bg-white
              px-3.75 py-8.75 text-center text-xs text-[#6b7080]
            "
            role="status"
          >
            Đang tải topic...
          </div>
        ) : pageData?.items?.length ? (
          <>
            <div className="w-full overflow-x-auto">
              <table
                className="
                  w-full border-collapse text-left text-xs
                  [&_th]:whitespace-nowrap [&_th]:border-b
                  [&_th]:border-[#e4e7ed] [&_th]:bg-[#f1f3f7]
                  [&_th]:px-3.5 [&_th]:py-2.75 [&_th]:text-xs!
                  [&_th]:font-black [&_th]:tracking-[.04em]
                  [&_th]:text-[#6b7080]
                  [&_th:first-child]:rounded-tl-[10px]
                  [&_th:last-child]:rounded-tr-[10px]
                  [&_td]:border-b [&_td]:border-[#e4e7ed]
                  [&_td]:px-3.5 [&_td]:py-3 [&_td]:align-middle
                  [&_tbody_tr:last-child_td]:border-b-0
                  [&_tbody_tr:hover]:bg-[#f7f8fb]
                "
              >
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Topic</th>
                    <th>Module</th>
                    <th>Nội dung</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.items.map((topic, index) => {
                    const usageTotal = getUsageTotal(topic.usage);
                    const imageSrc = getAdminImageSrc(topic.imageURL);
                    return (
                      <tr key={topic.id}>
                        <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                        <td>#{topic.id}</td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            {imageSrc ? (
                              <img
                                className="size-9 shrink-0 rounded-lg border border-[#e4e7ed] object-cover"
                                src={imageSrc}
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <span
                                className="
                                  inline-flex size-9 shrink-0 items-center justify-center
                                  rounded-lg bg-[#e7edff] text-xs font-black text-[#355fc8]
                                "
                                aria-hidden="true"
                              >
                                {topic.name.trim().charAt(0).toUpperCase() || "T"}
                              </span>
                            )}
                            <Link
                              className="
                                block max-w-[280px] truncate
                                text-[11px] font-extrabold text-[#355fc8]
                                no-underline hover:underline
                              "
                              to={`/admin/topics/${topic.id}`}
                            >
                              {topic.name}
                            </Link>
                          </div>
                        </td>
                        <td>{moduleLabel(topic.moduleType)}</td>
                        <td>{usageTotal} mục</td>
                        <td><TopicStatusBadge isActive={topic.isActive} /></td>
                        <td>
                          <div className="flex items-center gap-1">
                            <Link
                              className={`
                                ${rowButtonBase} border-[#4f7cf7] bg-[#4f7cf7]
                                text-white hover:border-[#3d68d8] hover:bg-[#3d68d8]
                              `}
                              to={`/admin/topics/${topic.id}`}
                            >
                              <Eye size={13} />
                              Xem
                            </Link>
                            <Link
                              className={`
                                ${rowButtonBase} border-[#d8e2ff] bg-[#f3f6ff]
                                text-[#315fc5] hover:bg-[#e8eeff]
                              `}
                              to={`/admin/topics/${topic.id}/edit`}
                            >
                              <Pencil size={13} />
                              Sửa
                            </Link>
                            <button
                              type="button"
                              className={`
                                ${rowButtonBase} border-[#e4e7ed] bg-white
                                text-[#1b1d22] hover:bg-[#f1f3f7]
                              `}
                              disabled={busyId === topic.id}
                              onClick={() => changeStatus(topic)}
                            >
                              {topic.isActive ? <EyeOff size={13} /> : <Eye size={13} />}
                              {topic.isActive ? "Ẩn" : "Hiện"}
                            </button>
                            <button
                              type="button"
                              className={`
                                ${rowButtonBase} border-[#f1c1c5] bg-white
                                text-[#a63240] hover:bg-[#fff4f5]
                              `}
                              disabled={busyId === topic.id || usageTotal > 0}
                              title={usageTotal > 0
                                ? "Topic đang có nội dung, hãy ẩn thay vì xóa"
                                : undefined}
                              onClick={() => removeTopic(topic)}
                            >
                              <Trash2 size={13} />
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              className="
                admin-table-pagination flex items-center justify-between
                gap-3 rounded-b-2xl px-4 py-3 text-xs text-[#6b7080]
                max-[500px]:items-start max-[500px]:flex-col
              "
            >
              <span>{pageData.totalCount} topic</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className={`${rowButtonBase} rounded-[10px] border-[#e4e7ed] bg-white text-[#1b1d22] hover:bg-[#f1f3f7]`}
                  disabled={page <= 1 || loading}
                  onClick={() => changePage(page - 1)}
                >
                  Trước
                </button>
                <span>Trang {page} / {pageCount}</span>
                <button
                  type="button"
                  className={`${rowButtonBase} rounded-[10px] border-[#e4e7ed] bg-white text-[#1b1d22] hover:bg-[#f1f3f7]`}
                  disabled={page >= pageCount || loading}
                  onClick={() => changePage(page + 1)}
                >
                  Sau
                </button>
              </div>
            </div>
          </>
        ) : (
          <div
            className="
              rounded-xl border border-[#e4e7ed] bg-white
              px-3.75 py-8.75 text-center text-xs text-[#6b7080]
              [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]
            "
          >
            <strong>Không tìm thấy topic</strong>
            Thử đổi bộ lọc hoặc tạo topic mới.
          </div>
        )}
      </section>
    </div>
  );
}
