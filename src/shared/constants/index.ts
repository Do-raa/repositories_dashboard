export const CRITICALITY_COLORS = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
} as const;

export const CRITICALITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const;

export const FILE_TYPES = [
  'service',
  'connector',
  'component',
  'documentation',
  'middleware',
  'processor',
  'controller',
  'pipeline',
  'model',
  'utility',
  'configuration',
] as const;