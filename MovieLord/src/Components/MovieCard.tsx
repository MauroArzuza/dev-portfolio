import React, { useState } from "react";
import { Movie } from "../types";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  onDeleteMovie: (id: number) => void;
  onEditMovie: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onDeleteMovie,
  onEditMovie,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const [showMenu, setShowMenu] = useState<number | null>(null);

  const handleMenuToggle = (id: number | null, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(showMenu === id ? null : id);
  };

  const handleMenuClick = (id: number | null, e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      onDeleteMovie(id);
    }
  };

  const handleEditClick = (movie: Movie, e: React.MouseEvent) => {
    e.stopPropagation();
    onEditMovie(movie);
  };

  const getRatingClass = (rating: number) => {
    if (rating >= 8.0) {
      return "rating-high";
    } else if (rating >= 6.0) {
      return "rating-medium";
    } else {
      return "rating-low";
    }
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img
        className="poster"
        src={movie.poster}
        alt={`${movie.title} poster`}
      />
      <button
        className="menu-button"
        onClick={(e) => handleMenuToggle(movie.id, e)}
      >
        ⋮
      </button>
      {showMenu === movie.id && (
        <div className="menu" onClick={(e) => e.stopPropagation()}>
          <button
            className="edit_button"
            onClick={(e) => handleEditClick(movie, e)}
          >
            Editar
          </button>
          <button
            className="delete-button"
            onClick={(e) => handleMenuClick(movie.id, e)}
          >
            Eliminar
          </button>
        </div>
      )}
      <h4>{movie.title}</h4>
      <p>{movie.year}</p>
      <div className={`movie-rating ${getRatingClass(movie.ratingIMDB)}`}>
        <p>{movie.ratingIMDB}</p>
      </div>
    </div>
  );
};

export default MovieCard;
