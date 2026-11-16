import { useCallback, useState } from "react";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { deleteAdminVocabularyWord, getAdminVocabularySet, getAdminVocabularyWords } from "../../../services/adminApi";
import { useAdminVocabularyData, useAdminVocabularyQuery, vocabularyReturnTo } from "./useAdminVocabulary";
import { VocabularyDeleteDialog, VocabularyEmpty, VocabularyLoadState, VocabularyNotice, VocabularyPageHeader, VocabularyPagination, VocabularySearch } from "./AdminVocabularyUi";

export default function AdminVocabularySetDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const listUrl = vocabularyReturnTo(location.state?.listUrl);
  const returnTo = location.pathname + location.search;
  const routeState = { listUrl, returnTo };
  const { page, pageSize, search, partOfSpeech, update } = useAdminVocabularyQuery();
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [deleting, setDeleting] = useState(null);
  const load = useCallback(async () => {
    const [set, result] = await Promise.all([getAdminVocabularySet(id), getAdminVocabularyWords(id, { page, pageSize, search, partOfSpeech })]);
    return { set, ...result };
  }, [id, page, pageSize, search, partOfSpeech]);
  const { data, loading, error, reload } = useAdminVocabularyData(load, `${id}:${page}:${pageSize}:${search}:${partOfSpeech}`);
  const remove = async () => {
    await deleteAdminVocabularyWord(id, deleting.id);
    setDeleting(null);
    setNotice("Đã xóa từ vựng.");
    reload();
  };
  return <section className="av-page">
    <VocabularyPageHeader title={data?.set.name || "Chi tiết bộ từ vựng"} links={[{ label: "Vocabulary", to: listUrl }, { label: data?.set.name || "Chi tiết bộ từ" }]}>
      <Link className="av-button" to={listUrl}><ArrowLeft size={16} />Danh sách</Link>
      {data && <Link className="av-button av-primary" to={`/admin/vocabulary/${id}/edit`} state={routeState}><Pencil size={16} />Chỉnh sửa bộ từ</Link>}
    </VocabularyPageHeader>
    <VocabularyNotice message={notice} onClose={() => setNotice("")} />
    {loading || error ? <div className="av-card"><VocabularyLoadState loading={loading} error={error} onRetry={reload} /></div> : data && <>
      <div className="av-card av-info-card">
        <h3>Thông tin bộ từ</h3>
        <dl className="av-info-grid"><div><dt>Mã bộ từ</dt><dd>#{data.set.id}</dd></div><div><dt>Số lượng từ</dt><dd><span className="av-tag">{data.set.wordCount} từ</span></dd></div><div><dt>Phạm vi</dt><dd>Bộ từ hệ thống</dd></div><div className="av-info-description"><dt>Mô tả</dt><dd>{data.set.description || <span className="av-muted">Chưa có mô tả</span>}</dd></div></dl>
      </div>
      <div className="av-card">
        <div className="av-card-heading"><h3>Danh sách từ vựng <span className="av-heading-count">({data.set.wordCount})</span></h3>
          <Link className="av-button av-primary" to={`/admin/vocabulary/${id}/words/create`} state={routeState}><Plus size={17} />Thêm từ vựng</Link></div>
        <div className="av-table-toolbar">
          <VocabularySearch key={search} value={search} placeholder="Tìm từ vựng, nghĩa hoặc ví dụ" onSearch={(value) => update({ search: value, page: 1 })} />
          <select className="av-filter" aria-label="Lọc từ loại" value={partOfSpeech} onChange={(event) => update({ partOfSpeech: event.target.value, page: 1 })}>
            <option value="">Tất cả từ loại</option>
            {partOfSpeech && !data.partOfSpeechOptions.includes(partOfSpeech) && <option value={partOfSpeech}>{partOfSpeech}</option>}
            {data.partOfSpeechOptions.map((part) => <option key={part} value={part}>{part}</option>)}
          </select>
          {(search || partOfSpeech) && <button type="button" className="av-reset" onClick={() => update({ search: "", partOfSpeech: "", page: 1 })}>Đặt lại bộ lọc</button>}
        </div>
        <div className="av-table-scroll"><table className="av-table av-words-table">
          <thead><tr><th scope="col">STT</th><th scope="col">Từ vựng</th><th scope="col">Phiên âm</th><th scope="col">Từ loại</th><th scope="col">Nghĩa</th><th scope="col">Ví dụ</th><th scope="col">Thao tác</th></tr></thead>
          <tbody>{data.words.items.map((word, index) => <tr key={word.id}>
            <td className="av-muted">{(data.words.page - 1) * data.words.pageSize + index + 1}</td><td><strong className="av-word">{word.word}</strong><small className="av-word-id">#{word.id}</small></td>
            <td><span className="av-phonetic">{word.phonetic || "—"}</span></td><td><span className="av-tag av-pos">{word.partOfSpeech}</span></td>
            <td className="av-meaning">{word.meaning}</td><td className="av-example">{word.example || <span className="av-muted">Chưa có ví dụ</span>}</td>
            <td><div className="av-row-actions"><Link className="av-icon-button" to={`/admin/vocabulary/${id}/words/${word.id}/edit`} state={routeState} title="Chỉnh sửa từ" aria-label={`Chỉnh sửa ${word.word}`}><Pencil size={15} /></Link>
              <button type="button" className="av-icon-button av-delete" title="Xóa từ" aria-label={`Xóa ${word.word}`} onClick={() => setDeleting(word)}><Trash2 size={15} /></button></div></td>
          </tr>)}</tbody>
        </table></div>
        {!data.words.items.length && <VocabularyEmpty filtered={!!(search || partOfSpeech)}>Bộ từ này chưa có từ vựng. Bấm “Thêm từ vựng” để thêm từ.</VocabularyEmpty>}
        <VocabularyPagination {...data.words} onChange={(nextPage, nextSize) => update({ page: nextPage, pageSize: nextSize })} />
      </div>
    </>}
    {deleting && <VocabularyDeleteDialog item={{ type: "từ vựng", name: deleting.word, description: "Từ đã có tiến độ học sẽ không thể xóa." }} onCancel={() => setDeleting(null)} onDelete={remove} />}
  </section>;
}
