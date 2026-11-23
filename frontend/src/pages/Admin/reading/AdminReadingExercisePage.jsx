import { useEffect, useState } from "react";
import { Eye, FilePlus2, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getTopicByModule } from "../../../services/topicAPI";

const dateFormat = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" });
const statusNames = { DRAFT: "Bản nháp", PUBLISHED: "Công khai", HIDDEN: "Đã ẩn" };

function StatusBadge({ status }) {
  const statusClass = status === "PUBLISHED"
      ? "bg-[#e7f7ee] text-[#188452]"
      : status === "DRAFT"
          ? "bg-[#fff3d8] text-[#a76a00]"
          : "bg-[#fce9eb] text-[#b63a48]";
  return <span className={`inline-flex min-h-[23px] items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[9px] font-black ${statusClass}`}>{statusNames[status] || status}</span>;
}

export default function AdminReadingExercisesPage() {
  const location = useLocation();
  const [pageData, setPageData] = useState(null);
  const [topics, setTopics] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [topicId, setTopicId] = useState("");
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
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
            "http://localhost:5167/api/reading-tests"
        );

        if (!response.ok) {
          throw new Error("Không thể tải danh sách Reading");
        }

        const data = await response.json();

        setPageData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);





  // async function removeExercise(exercise) {
  //   if (!window.confirm(`Xóa đề "${exercise.title}"? Đề đã có bài nộp sẽ không thể xóa.`)) return;
  //   setBusyId(exercise.id);
  //   setLoading(true);
  //   setError("");
  //   setNotice("");
  //   try {
  //     await deleteAdminWritingExercise(exercise.id);
  //     setNotice("Đã xóa đề Writing.");
  //     if (page > 1 && pageData?.items.length === 1) {
  //       setPage((current) => current - 1);
  //     } else {
  //       setRefreshVersion((version) => version + 1);
  //     }
  //   } catch (requestError) {
  //     setError(requestError.message);
  //   } finally {
  //     setBusyId(null);
  //   }
  // }

  const pageCount = Math.max(1, Math.ceil((pageData?.totalCount || 0) / (pageData?.pageSize || 10)));
  const changeFilter = (setter, value) => {
    setLoading(true);
    setError("");
    setter(value);
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
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-[22px] flex items-start justify-between gap-4 [&_h2]:m-0 [&_h2]:text-[clamp(20px,2vw,25px)] [&_h2]:font-black [&_h2]:tracking-[-.025em] [&_p]:mt-[5px] [&_p]:mb-0 [&_p]:text-[13px] [&_p]:text-[#6b7080] max-[760px]:mb-4 max-[760px]:items-stretch max-[760px]:flex-col">
          <div><h2>Quản lý đề Reading</h2><p>Tìm kiếm, phân loại và cập nhật đề bài.</p></div>
          <Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 !border-[#4f7cf7] !bg-[#4f7cf7] !text-white hover:!border-[#3d68d8] hover:!bg-[#3d68d8]" to="/admin/reading/create"><Plus size={16} /> Thêm đề Reading</Link>
        </div>
        {notice && <div className="mb-[13px] rounded-xl border border-[#b9e8cc] bg-[#effaf3] px-[15px] py-[13px] text-xs text-[#187347]" role="status">{notice}</div>}
        {error && (
            <div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert">
              <p>{error}</p>
              <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={refresh}><RefreshCw size={14} /> Thử lại</button>
            </div>
        )}
        <div className="mb-[14px] flex flex-wrap items-center gap-[9px] [&>select]:max-[760px]:min-w-[calc(50%-5px)] [&>select]:max-[760px]:flex-[1_1_130px]">
          <label className="relative min-w-[min(100%,250px)] flex-[1_1_245px] [&_svg]:absolute [&_svg]:left-3 [&_svg]:top-1/2 [&_svg]:-translate-y-1/2 [&_svg]:text-[#6b7080] [&_input]:pl-[37px]">
            <Search size={16} />
            <input className="min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" value={search} onChange={(event) => { changeFilter(setSearch, event.target.value); changePage(1); }} placeholder="Tìm tên đề hoặc chủ đề..." aria-label="Tìm kiếm đề Writing" />
          </label>
          <select className="min-h-10 w-auto min-w-[125px] rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" value={topicId} onChange={(event) => { changeFilter(setTopicId, event.target.value); changePage(1); }} aria-label="Lọc theo chủ đề">
            <option value="">Tất cả chủ đề</option>
            {topics.map((topic) => <option value={topic.id} key={topic.id}>{topic.name}</option>)}
          </select>
          <select className="min-h-10 w-auto min-w-[125px] rounded-[10px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-xs text-[#1b1d22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]" value={status} onChange={(event) => { changeFilter(setStatus, event.target.value); changePage(1); }} aria-label="Lọc theo trạng thái">
            <option value="">Tất cả trạng thái</option>
            <option value="PUBLISHED">Công khai</option><option value="DRAFT">Bản nháp</option><option value="HIDDEN">Đã ẩn</option>
          </select>
          <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={refresh} aria-label="Làm mới danh sách"><RefreshCw size={15} /> Làm mới</button>
        </div>

        <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308]">
          {loading ? (
              <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]" role="status">Đang tải đề Reading...</div>
          ) : pageData ? (
              <>

                <div className="w-full overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-[#e4e7ed] [&_th]:bg-[#f1f3f7] [&_th]:px-[14px] [&_th]:py-[11px] [&_th]:text-[10px] [&_th]:font-black [&_th]:tracking-[.04em] [&_th]:text-[#6b7080] [&_td]:border-b [&_td]:border-[#e4e7ed] [&_td]:px-[14px] [&_td]:py-3 [&_td]:align-middle [&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr:hover]:bg-[#f7f8fb]">
                    <thead>
                    <tr>
                      <th>STT</th>
                      <th>ID</th>
                      <th>Tên đề</th>
                      <th>Số Passage</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                      <th>Thao tác</th>
                    </tr>
                    </thead>

                    <tbody>
                    {pageData.map((test, index) => (
                        <tr key={test.id}>
                          <td>{(page - 1) * 10 + index + 1}</td>

                          <td>#{test.id}</td>

                          <td>
                            <Link
                                to={`/admin/reading/${test.id}`}
                                className="block max-w-[320px] truncate text-[11px] font-extrabold text-[#355fc8] no-underline hover:underline"
                            >
                              {test.title}
                            </Link>
                          </td>

                          <td>
                            {test.readingExercises?.length ?? 0} Passage
                          </td>

                          <td>
                            <StatusBadge status={test.status} />
                          </td>

                          <td>
                            {test.createdAt
                                ? dateFormat.format(new Date(test.createdAt))
                                : "—"}
                          </td>

                          <td>
                            <div className="flex items-center gap-1">
                              <Link
                                  to={`/admin/reading/${test.id}`}
                                  className="inline-flex min-h-[30px] items-center gap-1 rounded-lg bg-[#4f7cf7] px-2 text-[10px] font-extrabold text-white hover:bg-[#3d68d8]"
                              >
                                <Eye size={13} /> Xem
                              </Link>

                              <Link
                                  to={`/admin/reading/edit/${test.id}`}
                                  className="inline-flex min-h-[30px] items-center gap-1 rounded-lg border border-[#d8e2ff] bg-[#f3f6ff] px-2 text-[10px] font-extrabold text-[#315fc5] hover:bg-[#e8eeff]"
                              >
                                <Pencil size={13} /> Sửa
                              </Link>


                              <button
                                  type="button"
                                  disabled={busyId === test.id}
                                  onClick={() => removeExercise(test)}
                                  className="inline-flex min-h-[30px] items-center gap-1 rounded-lg border border-[#f1c1c5] bg-white px-2 text-[10px] font-extrabold text-[#a63240] hover:bg-[#fff4f5] disabled:opacity-55"
                              >
                                <Trash2 size={13} /> Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                <div className="admin-table-pagination flex items-center justify-between gap-3 rounded-b-2xl px-4 py-3 text-xs text-[#6b7080] max-[500px]:items-start max-[500px]:flex-col">
                  <span>{pageData.totalCount} đề</span>
                  <div className="flex items-center gap-[6px]">
                    <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 min-h-[30px] px-2 py-[5px] text-[10px]" disabled={page <= 1 || loading} onClick={() => changePage(page - 1)}>Trước</button>
                    <span>Trang {page} / {pageCount}</span>
                    <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 min-h-[30px] px-2 py-[5px] text-[10px]" disabled={page >= pageCount || loading} onClick={() => changePage(page + 1)}>Sau</button>
                  </div>
                </div>
              </>
          ) : (
              <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]"><strong>Không tìm thấy đề Reading</strong>Thử đổi bộ lọc hoặc tạo đề mới.</div>
          )}
        </section>
      </div>
  );
}
