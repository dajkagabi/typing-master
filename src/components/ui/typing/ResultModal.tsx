import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ResultModalProps {
    isOpen: boolean;
    wpm: number;
    accuracy: number;
    onRestart: () => void;
}

/** A teszt befejezése után megjelenő eredményablak. */
export const ResultModal: React.FC<ResultModalProps> = ({
    isOpen,
    wpm,
    accuracy,
    onRestart,
}) => {
    /** A modal csak lezárt tesztnél kerül a DOM-ba. */
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full text-center p-8 border border-slate-200 bg-app-card shadow-xl">
                <h2 className="text-3xl font-extrabold text-primary mb-2">Teszt Befejezve! 🎉</h2>
                <p className="text-text-muted mb-6">Nagyszerű munka! Íme az eredményeid:</p>

                {/* A két legfontosabb eredményt külön kiemelt blokkokban mutatjuk. */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-app-bg p-4 rounded-xl border border-slate-200">
                        <span className="block text-text-muted text-sm mb-1">Sebesség</span>
                        <span className="text-4xl font-extrabold text-primary">{wpm}</span>
                        <span className="block text-xs text-text-muted mt-1">WPM</span>
                    </div>
                    <div className="bg-app-bg p-4 rounded-xl border border-slate-200">
                        <span className="block text-text-muted text-sm mb-1">Pontosság</span>
                        <span className="text-4xl font-extrabold text-status-correct">{accuracy}%</span>
                    </div>
                </div>

                {/* A felhasználó innen indíthat új tesztet. */}
                <Button onClick={onRestart} className="w-full text-lg py-3">
                    Újrapróbálkozás
                </Button>
            </Card>
        </div>
    );
};