import React, { useEffect, useState } from "react";
import { Movie } from "../types";
import axios from "axios";

const API_KEY = "109639f71cf1df111c8c2bdc32d37086";

interface AddMovieCardProps {
  onClose: () => void;
  onAddMovie: (newMovie: Movie) => void;
  movieToEdit?: Movie | null;
}

const AddMovieCard: React.FC<AddMovieCardProps> = ({
  onClose,
  onAddMovie,
  movieToEdit,
}) => {
  const [newMovie, setNewMovie] = useState<Movie>({
    id: null,
    title: "",
    year: new Date().getFullYear(),
    director: "",
    cast: [], // Se mantendrá vacío ya que se obtiene desde la API
    ratingIMDB: 0,
    poster: "",
    plot: "",
    trailer: "",
  });

  useEffect(() => {
    if (movieToEdit) {
      setNewMovie(movieToEdit);
    }
  }, [movieToEdit]);

  const getMovieId = async (movieTitle: string): Promise<number | null> => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          movieTitle
        )}`
      );
      if (response.data.results.length > 0) {
        return response.data.results[0].id;
      }
      return null;
    } catch (error) {
      console.error("Error al buscar la película:", error);
      return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !newMovie.title ||
      !newMovie.year ||
      !newMovie.poster ||
      !newMovie.trailer
    ) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      // Recuperar el ID de TMDB
      const movieId = await getMovieId(newMovie.title);

      if (!movieId) {
        alert("No se encontró un ID válido para esta película en TMDB.");
        return;
      }

      // Crear un objeto de película con el ID asignado
      const movieWithId: Movie = { ...newMovie, id: movieId };

      // Pasar la película al manejador
      onAddMovie(movieWithId);

      // Cerrar el formulario
      onClose();
    } catch (error) {
      console.error("Error al agregar la película:", error);
      alert("Hubo un problema al agregar la película. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="add-movie-card">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <div className="add-movie-title">
        <h2>{movieToEdit ? "Editar Película" : "Agregar Película"}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Año:
          <input
            type="number"
            name="year"
            value={newMovie.year}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            value={newMovie.director}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rating IMDB:
          <input
            type="number"
            step="0.1"
            name="ratingIMDB"
            value={newMovie.ratingIMDB}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Póster:
          <input
            type="text"
            name="poster"
            value={newMovie.poster}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Plot:
          <textarea
            name="plot"
            value={newMovie.plot}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Tráiler:
          <input
            type="text"
            name="trailer"
            value={newMovie.trailer}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">
          <strong>{movieToEdit ? "Guardar Cambios" : "Agregar"}</strong>
        </button>
      </form>
    </div>
  );
};

export default AddMovieCard;
