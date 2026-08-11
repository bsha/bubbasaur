"use client";

import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { wordleWordService } from "@/lib/wordleWordService";
import { useWordleStore } from "@/stores/useWordleStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Mode = "letterCount" | "customAnswer";
type NumericInputValue = number | "";

export default function Page() {
  const router = useRouter();
  const { startGame, letterCount: savedLetterCount, guessCount: savedGuessCount } = useWordleStore();

  const [mode, setMode] = useState<Mode>("letterCount");
  const [guessCount, setGuessCount] = useState<NumericInputValue>(savedGuessCount);
  const [answer, setAnswer] = useState<string>("");
  const [letterCount, setLetterCount] = useState<NumericInputValue>(savedLetterCount);

  const handleNumberInput = (value: string, setter: (value: NumericInputValue) => void) => {
    if (value === "") {
      setter("");
      return;
    }

    const parsedValue = Number.parseInt(value, 10);
    if (Number.isNaN(parsedValue)) {
      return;
    }

    setter(parsedValue);
  };

  const validateNumberBounds = (value: NumericInputValue, min: number, max: number): boolean => {
    return typeof value === "number" && value >= min && value <= max;
  };

  const getSafeNumber = (value: NumericInputValue, fallback: number): number => {
    return typeof value === "number" ? value : fallback;
  };

  const onStartGame = async () => {
    let newAnswer = answer.trim().toUpperCase();

    if (mode === "letterCount") {
      newAnswer = await wordleWordService.getWordByLength(getSafeNumber(letterCount, 5));
    }

    startGame({ answer: newAnswer, guessCount: getSafeNumber(guessCount, 6) });
    router.push("/games/wordle");
  };

  return (
    <main className="flex-1 bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Wordle setup</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Customize your next game</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Choose a word length, enter a custom answer, and select how many guesses you want to use.
          </p>
        </header>

        <section
          aria-labelledby="game-settings-heading"
          className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
        >
          <FieldSet className="gap-5">
            <FieldLegend id="game-settings-heading" className="text-base font-semibold">
              Game settings
            </FieldLegend>

            <RadioGroup
              value={mode}
              className="flex flex-col gap-3"
              onValueChange={(newValue: string) => setMode(newValue as Mode)}
            >
              <div className="rounded-xl border border-border/70 bg-background/70 p-3 transition-colors sm:p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <RadioGroupItem value="letterCount" id="letterCountOption" className="mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <label htmlFor="letterCountOption" className="text-sm font-medium leading-5 text-foreground">
                        Set number of letters
                      </label>
                      <p className="mt-1 text-sm leading-5 text-muted-foreground">Pick a standard word length for the board.</p>
                      {mode === "letterCount" && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Input
                            id="letterCount"
                            name="letterCount"
                            min="2"
                            max="9"
                            step="1"
                            type="number"
                            inputMode="numeric"
                            value={letterCount}
                            onChange={(event) => handleNumberInput(event.target.value, setLetterCount)}
                            className="h-10 w-24"
                            aria-describedby="letterCountHelp"
                            aria-invalid={!validateNumberBounds(letterCount, 2, 9)}
                          />
                          <span id="letterCountHelp" className="text-sm text-muted-foreground">
                            letters
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-background/70 p-3 transition-colors sm:p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <RadioGroupItem value="customAnswer" id="customAnswerOption" className="mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <label htmlFor="customAnswerOption" className="text-sm font-medium leading-5 text-foreground">
                        Enter custom word
                      </label>
                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        Use your own answer instead of a generated one.
                      </p>
                      {mode === "customAnswer" && (
                        <div className="mt-3 flex flex-col gap-2 sm:max-w-xs">
                          <Input
                            id="answer"
                            type="text"
                            value={answer}
                            onChange={(event) => setAnswer(event.target.value.toUpperCase())}
                            placeholder="Enter word to use as answer"
                            className="h-10"
                            autoCapitalize="characters"
                            spellCheck={false}
                            aria-describedby="customAnswerHelp"
                          />
                          <span id="customAnswerHelp" className="text-sm text-muted-foreground">
                            Use letters only for a valid answer.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <div className="rounded-xl border border-border/70 bg-background/70 p-3 sm:p-4">
              <Field className="flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <FieldLabel htmlFor="guessCount" className="text-sm font-medium leading-5">
                  Set number of guesses allowed
                </FieldLabel>
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    id="guessCount"
                    min="1"
                    max="20"
                    step="1"
                    type="number"
                    inputMode="numeric"
                    value={guessCount}
                    onChange={(event) => handleNumberInput(event.target.value, setGuessCount)}
                    className="h-10 w-24"
                    aria-invalid={!validateNumberBounds(guessCount, 1, 20)}
                  />
                  <span className="text-sm text-muted-foreground">guesses</span>
                </div>
              </Field>
            </div>
          </FieldSet>
        </section>

        <nav className="flex flex-wrap items-center justify-end gap-3" aria-label="Wordle actions">
          <Button
            type="button"
            onClick={() => {
              router.push("/games/wordle");
            }}
          >
            Back to Game
          </Button>
          <Button
            type="button"
            disabled={
              (mode === "letterCount" ? !validateNumberBounds(letterCount, 2, 9) : answer.trim() === "") ||
              !validateNumberBounds(guessCount, 1, 20)
            }
            onClick={() => {
              void onStartGame();
            }}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Game
          </Button>
        </nav>
      </div>
    </main>
  );
}
