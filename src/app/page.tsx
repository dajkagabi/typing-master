'use client';

import React, { useState } from 'react';
import { SAMPLE_TEXTS } from '@/data/texts';
import { useTypingTest } from '@/hooks/useTypingTest';
import { TypingDisplay } from '@/components/ui/typing/TypingDisplay';
import { StatsBoard } from '@/components/ui/typing/StatsBoard';
import { ResultModal } from '@/components/ui/typing/ResultModal';
import { VirtualKeyboard } from '@/components/ui/typing/VirtualKeyboard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

/** A felhasználó által választható tesztidőtartamok másodpercben. */
const DURATION_OPTIONS = [15, 30, 60, 120];

/** A gépelési teszt teljes felületét összeállító főoldal. */
export default function Home() {
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(0);
  /** A kiválasztott tesztidőtartam, alapértelmezés szerint 60 másodperc. */
  const [selectedDuration, setSelectedDuration] = useState<number>(60);

  const currentTextOption = SAMPLE_TEXTS[selectedTextIndex];

  const {
    charStates,
    currentIndex,
    timeLeft,
    wpm,
    accuracy,
    isFinished,
    resetTest,
  } = useTypingTest({
    targetText: currentTextOption.content,
    /** A kiválasztott időtartam alapján indul a timer. */
    duration: selectedDuration,
  });

  /** Szövegváltáskor frissíti a kiválasztást és alaphelyzetbe állítja a tesztet. */
  const handleSelectText = (index: number) => {
    const nextTextOption = SAMPLE_TEXTS[index];
    setSelectedTextIndex(index);
    resetTest(nextTextOption.content);
  };

  /** Időtartam-váltáskor az aktuális szöveggel indít új tesztet. */
  const handleSelectDuration = (duration: number) => {
    setSelectedDuration(duration);
    resetTest(currentTextOption.content, duration);
  };

  const activeChar = currentTextOption.content[currentIndex] || '';

  return (
    <main className="min-h-screen bg-app-bg text-text-main flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">
            Typing Master
          </h1>
          <p className="text-text-muted">
            Válassz időtartamot és szöveget, majd kezdj el gépelni!
          </p>
        </div>

        {/* Az időtartam- és szövegválasztó vezérlői egy közös sávban vannak. */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-app-card p-4 rounded-xl border border-slate-200 shadow-sm">

          {/* Elérhető időtartamok. */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-muted mr-1">Idő (mp):</span>
            {DURATION_OPTIONS.map((time) => (
              <Button
                key={time}
                variant={selectedDuration === time ? 'primary' : 'secondary'}
                onClick={() => handleSelectDuration(time)}
                className="text-sm py-1 px-3"
              >
                {time}s
              </Button>
            ))}
          </div>

          {/* Elérhető gyakorlószövegek. */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-text-muted mr-1">Szöveg:</span>
            {SAMPLE_TEXTS.map((text, index) => (
              <Button
                key={text.id}
                variant={selectedTextIndex === index ? 'primary' : 'secondary'}
                onClick={() => handleSelectText(index)}
                className="text-sm py-1 px-3"
              >
                {text.title}
              </Button>
            ))}
          </div>

        </div>

        {/* A teszt közben frissülő teljesítménymutatók. */}
        <StatsBoard wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} />

        {/* A szöveg megjelenítése és a teszt újraindítása. */}
        <Card className="flex flex-col gap-4">
          <TypingDisplay charStates={charStates} currentIndex={currentIndex} />

          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => resetTest()}>
              Újraindítás
            </Button>
          </div>
        </Card>

        {/* A következő karaktert jelző virtuális billentyűzet. */}
        <VirtualKeyboard activeChar={activeChar} />

        {/* A teszt lezárásakor megjelenő eredményablak. */}
        <ResultModal
          isOpen={isFinished}
          wpm={wpm}
          accuracy={accuracy}
          onRestart={() => resetTest()}
        />

      </div>
    </main>
  );
}