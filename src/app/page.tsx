'use client';

import React, { useState, useEffect } from 'react';
import { Repository } from '@/shared/types';
import { repositoryService } from '@/services/repository.service';
import { RepositoryList } from '@/features/repositories/components/RepositoryList';
import { useSearchStore } from '@/store/search.store';
import { filterRepositories } from '@/features/repositories/utils/repository.utils';
import { Input } from '@/shared/components/Input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useSearchStore();
  const router = useRouter();

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        const data = await repositoryService.getAllRepositories();
        setRepositories(data);
      } catch (error) {
        console.error('Failed to load repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  const filteredRepositories = filterRepositories(repositories, searchQuery);

  const handleRepositoryClick = (id: string) => {
    router.push(`/repositories/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading repositories...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Repository Dashboard</h1>
        <p className="text-gray-600">Manage and monitor your code repositories</p>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <RepositoryList
        repositories={filteredRepositories}
        onRepositoryClick={handleRepositoryClick}
      />
    </div>
  );
}