'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Repository } from '@/shared/types';
import { repositoryService } from '@/services/repository.service';
import { RepositoryStats } from '@/features/files/components/RepositoryStats';
import { FileList } from '@/features/files/components/FileList';
import { FileFilters } from '@/features/files/components/FileFilters';
import { filterFiles, FileFilters as FileFiltersType } from '@/features/files/utils/files.utils';
import { ArrowLeft } from 'lucide-react';

export default function RepositoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FileFiltersType>({
        search: '',
        language: undefined,
        criticality: undefined,
    });

    useEffect(() => {
        const loadRepository = async () => {
            try {
                const id = Array.isArray(params.id) ? params.id[0] : params.id;
                if (typeof id === 'string') {
                    const data = await repositoryService.getRepositoryById(id);
                    setRepository(data || null);
                }
            } catch (error) {
                console.error('Failed to load repository:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            loadRepository();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading repository details...</p>
                </div>
            </div>
        );
    }

    if (!repository) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Repository not found</h2>
                <p className="text-gray-600">The repository you&apos;re looking for doesn&apos;t exist.</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 text-blue-500 hover:text-blue-700 font-medium"
                >
                    Go back to dashboard
                </button>
            </div>
        );
    }

    const filteredFiles = filterFiles(repository.files, filters);

    return (
        <div>
            <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{repository.name}</h1>
                <p className="text-gray-600">{repository.description}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                    <span>Owner: {repository.owner}</span>
                    <span>Language: {repository.language}</span>
                    <span>Created: {new Date(repository.createdAt).toLocaleDateString()}</span>
                    <span>Updated: {new Date(repository.updatedAt).toLocaleDateString()}</span>
                </div>
            </div>

            <RepositoryStats repository={repository} />

            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Files</h2>
                <FileFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    files={repository.files}
                />
                <FileList files={filteredFiles} />
            </div>
        </div>
    );
}