import { useState, useEffect } from "react";

function GetCCTVData({ cctvName }) {
    const [cctvData, setCctvData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!cctvName) return;

        const fetchCCTVData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8080/api/data/${cctvName}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCctvData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };

        fetchCCTVData();
    }, [cctvName]);

    return { cctvData, loading, error }; 
}

export default GetCCTVData;
