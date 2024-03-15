import { useEffect, useState } from "react";

export function useFetch({ fetchFunction, initialValue }) {
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const [data, setData] = useState();

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
    isError,
    isLoading,
    data,
  };
}
