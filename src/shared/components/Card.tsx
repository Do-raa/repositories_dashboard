import React from 'react';
import { cn } from '@/shared/lib';

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<Props> = ({ children, className, onClick }) => {
    return (
        <div
            className={cn(
                'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};