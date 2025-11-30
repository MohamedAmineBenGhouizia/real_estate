import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import ReservationForm from '../../components/client/ReservationForm';
import {
    Container,
    Grid,
    Typography,
    Box,
    Chip,
    Stack,
    CircularProgress,
    Paper,
    Divider,
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    Bed as BedIcon,
    Bathtub as BathIcon,
    SquareFoot as SquareFootIcon,
} from '@mui/icons-material';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await propertyService.getById(id);
                setProperty(data);
            } catch (err) {
                setError('Failed to load property details');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    if (error) return <Box sx={{ py: 8, textAlign: 'center' }}><Typography color="error">{error}</Typography></Box>;
    if (!property) return <Box sx={{ py: 8, textAlign: 'center' }}><Typography>Property not found</Typography></Box>;

    return (
        <Box>
            {/* Image Gallery */}
            <Box sx={{ mb: 4, borderRadius: 4, overflow: 'hidden', height: { xs: 300, md: 500 } }}>
                <Swiper
                    modules={[Navigation, SwiperPagination]}
                    navigation
                    pagination={{ clickable: true }}
                    style={{ width: '100%', height: '100%' }}
                >
                    {property.images && property.images.length > 0 ? (
                        property.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img} alt={`Property ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <img src="https://via.placeholder.com/1200x600?text=No+Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </Box>

            <Grid container spacing={4}>
                {/* Main Content */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 4 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                            <Box>
                                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                                    {property.title}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                                    <LocationIcon />
                                    <Typography variant="body1">{property.address}</Typography>
                                </Stack>
                            </Box>
                            <Chip
                                label={property.status}
                                color={property.status === 'available' ? 'success' : 'warning'}
                                sx={{ textTransform: 'capitalize', fontSize: '1rem', px: 1 }}
                            />
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Stack direction="row" spacing={4} sx={{ mb: 4 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <BedIcon color="action" />
                                <Typography variant="h6">3 Beds</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <BathIcon color="action" />
                                <Typography variant="h6">2 Baths</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <SquareFootIcon color="action" />
                                <Typography variant="h6">120 m²</Typography>
                            </Stack>
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Description
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            {property.description || 'No description available.'}
                        </Typography>
                    </Box>
                </Grid>

                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'sticky', top: 100 }}>
                        <ReservationForm property={property} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PropertyDetails;
