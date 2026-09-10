import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

/** Egységes háttérrel, kerettel és árnyékkal rendelkező tartalomkártya. */
export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        /* A className lehetővé teszi az alapstílusok helyi kiegészítését. */
        <div className={`bg-app-card p-6 rounded-xl border border-slate-200 shadow-sm ${className}`}>
            {children}
        </div>
    );
};