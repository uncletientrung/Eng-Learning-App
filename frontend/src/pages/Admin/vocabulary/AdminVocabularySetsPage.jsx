import { useCallback, useState } from "react";
import { ArrowUpRight, Pencil, Plus, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { deleteAdminVocabularySet, getAdminVocabularySets } from "../../../services/adminApi";
import { useAdminVocabularyData, useAdminVocabularyQuery } from "./useAdminVocabulary";
import { VocabularyDeleteDialog, VocabularyEmpty, VocabularyLoadState, VocabularyNotice, VocabularyPageHeader, VocabularyPagination, VocabularySearch } from "./AdminVocabularyUi";

export default function AdminVocabularySetsPage() {
  const { page, pageSize, search, update } = useAdminVocabularyQuery();
  const location = useLocation();
  const listUrl = location.pathname + location.search;
  const [deleting, setDeleting] = useState(null);
  const [notice, setNotice] = useState(location.state?.notice || "");
  const load = useCallback(() => getAdminVocabularySets({ page, pageSize, search }), [page, pageSize, search]);
  const { data, loading, error, reload } = useAdminVocabularyData(load, `${page}:${pageSize}:${search}`);
  const remove = async () => {
    await deleteAdminVocabularySet(deleting.id);
    setDeleting(null);
    setNotice("Đã xóa bộ từ vựng.");
    reload();
  };
  return <section className="av-page">
    <VocabularyPageHeader title="Quản lý Vocabulary" links={[{ label: "Vocabulary" }]}>
      <Link className="av-button av-primary" to="/admin/vocabulary/create" state={{ listUrl }}><Plus size={17} />Thêm bộ từ</Link>
    </VocabularyPageHeader>
    <VocabularyNotice message={notice} onClose={() => setNotice("")} />
    <div className="av-card">
      <div className="av-table-toolbar">
        <VocabularySearch key={search} value={search} placeholder="Tìm tên hoặc mô tả bộ từ" onSearch={(value) => update({ search: value, page: 1 })} />
      </div>
      <VocabularyLoadState loading={loading} error={error} onRetry={reload} />
      {data && <>
        <div className="av-table-scroll"><table className="av-table av-sets-table">
          <thead><tr><th scope="col">STT</th><th scope="col">ID</th><th scope="col">Tên bộ từ</th><th scope="col">Mô tả</th><th scope="col">Số từ</th><th scope="col">Thao tác</th></tr></thead>
          <tbody>{data.items.map((set, index) => <tr key={set.id}>
            <td className="av-muted">{(data.page - 1) * data.pageSize + index + 1}</td><td>#{set.id}</td>
            <td><Link className="av-text-link av-name" to={`/admin/vocabulary/${set.id}`} state={{ listUrl }}>{set.name}</Link></td>
            <td><span className="av-description">{set.description || <span className="av-muted">Chưa có mô tả</span>}</span></td>
            <td><span className="av-tag">{set.wordCount} từ</span></td>
            <td><div className="av-row-actions">
              <Link
                className="
                  inline-flex min-h-[39px] shrink-0 cursor-pointer items-center justify-center
                  gap-[7px] rounded-[10px] border border-[#4f7cf7] bg-[#4f7cf7]
                  px-2 py-[5px] text-[10px] font-extrabold text-white no-underline
                  whitespace-nowrap shadow-[0_3px_8px_#315fc52e]
                  hover:translate-y-[-1px] hover:border-[#3d68d8]
                  hover:bg-[#3d68d8] hover:shadow-[0_5px_12px_#315fc545]
                  focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-[#4f7cf7]
                "
                to={`/admin/vocabulary/${set.id}`}
                state={{ listUrl }}
              >
                Xem chi tiết
                <ArrowUpRight size={14} />
              </Link>
              <Link className="av-icon-button" to={`/admin/vocabulary/${set.id}/edit`} state={{ listUrl }} title="Chỉnh sửa" aria-label={`Chỉnh sửa ${set.name}`}><Pencil size={15} /></Link>
              <button type="button" className="av-icon-button av-delete" title="Xóa bộ từ" aria-label={`Xóa ${set.name}`} onClick={() => setDeleting(set)}><Trash2 size={15} /></button>
            </div></td>
          </tr>)}</tbody>
        </table></div>
        {!data.items.length && <VocabularyEmpty filtered={!!search}>Thêm bộ từ đầu tiên để bắt đầu quản lý Vocabulary.</VocabularyEmpty>}
        <VocabularyPagination {...data} onChange={(nextPage, nextSize) => update({ page: nextPage, pageSize: nextSize })} />
      </>}
    </div>
    {deleting && <VocabularyDeleteDialog item={{ type: "bộ từ", name: deleting.name, description: `Toàn bộ ${deleting.wordCount} từ trong bộ cũng sẽ bị xóa. Bộ từ đã có tiến độ học sẽ không thể xóa.` }} onCancel={() => setDeleting(null)} onDelete={remove} />}
  </section>;
}
