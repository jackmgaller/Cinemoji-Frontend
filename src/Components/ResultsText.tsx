import { FC } from "react";
import "./ResultsText.css";

type ResultsTextProps = {
  movieCount: number | null;
  selectedEmojis: string[];
};

export const ResultsText: FC<ResultsTextProps> = ({ movieCount, selectedEmojis }) => {
  let innerText = "";

  if (movieCount === null) {
    return <div className="results-text">Loading!</div>;
  } else if (selectedEmojis.length === 0) {
    return (
      <div className="results-text">Select some emojis to filter through {movieCount} movies!</div>
    );
  }

  let firstHalf = "";

  if (movieCount === 0) {
    firstHalf = "No movies have";
  } else if (movieCount === 1) {
    firstHalf = "1 movie has";
  } else {
    firstHalf = movieCount + " movies have";
  }

  innerText = firstHalf + " the emoji";

  if (selectedEmojis.length > 1) innerText += "s";

  innerText += "";

  let secondHalf = " ";

  if (selectedEmojis.length === 1) {
    secondHalf += selectedEmojis[0];
  } else if (selectedEmojis.length === 2) {
    secondHalf += selectedEmojis[0] + " and " + selectedEmojis[1];
  } else {
    secondHalf +=
      selectedEmojis.slice(0, selectedEmojis.length - 1).join(", ") +
      ", and " +
      selectedEmojis[selectedEmojis.length - 1];
  }

  innerText += secondHalf;

  return <div className="results-text">{innerText}</div>;
};
