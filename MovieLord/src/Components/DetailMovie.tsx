import React, { useEffect, useState, useRef } from "react";
import { Movie } from "../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// import "swiper/css";
// import "swiper/css/navigation";

interface DetailMovieProps {
  movies: Movie[];
}

interface CastMember {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

const API_KEY = "109639f71cf1df111c8c2bdc32d37086";

const DetailMovie: React.FC<DetailMovieProps> = ({ movies }) => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState<CastMember[]>([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const correctMovie = movies.find((movie) => movie.id === Number(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!correctMovie) return;

      try {
        setMovieDetails(null);
        setCast([]);

        // Fetch detalles de la película
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${correctMovie.id}?api_key=${API_KEY}`
        );
        setMovieDetails(response.data);

        // Fetch cast
        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${correctMovie.id}/credits?api_key=${API_KEY}`
        );
        setCast(castResponse.data.cast || []); // Asegurar que sea un array
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [correctMovie]);

  if (!correctMovie || !movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-movie">
      <div className="primary-info">
        <div className="poster">
          <img
            src={`${correctMovie.poster}`}
            alt={`${correctMovie.title} poster`}
          />
        </div>
        <div className="info">
          <h2>{correctMovie.title}</h2>
          <p>
            <strong>Año:</strong> {correctMovie.year}
          </p>
          <p>
            <strong>Director:</strong> {correctMovie.director}
          </p>
          <p>
            <strong>Rating IMDB:</strong> {correctMovie.ratingIMDB}
          </p>
          <p>
            <strong>Sinópsis:</strong> {correctMovie.plot}
          </p>
          <div className="trailer">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${correctMovie.trailer}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          </div>
        </div>
      </div>

      <h5 className="cast-title">
        <strong>CAST</strong>
      </h5>

      {/* Carrusel con navegación personalizada */}
      <div className="relative w-full">
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
        >
          <ChevronLeftIcon className="h-8 w-8 text-white" />
        </button>
        <div className="w-[90%] mx-auto">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={6}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            navigation={true}
            onBeforeInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (
                  swiper.params.navigation &&
                  typeof swiper.params.navigation !== "boolean"
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              });
            }}
          >
            {cast.slice(0, 20).map((actor) => (
              <SwiperSlide key={actor.id}>
                <div className="actor-card flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <p className="text-white">{actor.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
          >
            <ChevronRightIcon className="h-8 w-8 text-white" />
          </button>
        </div>

        {/* <button
          ref={nextRef}
          className="absolute right-0 z-10 bg-black/50 p-2 rounded-full"
        >
          <ChevronRightIcon className="w-8 h-8 text-white" />
        </button> */}
      </div>

      {/* Carrusel de actores con Swiper.js */}
      {/* {cast.length > 0 ? (
        <div className="cast-carousel">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={5}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {cast.slice(0, 20).map((actor) => (
              <SwiperSlide key={actor.id}>
                <div className="actor-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <p>{actor.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p>No hay elenco disponible.</p>
      )} */}
    </div>
  );
};

export default DetailMovie;
