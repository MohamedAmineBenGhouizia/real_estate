import React, { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Paper,
    Typography,
    Slider,
    InputAdornment,
    Stack,
    Checkbox,
    FormControlLabel,
    Divider
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';

const PropertyFilters = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        search: '',
        type: [],
        priceRange: [0, 5000000],
        bedrooms: '',
        bathrooms: '',
        minArea: '',
        maxArea: '',
        hasGarden: false,
        hasBalcony: false
    });

    const propertyTypes = ['Apartment', 'House', 'Villa', 'Penthouse', 'Commercial'];

    // Debounce function
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // Apply filters logic
    const applyFilters = (currentFilters) => {
        const activeFilters = { ...currentFilters };

        if (activeFilters.priceRange) {
            activeFilters.minPrice = activeFilters.priceRange[0];
            activeFilters.maxPrice = activeFilters.priceRange[1];
            delete activeFilters.priceRange;
        }

        Object.keys(activeFilters).forEach(key => {
            if (activeFilters[key] === '' || activeFilters[key] === null || activeFilters[key] === undefined) {
                delete activeFilters[key];
            }
            if (Array.isArray(activeFilters[key]) && activeFilters[key].length === 0) {
                delete activeFilters[key];
            }
            if (activeFilters[key] === false) {
                delete activeFilters[key];
            }
        });

        onFilter(activeFilters);
    };

    // Debounced apply for text inputs
    const debouncedApply = React.useCallback(debounce((newFilters) => applyFilters(newFilters), 500), []);

    const handleChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        if (['search', 'minArea', 'maxArea'].includes(name)) {
            debouncedApply(newFilters);
        } else {
            applyFilters(newFilters); // Instant apply for dropdowns
        }
    };

    const handleTypeChange = (type) => {
        setFilters(prev => {
            const newTypes = prev.type.includes(type)
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type];
            const newFilters = { ...prev, type: newTypes };
            applyFilters(newFilters);
            return newFilters;
        });
    };

    const handleCheckboxChange = (name) => {
        setFilters(prev => {
            const newFilters = { ...prev, [name]: !prev[name] };
            applyFilters(newFilters);
            return newFilters;
        });
    };

    const handlePriceChange = (e, newValue) => {
        setFilters(prev => ({ ...prev, priceRange: newValue }));
        // Debounce slider to avoid too many requests while dragging
        debouncedApply({ ...filters, priceRange: newValue });
    };

    const handleClear = () => {
        const resetFilters = {
            search: '',
            type: [],
            priceRange: [0, 5000000],
            bedrooms: '',
            bathrooms: '',
            minArea: '',
            maxArea: '',
            hasGarden: false,
            hasBalcony: false
        };
        setFilters(resetFilters);
        applyFilters(resetFilters);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters(filters);
    };

    return (
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #eee', height: 'fit-content' }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Rechercher
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Rechercher un lieu..."
                            value={filters.search}
                            onChange={(e) => handleChange('search', e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            size="small"
                        />
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Type de Propriété
                        </Typography>
                        <Stack>
                            {propertyTypes.map((type) => (
                                <FormControlLabel
                                    key={type}
                                    control={
                                        <Checkbox
                                            checked={filters.type.includes(type)}
                                            onChange={() => handleTypeChange(type)}
                                            color="secondary"
                                        />
                                    }
                                    label={type === 'Apartment' ? 'Appartement' : type === 'House' ? 'Maison' : type}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Fourchette de Prix
                        </Typography>
                        <Slider
                            value={filters.priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5000000}
                            step={50000}
                            color="secondary"
                        />
                        <Stack direction="row" justifyContent="space-between" mt={1}>
                            <Typography variant="body2" color="text.secondary">
                                {formatPrice(filters.priceRange[0])}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatPrice(filters.priceRange[1])}
                            </Typography>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Pièces
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                select
                                fullWidth
                                label="Chambres"
                                value={filters.bedrooms}
                                onChange={(e) => handleChange('bedrooms', e.target.value)}
                                size="small"
                            >
                                <MenuItem value="">Peu importe</MenuItem>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <MenuItem key={num} value={num}>{num}+</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                fullWidth
                                label="Salles de bain"
                                value={filters.bathrooms}
                                onChange={(e) => handleChange('bathrooms', e.target.value)}
                                size="small"
                            >
                                <MenuItem value="">Peu importe</MenuItem>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <MenuItem key={num} value={num}>{num}+</MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Surface (m²)
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                placeholder="Min"
                                value={filters.minArea}
                                onChange={(e) => handleChange('minArea', e.target.value)}
                                size="small"
                                type="number"
                            />
                            <TextField
                                fullWidth
                                placeholder="Max"
                                value={filters.maxArea}
                                onChange={(e) => handleChange('maxArea', e.target.value)}
                                size="small"
                                type="number"
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Caractéristiques
                        </Typography>
                        <Stack>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filters.hasGarden}
                                        onChange={() => handleCheckboxChange('hasGarden')}
                                        color="secondary"
                                    />
                                }
                                label="Jardin"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filters.hasBalcony}
                                        onChange={() => handleCheckboxChange('hasBalcony')}
                                        color="secondary"
                                    />
                                }
                                label="Balcon"
                            />
                        </Stack>
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            fullWidth
                            onClick={handleClear}
                        >
                            Effacer
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            startIcon={<FilterIcon />}
                            sx={{ color: 'white' }}
                        >
                            Appliquer
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
};

export default PropertyFilters;
