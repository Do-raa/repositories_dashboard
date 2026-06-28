import React from 'react';
import { Repository } from '@/shared/types';
import { getRepositorySummary } from '@/features/repositories/utils/repository.utils';
import { Card } from '@/shared/components/Card';
import { FileCode, GitBranch, Shield, AlertTriangle } from 'lucide-react';

interface Props {
    repository: Repository;
}

export const RepositoryStats: React.FC<Props> = ({ repository }) => {
    const summary = getRepositorySummary(repository);

    const stats = [
        {
            label: 'Total Files',
            value: summary.totalFiles,
            icon: FileCode,
            color: 'text-blue-500',
        },
        {
            label: 'Languages',
            value: summary.languages.length,
            icon: GitBranch,
            color: 'text-purple-500',
        },
        {
            label: 'Sensitive Files',
            value: summary.sensitiveFiles,
            icon: Shield,
            color: 'text-red-500',
        },
        {
            label: 'Risk Level',
            value: summary.riskLevel.toUpperCase(),
            icon: AlertTriangle,
            color: summary.riskLevel === 'high' ? 'text-red-500' :
                summary.riskLevel === 'medium' ? 'text-yellow-500' :
                    'text-green-500',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
                <Card key={stat.label} className="p-4 text-center">
                    <stat.icon className={`mx-auto ${stat.color} mb-2`} size={24} />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                </Card>
            ))}
        </div>
    );
};