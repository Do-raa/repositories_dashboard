import { Repository, RepositorySummary } from '@/shared/types';
import { getRiskLevel, getUniqueLanguages } from '@/shared/utils';

export const getRepositorySummary = (repository: Repository): RepositorySummary => {
  return {
    totalFiles: repository.files.length,
    languages: getUniqueLanguages(repository.files),
    sensitiveFiles: repository.files.filter(f => f.isSensitive).length,
    riskLevel: getRiskLevel(repository.files),
  };
};

export const filterRepositories = (
  repositories: Repository[],
  searchTerm: string
): Repository[] => {
  if (!searchTerm.trim()) return repositories;
  
  const term = searchTerm.toLowerCase().trim();
  return repositories.filter(
    repo =>
      repo.name.toLowerCase().includes(term) ||
      repo.description.toLowerCase().includes(term) ||
      repo.owner.toLowerCase().includes(term)
  );
};