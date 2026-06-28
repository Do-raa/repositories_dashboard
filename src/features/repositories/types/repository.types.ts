import { File } from '@/shared/types';

export interface RepositoryFilters {
  search: string;
  language?: string;
  criticality?: 'low' | 'medium' | 'high';
}

export type RepositoryFile = File;