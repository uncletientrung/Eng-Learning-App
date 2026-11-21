import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Pencil, RefreshCw, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteAdminTopic, getAdminTopic, updateAdminTopicStatus } from "../../../services/adminApi";
import { getAdminImageSrc } from "../../../components/admin/adminUtils";
import TopicStatusBadge from "./TopicStatusBadge";
import { getUsageParts, getUsageTotal, moduleLabel, topicButtonClass } from "./adminTopicUtils";

const cardClass = "rounded-2xl border border-[#e4e7ed] bg-white p-5 shadow-[0_7px_22px_#17203308]";

export default function AdminTopicDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [busy, setBusy] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let active = true;
    getAdminTopic(id)
      .then((data) => {
        if (active) {
          setTopic(data);
          setError("");
        }
      })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, refreshVersion]);

  function reload() {
    setError("");
    setLoading(true);
    setRefreshVersion((version) => version + 1);
  }

  async function changeStatus() {
    const nextActive = !topic.isActive;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await updateAdminTopicStatus(topic.id, nextActive);
      setNotice(nextActive ? "Đã hiển thị lại topic." : "Đã ẩn topic.");
      setLoading(true);
      setRefreshVersion((version) => version + 1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  async function removeTopic() {
    if (!window.confirm(`Xóa topic "${topic.name}"? Thao tác này không thể hoàn tác.`)) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await deleteAdminTopic(topic.id);
      navigate("/admin/topics", { replace: true, state: { notice: "Đã xóa topic." } });
    } catch (requestError) {
      setError(requestError.message);
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div
        className="
          mx-auto max-w-275 rounded-2xl border border-[#e4e7ed] bg-white
          px-4 py-10 text-center text-xs text-[#6b7080]
        "
        role="status"
      >
        Đang tải topic...
      </div>
    );
  }

  const usageParts = getUsageParts(topic?.usage);
  const usageTotal = getUsageTotal(topic?.usage);
  const imageSrc = getAdminImageSrc(topic?.imageURL);

  return (
    <div className="mx-auto w-full max-w-275">
      {error && (
        <div
          className="
            mb-3.25 rounded-xl border border-[#f1c1c5] bg-[#fff4f5]
            px-3.75 py-3.25 text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0
          "
          role="alert"
        >
          <p>{error}</p>
          <button type="button" className={topicButtonClass.outline} onClick={reload}>
            <RefreshCw size={14} />
            Thử lại
          </button>
        </div>
      )}
      {notice && (
        <div
          className="
            mb-3.25 rounded-xl border border-[#b9e8cc] bg-[#effaf3]
            px-3.75 py-3.25 text-xs text-[#187347]
          "
          role="status"
        >
          {notice}
        </div>
      )}

      {!topic ? (
        !error && (
          <div className="rounded-2xl border border-[#e4e7ed] bg-white px-4 py-10 text-center text-xs text-[#6b7080]">
            Không tìm thấy topic.
          </div>
        )
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3
                className="m-0 text-2xl leading-tight font-black tracking-tight text-[#1e3006] md:text-3xl"
                style={{ fontFamily: '"Segoe UI Black", "Segoe UI", sans-serif' }}
              >
                Topic Name: {' '}
                <span className="text-brand-dark">{topic.name}</span>
              </h3>
              <p className="mb-0 mt-1.25 text-[13px] text-[#6b7080]">
                Topic #{topic.id} 
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link className={topicButtonClass.outline} to="/admin/topics">
                <ArrowLeft size={15} />
                Danh sách
              </Link>
              <Link className={topicButtonClass.primary} to={`/admin/topics/${topic.id}/edit`}>
                <Pencil size={14} />
                Chỉnh sửa
              </Link>
              <button type="button" className={topicButtonClass.outline} disabled={busy} onClick={changeStatus}>
                {topic.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                {topic.isActive ? "Ẩn topic" : "Hiện topic"}
              </button>
              <button
                type="button"
                className={topicButtonClass.danger}
                disabled={busy || usageTotal > 0}
                title={usageTotal > 0 ? "Topic đang có nội dung, hãy ẩn thay vì xóa" : undefined}
                onClick={removeTopic}
              >
                <Trash2 size={14} />
                Xóa
              </button>
            </div>
          </div>

          <section className={cardClass}>
            <h3 className="mb-4 mt-0 text-sm font-black">Thông tin topic</h3>
            <div className="grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
              {imageSrc ? (
                <img
                  className="h-auto max-h-150 w-full rounded-xl border border-[#e4e7ed] bg-[#f7f8fb] object-contain"
                  src={imageSrc}
                  alt={topic.name}
                />
              ) : (
                <div
                  className="
                    flex aspect-4/3 w-full items-center justify-center rounded-xl
                    border border-[#e4e7ed] bg-[#f7f8fb] text-xs text-[#6b7080]
                  "
                >
                  Chưa có ảnh
                </div>
              )}
              <dl className="m-0 grid content-start gap-3 text-xs">
                <div>
                  <dt className="text-[12px] text-sm font-black">Module</dt>
                  <dd className="mt-0.5 font-semibold">{moduleLabel(topic.moduleType)}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-sm font-black">Trạng thái</dt>
                  <dd className="mt-1"><TopicStatusBadge isActive={topic.isActive} /></dd>
                </div>
                <div>
                  <dt className="text-[12px] text-sm font-black">Người tạo</dt>
                  <dd className="mt-0.5 font-semibold">{topic.createBy || "Hệ thống"}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-sm font-black">Đường dẫn ảnh</dt>
                  <dd className="mt-0.5 break-all font-semibold">{topic.imageURL || "—"}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-sm font-black">Mô tả</dt>
                  <dd className="mt-0.5 whitespace-pre-wrap break-words font-semibold">{topic.description || "—"}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-sm font-black">Nội dung đang dùng topic</dt>
                  <dd className="mt-0.5 font-semibold">
                    {usageParts.length > 0
                      ? usageParts.map((part) => `${part.label}: ${part.count}`).join(" · ")
                      : "Không có nội dung"}
                  </dd>
                  <dd className="mt-1 text-[#6b7080]">
                    {usageTotal > 0
                      ? "Topic có nội dung tham chiếu nên không thể xóa hoặc đổi module; hãy ẩn nếu không muốn hiển thị."
                      : "Chưa có nội dung nào tham chiếu, topic có thể xóa."}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
