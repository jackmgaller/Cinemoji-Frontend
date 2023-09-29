import { Movie } from "../Movie";
import "./MovieTile.css";

type MovieTileProps = {
  movie: Movie;
};

export const MovieTile: React.FC<MovieTileProps> = ({ movie }) => {
  const moviePosterLink = movie.posterLink.substring(15, movie.posterLink.indexOf('" '));

  console.log(moviePosterLink);
  return (
    <span className="movie-tile">
      <img src={moviePosterLink}></img>
      <div className="movie-text">
        <span>
          <span>{movie.title}</span>
          <span className="movie-year"> {movie.year}</span>
        </span>
        <div>{movie.emojiSummary}</div>
      </div>
    </span>
  );
};
