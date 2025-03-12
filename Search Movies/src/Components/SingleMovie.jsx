import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import DefaultImage from "../../public/NoImage.png";

const SingleMovie = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useFetch(`&i=${id}`);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const {
    Poster,
    Title,
    Plot,
    imdbRating,
    Country,
    Director,
    Released,
    Runtime,
    Actors,
    Rated,
  } = data;

  let image = Poster === "N/A" ? DefaultImage : Poster;

  return !isLoading ? (
    <div className="single-movie">
      <img src={image} alt={Title} />
      <div className="single-info">
        <h2>{Title}</h2>
        <p>{Plot}</p>
        <p>
          <strong>Country: </strong>
          {Country}
        </p>
        <p>
          <strong>Director: </strong>
          {Director}
        </p>
        <p>
          <strong>Actors: </strong>
          {Actors}
        </p>
        <p>
          <strong>Runtime: </strong>
          {Runtime}
        </p>
        <p>
          <strong>Released: </strong>
          {Released}
        </p>
        <p>
          <strong>IMDB Rating: </strong>
          {imdbRating}
        </p>
        <p>
          <strong>Rated: </strong>
          {Rated}
        </p>
      </div>
    </div>
  ) : (
    ""
  );
};

export default SingleMovie;
