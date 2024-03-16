import { useEffect, useState } from "react";

export function useFetch(fetchFunction, initialValue) {
  const [isFetching, setIsLoading] = useState();
  const [error, setIsError] = useState();
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const places = await fetchFunction();
        setData(places);
      } catch (error) {
        setIsError({ message: error.message || "Failed to fetch data." });
      }

      setIsLoading(false);
    }

    fetchData();
  }, [fetchFunction]);

  return {
    error,
    isFetching,
    data,
    setIsLoading,
    setIsError,
    setData,
  };
}
