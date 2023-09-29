export function findFirstEmoji(str: string) {
  const result = splitEmoji(str);

  return result[0];
}

export const splitEmoji = (string: string): string[] => {
  const regex =
    /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)*|./gsu;

  return Array.from(string.match(regex) ?? []);
};
