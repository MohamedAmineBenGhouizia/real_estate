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
    useTheme,
    useMediaQuery,
    Drawer,
    Button,
    Stack
} from '@mui/material';
import { FilterList as FilterIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const PropertyList = () => {
    const { properties, loading, error, setParams } = useProperties();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleFilter = (filters) => {
        setParams(filters);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4, minHeight: '80vh' }}>
            {/* Header & Mobile Filter Button */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontFamily: '"Playfair Display", serif' }}>
                    Nos Propriétés
                </Typography>
                {isMobile && (
                    <Button
                        variant="outlined"
                        startIcon={<FilterIcon />}
                        onClick={handleDrawerToggle}
                    >
                        Filtres
                    </Button>
                )}
            </Box>

            <Grid container spacing={4}>
                {/* Desktop Sidebar */}
                <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Box sx={{ position: 'sticky', top: 100 }}>
                        <PropertyFilters onFilter={handleFilter} />
                    </Box>
                </Grid>

                {/* Property Grid */}
                <Grid item xs={12} md={9}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress color="secondary" />
                        </Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : properties.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" color="text.secondary">
                                Aucune propriété ne correspond à vos critères.
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {properties.map((property) => (
                                <Grid item key={property.id} xs={12} sm={6} lg={4}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <PropertyCard property={property} />
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Grid>

            {/* Mobile Filter Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300, p: 2 },
                }}
            >
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">Filtres</Typography>
                    <Button onClick={handleDrawerToggle} color="inherit">Fermer</Button>
                </Box>
                <PropertyFilters onFilter={handleFilter} />
            </Drawer>
        </Container>
    );
};

export default PropertyList;
