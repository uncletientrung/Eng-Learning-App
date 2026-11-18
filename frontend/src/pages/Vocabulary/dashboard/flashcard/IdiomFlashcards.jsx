import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getIdiomTopics, getIdiomsByTopic } from "../../../../services/vocabularyApi";
import { IdiomFlashcardSession } from "./NotebookFlashcards";

export default function IdiomFlashcards({ topicId }) {
  const location = useLocation();
  const hasMatchingState = location.state?.idiomTopicId === topicId;
  const initialIdioms = hasMatchingState ? location.state.idioms : null;
  const [topicName, setTopicName] = useState(hasMatchingState ? location.state.topicName || "" : "");
  const [idioms, setIdioms] = useState(initialIdioms);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialIdioms) {
      setIdioms(initialIdioms);
      return;
    }
    const controller = new AbortController();
    getIdiomsByTopic(topicId, controller.signal).then(setIdioms).catch((err) => {
      if (!controller.signal.aborted) setError(err.message);
    });
    return () => controller.abort();
  }, [topicId, initialIdioms]);

  useEffect(() => {
    if (topicName) return;
    const controller = new AbortController();
    getIdiomTopics(controller.signal).then((topics) => {
      if (!controller.signal.aborted) {
        setTopicName(topics.find((topic) => String(topic.id) === String(topicId))?.title || "Thành ngữ");
      }
    }).catch(() => {
      if (!controller.signal.aborted) setTopicName("Thành ngữ");
    });
    return () => controller.abort();
  }, [topicId, topicName]);

  if (error) return <section role="alert"><p>{error}</p><Link to="/vocabulary/dashboard?tab=botu&cat=idioms">Quay lại thành ngữ</Link></section>;
  if (!idioms) return <p role="status">Đang tải flashcard...</p>;
  if (!idioms.length) return <section className="vf-unavailable"><h1>Chủ đề chưa có thành ngữ</h1><Link to="/vocabulary/dashboard?tab=botu&cat=idioms"><ArrowLeft size={18} /> Quay lại</Link></section>;
  return <IdiomFlashcardSession topicId={topicId} topicName={topicName || "Thành ngữ"} idioms={idioms} />;
}
