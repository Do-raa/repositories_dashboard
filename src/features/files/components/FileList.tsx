import React from 'react';
import { File } from '@/shared/types';
import { FileItem } from './FileItem';

interface FileListProps {
    files: File[];
    onFileClick?: (fileId: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
    if (files.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No files found matching your filters</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {files.map((file) => (
                <FileItem
                    key={file.id}
                    file={file}
                    onFileClick={() => onFileClick?.(file.id)}
                />
            ))}
        </div>
    );
};