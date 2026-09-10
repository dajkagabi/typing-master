import { useState, useEffect, useCallback } from 'react';
import { CharacterState, CharacterStatus } from '@/types';
import { useTimer } from './useTimer';
import { calculateMetrics } from '@/utils/calculateMetrics';

interface UseTypingTestProps {
    targetText: string;
    duration?: number;
}

/** A szöveg minden karakteréhez létrehozza a kezdő, még nem gépelt állapotot. */
const createInitialCharStates = (text: string): CharacterState[] => {
    return text.split('').map((char) => ({
        char,
        status: 'untouched',
    }));
};

/**
 * A gépelési teszt teljes állapotát kezeli: a karaktereket, a billentyűzetet,
 * az időzítőt és a valós időben számolt teljesítménymutatókat.
 */
export const useTypingTest = ({ targetText, duration = 60 }: UseTypingTestProps) => {
    const [charStates, setCharStates] = useState<CharacterState[]>(() =>
        createInitialCharStates(targetText)
    );
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [totalTyped, setTotalTyped] = useState<number>(0);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const { timeLeft, timeElapsed, isRunning, startTimer, stopTimer, resetTimer } = useTimer({
        initialTime: duration,
        onTimeUp: () => setIsFinished(true),
    });

    /** Alaphelyzetbe állítja a tesztet, szükség esetén új szöveggel és időtartammal. */
    const resetTest = useCallback((newTargetText?: string, newDuration?: number) => {
        const textToUse = newTargetText ?? targetText;
        setCharStates(createInitialCharStates(textToUse));
        setCurrentIndex(0);
        setTotalTyped(0);
        setIsFinished(false);
        resetTimer(newDuration);
    }, [targetText, resetTimer]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (isFinished) return;

            const { key } = event;

            /** A szóköz ne görgesse el az oldalt gépelés közben. */
            if (key === ' ' || key === 'Spacebar') {
                event.preventDefault();
            }

            /** A vezérlőbillentyűket figyelmen kívül hagyjuk, a Backspace külön ágban marad. */
            if (key.length > 1 && key !== 'Backspace') return;

            /** Az első valódi karakter indítja el a visszaszámlálót. */
            if (!isRunning && key !== 'Backspace') {
                startTimer();
            }

            /** A Backspace visszalép, és az előző karaktert újra gépelhetővé teszi. */
            if (key === 'Backspace') {
                event.preventDefault();
                if (currentIndex > 0) {
                    const newIndex = currentIndex - 1;
                    setCurrentIndex(newIndex);
                    setCharStates((prev) => {
                        const next = [...prev];
                        next[newIndex].status = 'untouched';
                        return next;
                    });
                }
            } else {
                /** A beírt karaktert helyes vagy hibás állapotként rögzítjük. */
                if (currentIndex < targetText.length) {
                    const isCorrect = key === targetText[currentIndex];
                    const newStatus: CharacterStatus = isCorrect ? 'correct' : 'incorrect';

                    setCharStates((prev) => {
                        const next = [...prev];
                        next[currentIndex].status = newStatus;
                        return next;
                    });

                    setCurrentIndex((prev) => prev + 1);
                    setTotalTyped((prev) => prev + 1);

                    if (currentIndex === targetText.length - 1) {
                        stopTimer();
                        setIsFinished(true);
                    }
                }
            }
        },
        [currentIndex, isFinished, isRunning, startTimer, stopTimer, targetText]
    );

    /** A globális billentyűzetfigyelőt a komponens életciklusához kötjük. */
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const correctChars = charStates.filter((c) => c.status === 'correct').length;
    const { wpm, accuracy } = calculateMetrics(correctChars, totalTyped, timeElapsed);

    return {
        charStates,
        currentIndex,
        timeLeft,
        wpm,
        accuracy,
        isFinished,
        resetTest,
    };
};