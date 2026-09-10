/**
 * Kiszámolja a WPM-et és a pontosságot a teszt aktuális állapota alapján.

 */
export const calculateMetrics = (
    correctChars: number,
    totalTyped: number,
    timeElapsedInSeconds: number
) => {
    /** Kezdőállapotban még nincs értelmes sebességmérés. */
    if (totalTyped === 0) {
        return { wpm: 0, accuracy: 100 };
    }

    /** Legalább egy másodperccel számolunk, hogy elkerüljük a nullával osztást. */
    const effectiveTime = Math.max(timeElapsedInSeconds, 1);
    const minutes = effectiveTime / 60;

    /** Egy szó átlagosan öt karakterből áll a WPM szabványos számításában. */
    const rawWpm = (correctChars / 5) / minutes;
    const wpm = Math.round(rawWpm);

    /** A pontosság a helyes és az összes begépelt karakter aránya. */
    const accuracy = Math.round((correctChars / totalTyped) * 100);

    return {
        wpm: Math.max(0, wpm),
        accuracy: Math.min(100, Math.max(0, accuracy)),
    };
};