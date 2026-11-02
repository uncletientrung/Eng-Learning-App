import { useEffect, useState } from "react";
import {
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
  Plus,
  RefreshCw,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../../services/adminApi";
import HeroMascot from "../../components/sections/HeroMascot";
import { getCurrentUser } from "../../services/authApi";

const numberFormat = new Intl.NumberFormat("vi-VN");
const dateFormat = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "medium",
  timeStyle: "short",
});

function ActivityChart({ data }) {
  const width = 560;
  const height = 190;
  const left = 20;
  const right = 18;
  const top = 18;
  const bottom = 32;
  const max = Math.max(1, ...data.map((item) => item.count));
  const step = data.length > 1 ? (width - left - right) / (data.length - 1) : 0;
  const points = data.map((item, index) => ({
    x: left + step * index,
    y: height - bottom - (item.count / max) * (height - top - bottom),
  }));
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${left},${height - bottom} ${line} ${width - right},${height - bottom}`;

  return (
    <div className="px-4 pb-[14px] [&_svg]:block [&_svg]:h-[190px] [&_svg]:w-full [&_svg]:overflow-visible">
      {data.length === 0 ? (
        <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]">Chưa có dữ liệu hoạt động Writing.</div>
      ) : (
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Biểu đồ số bài Writing theo tháng">
          {[0, 1, 2, 3].map((lineIndex) => {
            const y = top + ((height - top - bottom) / 3) * lineIndex;
            return <line key={lineIndex} className="stroke-[#e4e7ed] [stroke-dasharray:4_5]" x1={left} x2={width - right} y1={y} y2={y} />;
          })}
          <polygon className="fill-[#4f7cf71a]" points={area} />
          <polyline className="fill-none stroke-[#4f7cf7] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:3]" points={line} />
          {points.map((point, index) => (
            <g key={data[index].month}>
              <circle className="fill-white stroke-[#4f7cf7] [stroke-width:3]" cx={point.x} cy={point.y} r="4" />
              <text className="fill-[#6b7080] [font-family:inherit] [font-size:10px] [text-anchor:middle]" x={point.x} y={height - 8}>{data[index].month}</text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const complete = status === "COMPLETED";
  return (
    <span className={`inline-flex min-h-[23px] items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[9px] font-black ${complete ? "bg-[#e7f7ee] text-[#188452]" : "bg-[#fff3d8] text-[#a76a00]"}`}>
      {complete ? "Đã hoàn thành" : "Đang xử lý"}
    </span>
  );
}

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let active = true;
    getAdminDashboard()
      .then((data) => { if (active) setDashboard(data); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [refreshVersion]);

  function retryDashboard() {
    setLoading(true);
    setError("");
    setRefreshVersion((version) => version + 1);
  }

  if (loading) {
    return <div className="mx-auto w-full max-w-[1440px]"><div className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]" role="status">Đang tải số liệu quản trị...</div></div>;
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-[13px] rounded-xl border border-[#f1c1c5] bg-[#fff4f5] px-[15px] py-[13px] text-xs text-[#a63240] [&_p]:mb-2 [&_p]:mt-0" role="alert">
          <p>{error}</p>
          <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={retryDashboard}><RefreshCw size={15} /> Thử lại</button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Tổng người dùng", value: dashboard.totalUsers, icon: Users },
    { label: "Đề Writing", value: dashboard.totalWritingExercises, icon: FileText },
    { label: "Lượt làm Writing", value: dashboard.totalWritingAttempts, icon: BookOpen },
    { label: "Bài đã hoàn thành", value: dashboard.completedSubmissions, icon: CheckCircle2 },
    { label: "Đang chờ xử lý", value: dashboard.pendingSubmissions, icon: Clock3 },
    {
      label: "Điểm Writing trung bình",
      value: dashboard.averageWritingScore == null ? "—" : Number(dashboard.averageWritingScore).toFixed(1),
      icon: CheckCircle2,
      note: "Thang điểm IELTS 0–9",
    },
  ];
  const adminName = getCurrentUser()?.name?.trim().split(/\s+/)[0] || "quản trị viên";

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <section className="relative mb-[22px] min-h-[220px] overflow-hidden rounded-[20px] border border-white/10 bg-[#6a8042] px-8 py-6 text-white [isolation:isolate] max-[760px]:mb-[18px] max-[760px]:min-h-[180px] max-[760px]:px-[18px] max-[760px]:py-[19px]">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(#ffffff26_1px,transparent_1px),linear-gradient(90deg,#ffffff26_1px,transparent_1px)] bg-[length:32px_32px]" aria-hidden="true" />
        <div className="relative z-[2] max-w-[min(62%,660px)] [&_h2]:m-0 [&_h2]:text-[clamp(24px,3vw,34px)] [&_h2]:font-black [&_h2]:tracking-[-.035em] [&_p]:mt-2 [&_p]:mb-0 [&_p]:max-w-[440px] [&_p]:text-[13px] [&_p]:leading-[1.6] [&_p]:text-[#e2eaff] max-[760px]:max-w-[70%] max-[760px]:[&_h2]:text-[clamp(22px,6vw,29px)] max-[760px]:[&_p]:max-w-[240px] max-[760px]:[&_p]:text-[11px]">
          <span className="mb-[7px] inline-block text-[10px] font-black tracking-[.14em] text-[#d7e5ff]">ADMIN WORKSPACE</span>
          <h2>Xin chào, {adminName}!</h2>
          <p>Cùng theo dõi và phát triển trải nghiệm học Writing hôm nay.</p>
        </div>
        <div className="absolute bottom-[-250px] right-[-72px] z-[1] size-[430px] drop-shadow-[0_13px_15px_#101b3b40] max-[760px]:bottom-[-160px] max-[760px]:right-[-60px] max-[760px]:size-[270px]" aria-hidden="true">
          <HeroMascot isMascotSmiling compact />
        </div>
      </section>
      <div className="mb-[22px] flex items-start justify-between gap-4 [&_h2]:m-0 [&_h2]:text-[clamp(20px,2vw,25px)] [&_h2]:font-black [&_h2]:tracking-[-.025em] [&_p]:mt-[5px] [&_p]:mb-0 [&_p]:text-[13px] [&_p]:text-[#6b7080] max-[760px]:mb-4 max-[760px]:items-stretch max-[760px]:flex-col">
        <div>
          <h2>Tổng quan hệ thống</h2>
          <p>Số liệu và hoạt động Writing được cập nhật từ dữ liệu thực tế.</p>
        </div>
        <button type="button" className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55" onClick={retryDashboard}><RefreshCw size={15} /> Làm mới</button>
      </div>
      <section className="mb-[18px] grid grid-cols-3 gap-[14px] max-[900px]:grid-cols-2 max-[760px]:gap-[9px]" aria-label="Thống kê tổng quan">
        {stats.map(({ label, value, icon: Icon, note }) => (
          <article className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308] relative min-h-[126px] p-[17px] max-[760px]:min-h-28 max-[760px]:p-[13px]" key={label}>
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#6b7080] max-[760px]:items-start max-[760px]:text-[10px]"><span className="inline-flex size-8 items-center justify-center rounded-[10px] bg-[#eaf0ff] text-[#4f7cf7] max-[760px]:size-7 max-[760px]:shrink-0"><Icon size={16} /></span>{label}</div>
            <strong className="mt-[11px] block text-[26px] font-black leading-none max-[760px]:text-[22px]">{typeof value === "number" ? numberFormat.format(value) : value}</strong>
            {note && <span className="mt-1.5 block text-[10px] text-[#6b7080]">{note}</span>}
          </article>
        ))}
      </section>

      <section className="mb-[18px] grid grid-cols-[minmax(0,1.5fr)_minmax(260px,.75fr)] gap-4 max-[1100px]:grid-cols-[minmax(0,1.2fr)_minmax(235px,.8fr)] max-[900px]:grid-cols-1">
        <article className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308]">
          <div className="flex items-start justify-between gap-3 p-[17px_18px] [&_h3]:m-0 [&_h3]:text-[15px] [&_h3]:font-black [&_p]:mt-[3px] [&_p]:mb-0 [&_p]:text-[11px] [&_p]:text-[#6b7080]">
            <div><h3>Hoạt động Writing</h3><p>Số lượt làm trong 6 tháng gần nhất</p></div>
          </div>
          <ActivityChart data={dashboard.monthlyActivity || []} />
        </article>
        <article className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308]">
          <div className="flex items-start justify-between gap-3 p-[17px_18px] [&_h3]:m-0 [&_h3]:text-[15px] [&_h3]:font-black [&_p]:mt-[3px] [&_p]:mb-0 [&_p]:text-[11px] [&_p]:text-[#6b7080]">
            <div><h3>Thao tác nhanh</h3><p>Đi đến các chức năng thường dùng</p></div>
          </div>
          <div className="grid gap-[9px] px-4 pb-[17px]">
            <Link className="flex min-h-[46px] items-center gap-2.5 rounded-[11px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-left text-xs font-extrabold text-[#1b1d22] no-underline hover:border-[#b6c8ff] hover:bg-[#f5f7ff] [&_svg]:text-[#4f7cf7]" to="/admin/writing/create"><Plus size={17} /> Thêm đề Writing mới</Link>
            <Link className="flex min-h-[46px] items-center gap-2.5 rounded-[11px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-left text-xs font-extrabold text-[#1b1d22] no-underline hover:border-[#b6c8ff] hover:bg-[#f5f7ff] [&_svg]:text-[#4f7cf7]" to="/admin/writing"><FileText size={17} /> Danh sách đề Writing</Link>
            <Link className="flex min-h-[46px] items-center gap-2.5 rounded-[11px] border border-[#e4e7ed] bg-white px-[11px] py-[9px] text-left text-xs font-extrabold text-[#1b1d22] no-underline hover:border-[#b6c8ff] hover:bg-[#f5f7ff] [&_svg]:text-[#4f7cf7]" to="/admin/writing/submissions"><BookOpen size={17} /> Bài nộp học viên</Link>
          </div>
        </article>
      </section>

      <section className="min-w-0 rounded-2xl border border-[#e4e7ed] bg-white shadow-[0_7px_22px_#17203308]">
        <div className="flex items-start justify-between gap-3 p-[17px_18px] [&_h3]:m-0 [&_h3]:text-[15px] [&_h3]:font-black [&_p]:mt-[3px] [&_p]:mb-0 [&_p]:text-[11px] [&_p]:text-[#6b7080]">
          <div><h3>Bài Writing gần đây</h3><p>Các lượt làm gần nhất của học viên</p></div>
          <Link className="text-[11px] font-extrabold text-[#355fc8] no-underline hover:underline" to="/admin/writing/submissions">Xem tất cả</Link>
        </div>
        {dashboard.recentSubmissions?.length ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-[#e4e7ed] [&_th]:bg-[#f1f3f7] [&_th]:px-[14px] [&_th]:py-[11px] [&_th]:text-[10px] [&_th]:font-black [&_th]:tracking-[.04em] [&_th]:text-[#6b7080] [&_th:first-child]:rounded-tl-[10px] [&_th:last-child]:rounded-tr-[10px] [&_td]:border-b [&_td]:border-[#e4e7ed] [&_td]:px-[14px] [&_td]:py-3 [&_td]:align-middle [&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr:hover]:bg-[#f7f8fb]">
              <thead><tr><th>STT</th><th>Học viên</th><th>Đề bài</th><th>Loại bài</th><th>Thời gian</th><th>Trạng thái</th><th></th></tr></thead>
              <tbody>
                {dashboard.recentSubmissions.map((item, index) => (
                  <tr key={item.attemptId}>
                    <td>{index + 1}</td>
                    <td>{item.userName}</td>
                    <td><span className="block max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap font-extrabold text-[#1b1d22]">{item.exerciseTitle}</span></td>
                    <td>{item.writingType || "—"}</td>
                    <td>{item.submittedAt ? dateFormat.format(new Date(item.submittedAt)) : "—"}</td>
                    <td><StatusBadge status={item.status} /></td>
                    <td><Link className="inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center gap-[7px] rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2 text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55 !border-[#4f7cf7] !bg-[#4f7cf7] !text-white hover:!border-[#3d68d8] hover:!bg-[#3d68d8] min-h-[30px] px-2 py-[5px] text-[10px] min-w-[104px] whitespace-nowrap shadow-[0_3px_8px_#315fc52e] hover:translate-y-[-1px] hover:shadow-[0_5px_12px_#315fc545]" to={`/admin/writing/submissions/${item.attemptId}`}>Chi tiết <ArrowUpRight size={14} /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-[#e4e7ed] bg-white px-[15px] py-[35px] text-center text-xs text-[#6b7080] [&_strong]:mb-1 [&_strong]:block [&_strong]:text-[#1b1d22]"><strong>Chưa có bài nộp</strong>Bài làm mới sẽ xuất hiện tại đây.</div>
        )}
      </section>
    </div>
  );
}
