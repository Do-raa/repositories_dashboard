import repositoriesData from '@/data/repositories.json';
import type { Repository } from '@/shared/types';

export class RepositoryService {
  private repositories: Repository[];

  constructor() {
    // Type assertion to ensure the JSON matches our Repository type
    this.repositories = repositoriesData.repositories as Repository[];
  }

  async getAllRepositories(): Promise<Repository[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.repositories;
  }

  async getRepositoryById(id: string): Promise<Repository | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.repositories.find(repo => repo.id === id);
  }

  async getFilesByRepositoryId(id: string) {
    const repo = await this.getRepositoryById(id);
    return repo?.files || [];
  }
}

export const repositoryService = new RepositoryService();