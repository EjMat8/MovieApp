import { useState, useCallback } from "react";
import movies from "../lib/api";

export const useHttp = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: {},
  });
  const getData = useCallback(async (link, req) => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const data = await movies[req](link);

      if (data.status === 200)
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          data: data,
        }));
      else throw new Error();
    } catch (err) {
      setState({ isLoading: false, hasError: true, data: null });
    }
  }, []);

  return [state, getData];
};
