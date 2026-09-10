/** A karakter aktuális állapota a gépelési tesztben. */
export type CharacterStatus = 'correct' | 'incorrect' | 'untouched';

/** Egyetlen megjelenített karakter szövegét és állapotát tartalmazza. */
export interface CharacterState {
    char: string;
    status: CharacterStatus;
}
/** A teszt közben megjelenített összesített statisztikák szerkezete. */
export interface TypingStats {
    wpm: number;
    accuracy: number;
    timeRemaining: number;
    correctChars: number;
    totalTyped: number;
}

/** Egy választható gyakorlószöveg metaadatait és tartalmát írja le. */
export interface TextOption {
    id: string;
    title: string;
    language: 'hu' | 'en';
    difficulty: 'easy' | 'medium' | 'hard';
    content: string;
}