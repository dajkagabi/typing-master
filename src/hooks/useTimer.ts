import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerProps {
    initialTime: number;
    onTimeUp?: () => void;
}

/**
 * A gépelési teszt visszaszámlálójának állapotát és vezérlését kezeli.
 *
 * Az időzítő az első billentyűleütés után indul el, másodpercenként csökkenti
 * a hátralévő időt, majd lejáratkor meghívja az opcionális callback függvényt.
 */
export const useTimer = ({ initialTime, onTimeUp }: UseTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onTimeUpRef = useRef(onTimeUp);

    /** Mindig a legfrissebb lejárati callbacket tartjuk elérhetően. */
    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    /** Elindítja a visszaszámlálót. */
    const startTimer = useCallback(() => {
        setIsRunning(true);
    }, []);

    /** Leállítja az aktuális időzítőt és törli a hozzá tartozó timeoutot. */
    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsRunning(false);
    }, []);

    /**
     * Alaphelyzetbe állítja az időzítőt.
    *  időtartam is megadható, például időbeállítás váltásakor.
     */
    const resetTimer = useCallback((newInitialTime = initialTime) => {
        stopTimer();
        setTimeLeft(newInitialTime);
    }, [initialTime, stopTimer]);

    /**
     * A useEffect hook kezeli a visszaszámlálást, másodpercenként csökkentve a hátralévő időt.
     */
    useEffect(() => {
        if (!isRunning) {
            return;
        }

        timerRef.current = setTimeout(() => {
            if (timeLeft <= 1) {
                setTimeLeft(0);
                setIsRunning(false);
                timerRef.current = null;
                onTimeUpRef.current?.();
                return;
            }

            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = null;
        };
    }, [isRunning, timeLeft]);

    return {
        timeLeft,
        timeElapsed: initialTime - timeLeft,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
    };
};