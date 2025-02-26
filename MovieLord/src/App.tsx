import React, { useEffect, useState } from "react";
import "./App.css";
import MoviesList from "./Components/MoviesList";
import Header from "./Components/Header";
import AddMovieCard from "./Components/AddMovieCard";
import { Movie } from "./types";
import DetailMovie from "./Components/DetailMovie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

const API_KEY = "109639f71cf1df111c8c2bdc32d37086";

// Función para obtener el ID de una película
const getMovieId = async (movieTitle: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        movieTitle
      )}`
    );
    if (response.data.results.length > 0) {
      return response.data.results[0].id;
    } else {
      console.error("No se encontraron resultados para", movieTitle);
      return null;
    }
  } catch (error) {
    console.error("Error al buscar la película:", error);
    return null;
  }
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesToFetch = [
        {
          id: null,
          title: "Gladiator",
          year: 2000,
          ratingIMDB: 8.5,
          director: "Ridley Scott",
          cast: [
            "Russell Crowe",
            "Joaquin Phoenix",
            "Connie Nielsen",
            "Oliver Reed",
            "Richard Harris",
            "Derek Jacobi",
            "Djimon Hounsou",
          ],
          poster:
            "https://th.bing.com/th/id/OIP.AsChYIJz6NXp2DIr1xZDKgHaLH?rs=1&pid=ImgDetMain",
          plot: "Un ex general romano se propone vengarse del corrupto emperador que asesinó a su familia y lo envió a la esclavitud.",
          trailer: "P5ieIbInFpg",
        },
        {
          id: null,
          title: "Heat",
          year: 1995,
          ratingIMDB: 8.3,
          director: "Michael Mann",
          cast: [
            "Al Pacino",
            "Robert De Niro",
            "Val Kilmer",
            "Jon Voight",
            "Tom Sizemore",
            "Diane Venora",
            "Amy Brenneman",
            "Ashley Judd",
          ],
          poster:
            "https://media.senscritique.com/media/000007856728/source_big/Heat.jpg",
          plot: "Un grupo de ladrones de banco profesionales sabe que tiene a la policía en los talones tras dejar una pista en su último robo por error.",
          trailer: "3UB16UIpgjI",
        },
        {
          id: null,
          title: "Spider-Man",
          year: 2002,
          ratingIMDB: 7.4,
          director: "Sam Raimi",
          cast: [
            "Tobey Maguire",
            "Kirsten Dunst",
            "Willem Dafoe",
            "James Franco",
            "Cliff Robertson",
            "Rosemary Harris",
            "J.K. Simmons",
            "Joe Manganiello",
          ],
          poster:
            "https://th.bing.com/th/id/OIP.PVjsOkt6KaIG7YXt-42dAgHaKj?rs=1&pid=ImgDetMain",
          plot: "Cuando es mordido por una araña modificada genéticamente, un estudiante tímido de secundaria adquiere habilidades de araña que eventualmente debe usar para luchar contra el mal como un superhéroe, después de que la tragedia tocara a su familia.",
          trailer: "_yhFofFZGcc",
        },
        {
          id: null,
          title: "RoboCop",
          year: 1987,
          ratingIMDB: 7.6,
          director: "Paul Verhoeven",
          cast: [
            "Peter Weller",
            "Nancy Allen",
            "Dan O'Herlihy",
            "Ronny Cox",
            "Kurtwood Smith",
            "Miguel Ferrer",
            "Robert DoQui",
            "Paul McCrane",
            "Ray Wise",
          ],
          poster:
            "https://th.bing.com/th/id/R.23018d02c5c0e7b3b6f676aac3ebfd5d?rik=0ZDT1A3UxAfLIA&riu=http%3a%2f%2fimg0.pconline.com.cn%2fpconline%2f1211%2f22%2f3078184_01_thumb.jpg&ehk=b7xwVnPDutxOGM2h7giHUWaxHBbxuGWMHwOJHPKm9I4%3d&risl=&pid=ImgRaw&r=0",
          plot: "En un Detroit distópico y asolado por el crimen, un policía herido regresa a la fuerza como un poderoso cyborg perseguido por recuerdos sumergidos.",
          trailer: "6tC_5mp3udE",
        },
        {
          id: null,
          title: "Batman Begins",
          year: 2005,
          ratingIMDB: 8.2,
          director: "Christopher Nolan",
          cast: [
            "Christian Bale",
            "Michael Caine",
            "Liam Neeson",
            "Katie Holmes",
            "Gary Oldman",
            "Morgan Freeman",
            "Tom Wilkinson",
            "Cillian Murphy",
            "Ken Watanabe",
            "Rutger Hauer",
            "Linus Roache",
            "Sara Stewart",
          ],
          poster: "https://picfiles.alphacoders.com/127/thumb-1920-127262.jpg",
          plot: "Después de entrenar con su mentor, Batman comienza su lucha para liberar a Gotham City de la corrupción.",
          trailer: "FiL1_5DWV7Y",
        },
      ];

      const savedMovies = JSON.parse(localStorage.getItem("movies") || "[]");

      const combinedMovies = [...moviesToFetch, ...savedMovies];

      const moviesWithIds = await Promise.all(
        combinedMovies.map(async (movie) => {
          const movieId = movie.id ?? (await getMovieId(movie.title));

          return { ...movie, id: movieId };
        })
      );

      return moviesWithIds;
    };

    const savedMovies = localStorage.getItem("movies");

    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    } else {
      fetchMovies().then((fetchedMovies) => {
        setMovies(fetchedMovies);
        localStorage.setItem("movies", JSON.stringify(fetchedMovies));
      });
    }
  }, []);

  const [showAddMovieCard, setShowAddMovieCard] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  const toggleAddMovieCard = () => {
    setShowAddMovieCard(!showAddMovieCard);
    setMovieToEdit(null);
  };

  const addMovie = (newMovie: Movie) => {
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const deleteMovie = (id: number) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const editMovie = (movie: Movie) => {
    setMovieToEdit(movie);
    setShowAddMovieCard(true);
  };

  const updateMovie = (updatedMovie: Movie) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  return (
    <Router>
      <Header onAddMovieClick={toggleAddMovieCard} />
      {showAddMovieCard && (
        <div className="overlay">
          <AddMovieCard
            onClose={toggleAddMovieCard}
            onAddMovie={movieToEdit ? updateMovie : addMovie}
            movieToEdit={movieToEdit}
          />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <MoviesList
              list={movies}
              onDeleteMovie={deleteMovie}
              onEditMovie={editMovie}
            />
          }
        />
        <Route path="/movie/:id" element={<DetailMovie movies={movies} />} />
      </Routes>
    </Router>
  );
}

export default App;
