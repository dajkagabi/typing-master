import React from 'react';
import { CharacterState } from '@/types';

interface TypingDisplayProps {
    charStates: CharacterState[];
    currentIndex: number;
}

/** A gyakorlószöveget karakterenkénti gépelési állapottal jeleníti meg. */
export const TypingDisplay: React.FC<TypingDisplayProps> = ({ charStates, currentIndex }) => {
    return (
        <div className="text-2xl font-mono leading-relaxed tracking-wide select-none p-6 rounded-xl bg-app-bg border border-slate-200">
            {charStates.map((item, index) => {
                /** A szín jelzi, hogy a karakter helyes, hibás vagy még érintetlen. */
                let statusStyle = 'text-status-untouched';

                if (item.status === 'correct') {
                    statusStyle = 'text-status-correct font-semibold';
                } else if (item.status === 'incorrect') {
                    statusStyle = 'text-status-incorrect bg-rose-100/80 rounded px-0.5 font-semibold';
                }

                /** Az aktuális karaktert külön kiemeljük, hogy látható legyen a következő lépés. */
                const isCurrent = index === currentIndex;

                return (
                    <span
                        key={index}
                        className={`${statusStyle} ${isCurrent ? 'border-b-2 border-primary animate-pulse font-bold bg-emerald-100/50 rounded-sm' : ''
                            }`}
                    >
                        {item.char}
                    </span>
                );
            })}
        </div>
    );
};