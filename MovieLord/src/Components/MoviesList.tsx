import React from "react";
import { MoviesListProps } from "../types";
import MovieCard from "./MovieCard";

const MoviesList: React.FC<MoviesListProps> = ({
  list,
  onDeleteMovie,
  onEditMovie,
}) => {
  return (
    <div className="movies-list">
      {list.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
          onEditMovie={onEditMovie}
        />
      ))}
    </div>
  );
};

export default MoviesList;
