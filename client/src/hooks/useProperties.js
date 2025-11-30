import { useState, useEffect, useCallback } from 'react';
import propertyService from '../services/propertyService';

const useProperties = (initialParams = {}) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [params, setParams] = useState(initialParams);

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await propertyService.getAll(params);
            setProperties(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    return { properties, loading, error, setParams, refetch: fetchProperties };
};

export default useProperties;
