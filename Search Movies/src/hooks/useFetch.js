import { useEffect, useState } from "react";

const API_ENDPOINT = `https://www.omdbapi.com/?apikey=cf296882`;

export const useFetch = (params) => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const fetchMovie = (url) => {
    setIsloading(true);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.Response === "True") {
          setData(responseJson.Search || responseJson);
          setError(false);
        } else {
          setError(true);
        }
        setIsloading(false);
        console.log("Data: ", responseJson);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}${params}`);
  }, [params]);

  return { isLoading, error, data };
};
