import React from 'react';
import { Input } from '@/shared/components/Input';
import { FileFilters as FileFiltersType } from '../utils/files.utils';
import { getUniqueLanguagesFromFiles } from '../utils/files.utils';
import { File } from '@/shared/types';

interface Props {
    filters: FileFiltersType;
    onFiltersChange: (filters: FileFiltersType) => void;
    files: File[];
}

export const FileFilters: React.FC<Props> = ({
    filters,
    onFiltersChange,
    files,
}) => {
    const languages = getUniqueLanguagesFromFiles(files);

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
                <Input
                    placeholder="Search files by name or path..."
                    value={filters.search}
                    onChange={(e) =>
                        onFiltersChange({ ...filters, search: e.target.value })
                    }
                />
            </div>

            <select
                className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.language || ''}
                onChange={(e) =>
                    onFiltersChange({
                        ...filters,
                        language: e.target.value || undefined,
                    })
                }
            >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>

            <select
                className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.criticality || ''}
                onChange={(e) =>
                    onFiltersChange({
                        ...filters,
                        criticality: e.target.value as any || undefined,
                    })
                }
            >
                <option value="">All Criticality</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    );
};