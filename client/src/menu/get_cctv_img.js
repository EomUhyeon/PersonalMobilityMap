import { useState, useEffect } from "react";

function GetCCTVImg({ cctvName, imgName }) {
    const [imgURL, setImgURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!imgName) return;

        const fetchImage = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8080/api/data/image/${cctvName}/${imgName}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImgURL(url);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();

        return () => {
            if (imgURL) {
                URL.revokeObjectURL(imgURL);
            }
        };
    }, [imgName]);

    return { imgURL, loading, error };
}

export default GetCCTVImg;
