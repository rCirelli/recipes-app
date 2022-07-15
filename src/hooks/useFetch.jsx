import { useState, useEffect } from 'react';

export default function useAPI() {
  const [endpoint, setEndpoint] = useState({});
  const [responseData, setResponseData] = useState({});

  const fetchFromEndpoint = (url) => fetch(url)
    .then((response) => response.json()).catch((error) => error);

  useEffect(() => {
    const fetchAPI = async () => {
      const apiData = await fetchFromEndpoint(endpoint);
      setResponseData(apiData);
    };
    fetchAPI();
  }, [endpoint]);

  return [responseData, setEndpoint];
}
