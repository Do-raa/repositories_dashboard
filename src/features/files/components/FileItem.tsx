import React from 'react';
import { File } from '@/shared/types';
import { Badge } from '@/shared/components/Badge';
import { formatFileSize } from '@/shared/utils';
import { CRITICALITY_COLORS, CRITICALITY_LABELS } from '@/shared/constants';
import { FileCode, AlertCircle, Shield } from 'lucide-react';

interface Props {
    file: File;
    onFileClick?: () => void;
}

export const FileItem: React.FC<Props> = ({ file, onFileClick }) => {
    const criticalityColor = CRITICALITY_COLORS[file.criticality];
    const criticalityLabel = CRITICALITY_LABELS[file.criticality];

    return (
        <div
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={onFileClick}
        >
            <div className="flex items-start gap-3 flex-1">
                <FileCode size={20} className="text-gray-400 mt-1" />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900">{file.name}</span>
                        {file.isSensitive && (
                            <Shield size={16} className="text-red-500" />
                        )}
                    </div>
                    <div className="text-sm text-gray-500 truncate">{file.path}</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="info">{file.language}</Badge>
                        <Badge>{file.type}</Badge>
                        <Badge>{formatFileSize(file.size)}</Badge>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${criticalityColor}`}>
                    {criticalityLabel}
                </div>
                {file.isSensitive && (
                    <AlertCircle size={18} className="text-red-500" />
                )}
            </div>
        </div>
    );
};