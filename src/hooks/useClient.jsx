import { useState, useEffect } from "react";
import apiService from "../services";

const useClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const data = await apiService.get("/allProducts", {
                    limit: 100,
                    offset: 0
                    });
                console.log(" data tab tab:", data);
        
                setClients(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    return { clients, loading, error };
};

export default useClients;