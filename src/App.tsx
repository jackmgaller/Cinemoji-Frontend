import { MouseEventHandler, useEffect, useState } from "react";
import "./App.css";
import { EmojiTag } from "./Components/EmojiTag";
import { findFirstEmoji } from "./findFirstEmoji";
import { EmojiFrequency, Movie } from "./Movie";
import { getFrequenciesFromMovies } from "./getFrequenciesFromMovies";
import { MovieTile } from "./Components/MovieTile";
import { ResultsText } from "./Components/ResultsText";
import { Footer } from "./Components/Footer";

function App() {
  const url = "https://cinemoji-backend.onrender.com";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [emojiFrequencies, setEmojiFrequencies] = useState<EmojiFrequency[]>([]);

  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  useEffect(() => {
    async function getData() {
      const rawData = await fetch(`${url}/all-movies`);
      const data = (await rawData.json()) ?? [];

      setMovies(data);
    }

    getData();
  }, []);

  useEffect(() => {
    const newEmojiFrequencies = getFrequenciesFromMovies(movies);

    setEmojiFrequencies(newEmojiFrequencies);
  }, [movies]);

  useEffect(() => {
    async function getData() {
      const rawData = await fetch(`${url}/filter-movies/`, {
        body: JSON.stringify(selectedEmojis),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await rawData.json()) as Movie[];

      setMovies(data ?? []);
    }

    getData();
  }, [selectedEmojis]);

  const onToggleEmojiTag: MouseEventHandler<HTMLButtonElement> = event => {
    const toggledEmoji = findFirstEmoji(event.currentTarget.innerText);

    if (toggledEmoji) {
      if (selectedEmojis.includes(toggledEmoji)) {
        setSelectedEmojis(selectedEmojis.filter(x => x !== toggledEmoji));
      } else {
        setSelectedEmojis([...selectedEmojis, toggledEmoji]);
      }
    }
  };

  const emojiTags = emojiFrequencies.map(emojiEntry => {
    const { emoji, frequency } = emojiEntry;
    return (
      <EmojiTag
        key={emoji}
        checked={selectedEmojis.includes(emoji)}
        emoji={emoji}
        count={frequency}
        handleClick={onToggleEmojiTag}
      />
    );
  });

  const movieSection = movies.map(movie => {
    return <MovieTile movie={movie} />;
  });

  return (
    <div>
      <h1>🎞️ Cinemoji</h1>
      <div className="tags">{emojiTags}</div>
      <ResultsText selectedEmojis={selectedEmojis} movieCount={movies.length} />
      <div className="movies">{movieSection}</div>
      <Footer />
    </div>
  );
}

export default App;
