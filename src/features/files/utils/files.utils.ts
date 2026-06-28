import { File } from '@/shared/types';

export interface FileFilters {
  search: string;
  language?: string;
  criticality?: 'low' | 'medium' | 'high';
}

export const filterFiles = (files: File[], filters: FileFilters): File[] => {
  let filtered = [...files];

  if (filters.search.trim()) {
    const search = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      file =>
        file.name.toLowerCase().includes(search) ||
        file.path.toLowerCase().includes(search)
    );
  }

  if (filters.language) {
    filtered = filtered.filter(file => file.language === filters.language);
  }

  if (filters.criticality) {
    filtered = filtered.filter(file => file.criticality === filters.criticality);
  }

  return filtered;
};

export const getUniqueLanguagesFromFiles = (files: File[]): string[] => {
  const languages = new Set(files.map(f => f.language));
  return Array.from(languages).sort();
};