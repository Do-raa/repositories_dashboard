export type CriticalityLevel = 'low' | 'medium' | 'high';

export interface File {
  id: string;
  name: string;
  path: string;
  language: string;
  type: string;
  size: number;
  criticality: CriticalityLevel;
  isSensitive: boolean;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  language: string;
  stars: number;
  forks: number;
  files: File[];
}

export interface RepositorySummary {
  totalFiles: number;
  languages: string[];
  sensitiveFiles: number;
  riskLevel: CriticalityLevel;
}