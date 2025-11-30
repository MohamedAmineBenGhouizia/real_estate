import React, { useState } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Paper,
    Grid,
    Typography,
    Slider,
    InputAdornment,
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';

const PropertyFilters = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters);
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            fullWidth
                            label="Property Type"
                            name="type"
                            value={filters.type}
                            onChange={handleChange}
                            variant="outlined"
                        >
                            <MenuItem value="">All Types</MenuItem>
                            <MenuItem value="Apartment">Apartment</MenuItem>
                            <MenuItem value="House">House</MenuItem>
                            <MenuItem value="Villa">Villa</MenuItem>
                            <MenuItem value="Commercial">Commercial</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Min Price"
                            name="minPrice"
                            type="number"
                            value={filters.minPrice}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Max Price"
                            name="maxPrice"
                            type="number"
                            value={filters.maxPrice}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<FilterIcon />}
                            sx={{ height: '56px' }} // Match TextField height
                        >
                            Apply Filters
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default PropertyFilters;
