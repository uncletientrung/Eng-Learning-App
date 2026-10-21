import { useEffect, useState } from 'react';
import { getTopicByModule } from '../../../services/topicAPI';

const chartFilters = [
  {
    id: 'ALL',
    label: 'Tất cả',
    icon: '◈',
  },
  {
    id: 'BAR_CHART',
    label: 'Bar Chart',
    icon: '▦',
  },
  {
    id: 'LINE_GRAPH',
    label: 'Line Graph',
    icon: '〜',
  },
  {
    id: 'MAP',
    label: 'Map',
    icon: '⊞',
  },
  {
    id: 'MIXED_GRAPH',
    label: 'Mixed Graph',
    icon: '⋈',
  },
  {
    id: 'PIE_CHART',
    label: 'Pie Chart',
    icon: '◕',
  },
  {
    id: 'PROCESS',
    label: 'Process',
    icon: '→',
  },
  {
    id: 'TABLE',
    label: 'Table',
    icon: '⊟',
  },
  {
    id: 'DISCUSS_BOTH_VIEWS',
    label: 'Discuss Both Views',
    icon: '⇆',
  },
  {
    id: 'OPINION_ESSAY',
    label: 'Opinion Essay',
    icon: '✎',
  },
  {
    id: 'ADVANTAGES_AND_DISADVANTAGES',
    label: 'Advantages & Disadvantages',
    icon: '⇅',  
  },
  {
    id: 'PROBLEM_AND_SOLUTION',
    label: 'Problem & Solution',
    icon: '⚙',
  },
  {
    id: 'TWO_PART_QUESTION',
    label: 'Two-part Question',
    icon: '?',
  },
]

const chartColors = {
  ALL: {
    border: 'border-slate-800',
    text: 'text-slate-800',
    active: 'bg-slate-800 text-white',
    hover: 'hover:bg-slate-100',
  },

  BAR_CHART: {
    border: 'border-amber-300',
    text: 'text-amber-700',
    active: 'bg-amber-50 text-amber-700',
    hover: 'hover:bg-amber-50',
  },

  LINE_GRAPH: {
    border: 'border-blue-300',
    text: 'text-blue-700',
    active: 'bg-blue-50 text-blue-700',
    hover: 'hover:bg-blue-50',
  },

  MAP: {
    border: 'border-teal-300',
    text: 'text-teal-700',
    active: 'bg-teal-50 text-teal-700',
    hover: 'hover:bg-teal-50',
  },

  MIXED_GRAPH: {
    border: 'border-purple-300',
    text: 'text-purple-700',
    active: 'bg-purple-50 text-purple-700',
    hover: 'hover:bg-purple-50',
  },

  PIE_CHART: {
    border: 'border-rose-300',
    text: 'text-rose-700',
    active: 'bg-rose-50 text-rose-700',
    hover: 'hover:bg-rose-50',
  },

  PROCESS: {
    border: 'border-emerald-300',
    text: 'text-emerald-700',
    active: 'bg-emerald-50 text-emerald-700',
    hover: 'hover:bg-emerald-50',
  },

  TABLE: {
    border: 'border-slate-300',
    text: 'text-slate-600',
    active: 'bg-slate-100 text-slate-700',
    hover: 'hover:bg-slate-100',
  },
  DISCUSS_BOTH_VIEWS: {
    border: 'border-indigo-300',
    text: 'text-indigo-700',
    active: 'bg-indigo-50 text-indigo-700',
    hover: 'hover:bg-indigo-50',
  },
  OPINION_ESSAY: {
    border: 'border-fuchsia-300',
    text: 'text-fuchsia-700',
    active: 'bg-fuchsia-50 text-fuchsia-700',
    hover: 'hover:bg-fuchsia-50',
  },
  ADVANTAGES_AND_DISADVANTAGES: {
    border: 'border-cyan-300',
    text: 'text-cyan-700',
    active: 'bg-cyan-50 text-cyan-700',
    hover: 'hover:bg-cyan-50',
  },
  PROBLEM_AND_SOLUTION: {
    border: 'border-rose-300',
    text: 'text-rose-700',
    active: 'bg-rose-50 text-rose-700',
    hover: 'hover:bg-rose-50',
  },
  TWO_PART_QUESTION: {
    border: 'border-amber-300',
    text: 'text-amber-700', 
    active: 'bg-amber-50 text-amber-700',
    hover: 'hover:bg-amber-50',
  },
}
const defaultColors = {
  border: 'border-slate-300',
  text: 'text-slate-700',
  active: 'bg-slate-100 text-slate-800',
  hover: 'hover:bg-slate-50',
};

// Chuyển tên API thành key dùng để tra màu.
const normalizeTopic = (name) =>
  name
    .trim()
    .toUpperCase()
    .replace(/&/g, 'AND')
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .replace(/^BAR_CHART$/, 'BAR_CHART');

const getTopicConfig = (topicName) => {
  const topicKey = normalizeTopic(topicName);

  return chartFilters.find(
    (filter) => filter.id === topicKey
  );
};

function WritingChartFilters({activeChartFilter, onChartFilterChange,}) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function fetchTopics() {
      try {
        setLoading(true);
        setError('');
        const data = await getTopicByModule('WRITING');
        if (!cancelled) {
          setTopics(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Không thể tải danh sách thể loại.');
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    fetchTopics();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayFilters = [
    {
      id: 'ALL',
      label: 'Tất cả',
      icon: '◈',
    },
    ...topics.map((topic) => {
      const config = getTopicConfig(topic.name);

      return {
        id: topic.id,
        label: topic.name,
        icon: config?.icon ?? '◈',
        colorKey: config?.id,
      };
    }),
  ];

  if (loading) {
    return (
      <div className="mb-6 text-sm text-slate-500">
        Đang tải danh sách thể loại...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 text-sm text-red-600">
        {error}
        <button
          type="button"
          className="ml-2 underline"
          onClick={() => {
            // Tải lại component bằng cách xử lý retry
            setLoading(true);
            setError('');
            getTopicByModule('WRITING')
              .then((data) => {
                setTopics(Array.isArray(data) ? data : []);
              })
              .catch(() => {
                setError('Không thể tải danh sách thể loại.');
              })
              .finally(() => setLoading(false));
          }}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-bold text-slate-500">
        Thể loại:
      </span>

      {displayFilters.map((filter) => {
        const isActive = activeChartFilter === filter.id;
        const colors =
          chartColors[filter.colorKey || filter.id] ||
          defaultColors;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChartFilterChange(filter.id)}
            className={`
              inline-flex items-center gap-1.5
              rounded-full border px-4 py-1.5
              text-sm font-bold transition-all
              ${colors.border}
              ${colors.text}
              ${isActive ? colors.active : colors.hover}
            `}
          >
            <span className="text-xs">{filter.icon}</span>
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default WritingChartFilters;