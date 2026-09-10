import { TextOption } from '@/types';

/** A felületen választható, különböző nyelvű és nehézségű gyakorlószövegek. */
export const SAMPLE_TEXTS: TextOption[] = [
    {
        id: 'hu-easy',
        title: 'Könnyű (HU)',
        language: 'hu',
        difficulty: 'easy',
        content: 'A gyors barna róka átugorja a lusta kutyát. A gépírás gyorsítása sok gyakorlást igényel.',
    },
    {
        id: 'hu-medium',
        title: 'Közepes (HU)',
        language: 'hu',
        difficulty: 'medium',
        content: 'A modern webfejlesztés során a komponens alapú építkezés segítségével tiszta és újrahasznosítható kódot írhatunk.',
    },
    {
        id: 'hu-hard',
        title: 'Nehéz (HU)',
        language: 'hu',
        difficulty: 'hard',
        content: 'A fejlett gépírás során a pontosság megőrzése mellett összetett, hosszú mondatokat és különleges karaktereket is következetesen kell begépelnünk.',
    },
    {
        id: 'en-easy',
        title: 'Easy (EN)',
        language: 'en',
        difficulty: 'easy',
        content: 'React components let you split the UI into independent reusable pieces.',
    },
    {
        id: 'en-medium',
        title: 'Medium (EN)',
        language: 'en',
        difficulty: 'medium',
        content: 'TypeScript adds type safety to JavaScript, helping developers catch errors early in the development process.',
    },
    {
        id: 'en-hard',
        title: 'Hard (EN)',
        language: 'en',
        difficulty: 'hard',
        content: 'Advanced typing practice requires consistent accuracy while entering complex sentences, punctuation, and frequently changing technical terminology.',
    },
];