import React from 'react';

interface VirtualKeyboardProps {
    activeChar: string;
}

/**  Magyar kiosztás  */
const KEYBOARD_ROWS = [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ő', 'ú'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', 'á', 'ű'],
    ['í', 'y', 'x', 'c', 'v', 'b', 'n', 'm'],
    ['space']
];

/** A következő begépelendő karaktert vizuálisan kiemelő billentyűzet. */
export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ activeChar }) => {
    /** A kis- és nagybetűk összehasonlítása egységesített formában történik. */
    const normalizedActive = activeChar.toLowerCase();

    return (
        <div className="flex flex-col gap-2 p-4 bg-app-card rounded-xl border border-slate-200 items-center select-none shadow-sm">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1.5 justify-center w-full">
                    {row.map((key) => {
                        /** A szóköz eltérő szélességű, és külön összehasonlítást igényel. */
                        const isSpace = key === 'space';
                        const isActive = isSpace
                            ? normalizedActive === ' '
                            : normalizedActive === key;

                        return (
                            <div
                                key={key}
                                className={`flex items-center justify-center rounded-lg font-mono font-medium text-sm transition-all duration-150 ${isSpace ? 'w-64 h-10' : 'w-10 h-10'
                                    } ${isActive
                                        ? 'bg-primary text-white scale-105 shadow-md shadow-emerald-700/20'
                                        : 'bg-secondary text-text-muted border border-slate-200'
                                    }`}
                            >
                                {isSpace ? 'Space' : key.toUpperCase()}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};