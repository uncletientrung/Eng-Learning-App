export const chartFilters = [
  { id: 'BAR_CHART', label: 'Bar Chart', icon: '▦' },
  { id: 'LINE_GRAPH', label: 'Line Graph', icon: '〜' },
  { id: 'MAP', label: 'Map', icon: '⊞' },
  { id: 'MIXED_GRAPH', label: 'Mixed Graph', icon: '⋈' },
  { id: 'PIE_CHART', label: 'Pie Chart', icon: '◕' },
  { id: 'PROCESS', label: 'Process', icon: '→' },
  { id: 'TABLE', label: 'Table', icon: '⊟' },
  { id: 'DISCUSS_BOTH_VIEWS', label: 'Discuss Both Views', icon: '⇆' },
  { id: 'OPINION_ESSAY', label: 'Opinion Essay', icon: '✎' },
  { id: 'ADVANTAGES_AND_DISADVANTAGES', label: 'Advantages & Disadvantages', icon: '⇅' },
  { id: 'PROBLEM_AND_SOLUTION', label: 'Problem & Solution', icon: '⚙' },
  { id: 'TWO_PART_QUESTION', label: 'Two-part Question', icon: '?' },
];

export const chartColors = {
  ALL: {
    border: 'border-slate-800',
    text: 'text-slate-800',
    active: 'bg-slate-800 text-white',
    hover: 'hover:bg-slate-100',
    badge: 'bg-slate-100 text-slate-800',
  },
  BAR_CHART: {
    border: 'border-amber-300',
    text: 'text-amber-700',
    active: 'bg-amber-50 text-amber-700',
    hover: 'hover:bg-amber-50',
    badge: 'bg-amber-50 text-amber-700',
  },
  LINE_GRAPH: {
    border: 'border-blue-300',
    text: 'text-blue-700',
    active: 'bg-blue-50 text-blue-700',
    hover: 'hover:bg-blue-50',
    badge: 'bg-blue-50 text-blue-700',
  },
  MAP: {
    border: 'border-teal-300',
    text: 'text-teal-700',
    active: 'bg-teal-50 text-teal-700',
    hover: 'hover:bg-teal-50',
    badge: 'bg-teal-50 text-teal-700',
  },
  MIXED_GRAPH: {
    border: 'border-purple-300',
    text: 'text-purple-700',
    active: 'bg-purple-50 text-purple-700',
    hover: 'hover:bg-purple-50',
    badge: 'bg-purple-50 text-purple-700',
  },
  PIE_CHART: {
    border: 'border-rose-300',
    text: 'text-rose-700',
    active: 'bg-rose-50 text-rose-700',
    hover: 'hover:bg-rose-50',
    badge: 'bg-rose-50 text-rose-700',
  },
  PROCESS: {
    border: 'border-emerald-300',
    text: 'text-emerald-700',
    active: 'bg-emerald-50 text-emerald-700',
    hover: 'hover:bg-emerald-50',
    badge: 'bg-emerald-50 text-emerald-700',
  },
  TABLE: {
    border: 'border-slate-300',
    text: 'text-slate-600',
    active: 'bg-slate-100 text-slate-700',
    hover: 'hover:bg-slate-100',
    badge: 'bg-slate-100 text-slate-700',
  },
  DISCUSS_BOTH_VIEWS: {
    border: 'border-indigo-300',
    text: 'text-indigo-700',
    active: 'bg-indigo-50 text-indigo-700',
    hover: 'hover:bg-indigo-50',
    badge: 'bg-indigo-50 text-indigo-700',
  },
  OPINION_ESSAY: {
    border: 'border-fuchsia-300',
    text: 'text-fuchsia-700',
    active: 'bg-fuchsia-50 text-fuchsia-700',
    hover: 'hover:bg-fuchsia-50',
    badge: 'bg-fuchsia-50 text-fuchsia-700',
  },
  ADVANTAGES_AND_DISADVANTAGES: {
    border: 'border-cyan-300',
    text: 'text-cyan-700',
    active: 'bg-cyan-50 text-cyan-700',
    hover: 'hover:bg-cyan-50',
    badge: 'bg-cyan-50 text-cyan-700',
  },
  PROBLEM_AND_SOLUTION: {
    border: 'border-rose-300',
    text: 'text-rose-700',
    active: 'bg-rose-50 text-rose-700',
    hover: 'hover:bg-rose-50',
    badge: 'bg-rose-50 text-rose-700',
  },
  TWO_PART_QUESTION: {
    border: 'border-amber-300',
    text: 'text-amber-700',
    active: 'bg-amber-50 text-amber-700',
    hover: 'hover:bg-amber-50',
    badge: 'bg-amber-50 text-amber-700',
  },
};

export const defaultColors = {
  border: 'border-slate-300',
  text: 'text-slate-700',
  active: 'bg-slate-100 text-slate-800',
  hover: 'hover:bg-slate-50',
  badge: 'bg-slate-100 text-slate-700',
};

export const normalizeTopic = (name = '') =>
  name
    .trim()
    .toUpperCase()
    .replace(/&/g, 'AND')
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

export const getTopicConfig = (topicName) => {
  const topicKey = normalizeTopic(topicName);
  return chartFilters.find((filter) => filter.id === topicKey);
};

export const getTopicColors = (topicName) => {
  const config = getTopicConfig(topicName);
  return chartColors[config?.id] || defaultColors;
};


export const WRITING_TYPE_CONFIG = {
  BAR_CHART: {
    minimumWords: 150,
    suggestedMinutes: 20,
  },
  LINE_GRAPH: {
    minimumWords: 150,
    suggestedMinutes: 20,
  },
  MAP: {
    minimumWords: 150,
    suggestedMinutes: 20,
  },
  MIXED_GRAPH: {
    minimumWords: 150,
    suggestedMinutes: 20,
  },
  PIE_CHART: {
    minimumWords: 150,
    suggestedMinutes: 20,
  },
  PROCESS: {
    minimumWords: 150,
    suggestedMinutes: 20,
  },
  TABLE: {
    minimumWords: 150,
    suggestedMinutes: 20,
  },

  DISCUSS_BOTH_VIEWS: {
    minimumWords: 250,
    suggestedMinutes: 40,
  },
  OPINION_ESSAY: {
    minimumWords: 250,
    suggestedMinutes: 40,
  },
  ADVANTAGES_AND_DISADVANTAGES: {
    minimumWords: 250,
    suggestedMinutes: 40,
  },
  PROBLEM_AND_SOLUTION: {
    minimumWords: 250,
    suggestedMinutes: 40,
  },
  TWO_PART_QUESTION: {
    minimumWords: 250,
    suggestedMinutes: 40,
  },
};