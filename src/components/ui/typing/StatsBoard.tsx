import React from 'react';
import { Card } from '@/components/ui/Card';

interface StatsBoardProps {
    wpm: number;
    accuracy: number;
    timeLeft: number;
}

/** A gépelési teszt legfontosabb élő statisztikáit rendezi egy táblába. */
export const StatsBoard: React.FC<StatsBoardProps> = ({ wpm, accuracy, timeLeft }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <Card className="text-center">
                <p className="text-sm text-text-muted mb-1">Sebesség</p>
                <p className="text-3xl font-bold text-primary">{wpm} <span className="text-sm font-normal text-text-muted">WPM</span></p>
            </Card>
            <Card className="text-center">
                <p className="text-sm text-text-muted mb-1">Pontosság</p>
                <p className="text-3xl font-bold text-status-correct">{accuracy}%</p>
            </Card>
            <Card className="text-center">
                <p className="text-sm text-text-muted mb-1">Hátralévő idő</p>
                <p className="text-3xl font-bold text-text-main">{timeLeft}s</p>
            </Card>
        </div>
    );
};