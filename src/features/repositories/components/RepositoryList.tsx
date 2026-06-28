import React from 'react';
import { Repository } from '@/shared/types';
import { RepositoryCard } from './RepositoryCard';

interface Props {
    repositories: Repository[];
    onRepositoryClick: (id: string) => void;
}

export const RepositoryList: React.FC<Props> = ({
    repositories,
    onRepositoryClick,
}) => {
    if (repositories.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No repositories found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repositories.map((repo) => (
                <RepositoryCard
                    key={repo.id}
                    repository={repo}
                    onClick={() => onRepositoryClick(repo.id)}
                />
            ))}
        </div>
    );
};