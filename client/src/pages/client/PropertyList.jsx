import React, { useState } from 'react';
import useProperties from '../../hooks/useProperties';
import PropertyCard from '../../components/client/PropertyCard';
import PropertyFilters from '../../components/client/PropertyFilters';
import {
    Container,
    Grid,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Pagination,
} from '@mui/material';

const PropertyList = () => {
    const [filters, setFilters] = useState({});
    const { properties, loading, error } = useProperties(filters);

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                    Properties
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Browse our latest real estate listings.
                </Typography>
            </Box>

            <PropertyFilters onFilter={handleFilter} />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                </Alert>
            ) : properties.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No properties found matching your criteria.
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {properties.map((property) => (
                            <Grid item key={property.id} xs={12} sm={6} md={4}>
                                <PropertyCard property={property} />
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                        <Pagination count={1} color="primary" size="large" />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default PropertyList;
