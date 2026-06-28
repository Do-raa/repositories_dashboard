import React from 'react';
import { Repository } from '@/shared/types';
import { Card } from '@/shared/components/Card';
import { Badge } from '@/shared/components/Badge';
import { Calendar, Star, GitFork, User } from 'lucide-react';
import { getRepositorySummary } from '../utils/repository.utils';

interface Props {
    repository: Repository;
    onClick: () => void;
}

export const RepositoryCard: React.FC<Props> = ({
    repository,
    onClick,
}) => {
    const summary = getRepositorySummary(repository);

    const riskColor = {
        low: 'success',
        medium: 'warning',
        high: 'danger',
    } as const;

    return (
        <Card className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300" onClick={onClick}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{repository.name}</h3>
                <Badge variant={riskColor[summary.riskLevel]}>
                    {summary.riskLevel.toUpperCase()} Risk
                </Badge>
            </div>

            <p className="text-gray-600 text-sm mb-4">{repository.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{repository.owner}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>{repository.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                    <GitFork size={16} />
                    <span>{repository.forks}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(repository.updatedAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="info">{repository.language}</Badge>
                <Badge>{summary.totalFiles} files</Badge>
                {summary.sensitiveFiles > 0 && (
                    <Badge variant="danger">{summary.sensitiveFiles} sensitive</Badge>
                )}
            </div>
        </Card>
    );
};