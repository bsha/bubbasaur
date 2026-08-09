type WordResponse = string | { word?: string };

export class WordleWordService {
  constructor(private readonly baseUrl: string = "https://random-word-api.herokuapp.com/word") {}

  async getWordByLength(letterCount: number): Promise<string> {
    const response = await fetch(`${this.baseUrl}?length=${letterCount}&diff=1`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Unable to load a word for ${letterCount} letters.`);
    }

    const data = (await response.json()) as WordResponse[];

    const firstData = data[0];
    if (typeof firstData === "string") {
      return firstData.toUpperCase();
    }

    throw new Error("Unexpected response from the word service.");
  }
}

export const wordleWordService = new WordleWordService();
