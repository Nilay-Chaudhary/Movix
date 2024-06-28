import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

// custom hook for fetching data
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;