import { EmojiFrequency, Movie } from "./Movie";

/**
 * Get the overall amount of emojis from a list of movies.
 *
 * ```
 * movies = [
 *   ["A", "B", "C"],
 *   ["X", "Y", "Z"],
 *   ["A", "A", "A"],
 * ]
 *
 * getFrequenciesFromMovies(movies) = [
 *   {
 *     emoji: "A",
 *     frequency: 2,
 *   },
 *   {
 *     emoji: "B",
 *     frequency: 1,
 *   },
 *   ...
 * ]
 * ```
 *
 * @param movies
 */
export const getFrequenciesFromMovies = (movies: Movie[]): EmojiFrequency[] => {
  const emojiFrequencies: EmojiFrequency[] = [];

  movies.forEach((movie) => {
    // Transform array -> Set -> array to dedupe emojis
    const uniqueEmojis = [...new Set(splitEmoji(movie.emojiSummary))];

    uniqueEmojis.forEach((uniqueEmoji) => {
      const entryIndex = emojiFrequencies.findIndex((entry) =>
        entry.emoji === uniqueEmoji
      );

      if (entryIndex === -1) {
        emojiFrequencies.push({
          emoji: uniqueEmoji,
          frequency: 1,
        });
      } else {
        const currentEntry = emojiFrequencies[entryIndex];

        emojiFrequencies[entryIndex] = {
          ...currentEntry,
          frequency: currentEntry.frequency + 1,
        };
      }
    });
  });

  emojiFrequencies.sort((a, b) => b.frequency - a.frequency);

  return emojiFrequencies;
};

const splitEmoji = (string: string): string[] => {
  const regex =
    /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)*|./gsu;

  return Array.from(string.match(regex) ?? []);
};
