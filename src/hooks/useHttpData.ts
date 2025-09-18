import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default <T>(url?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let aborted = false;
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get<T>(url, { signal })
      .then(({ data }) => {
        if (!aborted) {
          setData(data);
        }
      })
      .catch((e) => {
        if (!aborted) {
          console.log(e);
          setError(e);
          setData(null);
        }
      })
      .finally(() => {
        if (!aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
      aborted = true;
    };
  }, [url]);

  const search = useCallback(async (searchUrl: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<T>(searchUrl);
      setData(response.data);
      return response.data;
    } catch (e: any) {
      console.error("GET request error:", e);
      setError(e);
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const postData = async (
    url: string,
    payload: any
  ): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<T>(url, payload);
      setData(response.data);
      return response.data;
    } catch (e: any) {
      console.error("POST request error:", e);
      setError(e);
      // Puedes lanzar el error de nuevo o devolver undefined/null según tu manejo de errores
      throw e; // Lanzamos el error para que el componente que llama lo pueda capturar
    } finally {
      setLoading(false);
    }
  };

  const putData = async (url: string, payload: any): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put<T>(url, payload);
      setData(response.data); // Opcional: actualizar 'data' con la respuesta del PUT
      return response.data;
    } catch (e: any) {
      console.error("PUT request error:", e);
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, search, postData, putData };
};
