export interface Movie {
  id: number | null;
  title: string;
  year: number;
  director: string;
  cast: Array<string>;
  ratingIMDB: number;
  poster: string;
  plot: string;
  trailer: string;
}

export interface MoviesListProps {
  list: Movie[];
  onDeleteMovie: (id: number) => void;
  onEditMovie: (movie: Movie) => void;
}
