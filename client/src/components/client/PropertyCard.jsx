import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Stack,
    IconButton,
    Divider,
} from '@mui/material';
import {
    LocationOnOutlined as LocationIcon,
    BedOutlined as BedIcon,
    BathtubOutlined as BathIcon,
    SquareFootOutlined as SquareFootIcon,
    FavoriteBorder as FavoriteIcon,
    Favorite as FavoriteFilledIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
    const [isFavorite, setIsFavorite] = React.useState(false);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    return (
        <Card
            component={motion.div}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: 'none',
                '&:hover .MuiCardMedia-root': {
                    transform: 'scale(1.05)',
                },
                '&:hover .overlay': {
                    opacity: 1,
                },
            }}
        >
            {/* 16:9 Aspect Ratio Container */}
            <Box sx={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
                <CardMedia
                    component="img"
                    image={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-27bfefd0c3c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={property.title}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                    }}
                />

                {/* Dark Overlay on Hover */}
                <Box
                    className="overlay"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0,0,0,0.2)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                    }}
                />

                {/* Status Badge */}
                <Chip
                    label={property.status === 'available' ? 'Disponible' : 'Réservé'}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: '#D4AF37',
                        color: 'white',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: { xs: '0.65rem', md: '0.75rem' },
                        borderRadius: 1,
                    }}
                />

                {/* Favorite Button */}
                <IconButton
                    onClick={toggleFavorite}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': { bgcolor: 'white' },
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 },
                    }}
                >
                    {isFavorite ? <FavoriteFilledIcon color="error" sx={{ fontSize: { xs: 18, md: 24 } }} /> : <FavoriteIcon sx={{ fontSize: { xs: 18, md: 24 } }} />}
                </IconButton>

                {/* Price Tag */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        bgcolor: 'rgba(26, 26, 26, 0.9)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        {formatPrice(property.price)}
                    </Typography>
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                <Link to={`/properties/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            '&:hover': { color: '#D4AF37' },
                            transition: 'color 0.2s'
                        }}
                    >
                        {property.title}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, color: 'text.secondary' }}>
                    <LocationIcon fontSize="small" sx={{ color: '#D4AF37', fontSize: { xs: 16, md: 20 } }} />
                    <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                        {property.address}
                    </Typography>
                </Stack>

                <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.05)' }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <BedIcon fontSize="small" color="action" sx={{ fontSize: { xs: 18, md: 24 } }} />
                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>{property.bedrooms} Ch</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <BathIcon fontSize="small" color="action" sx={{ fontSize: { xs: 18, md: 24 } }} />
                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>{property.bathrooms} SDB</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <SquareFootIcon fontSize="small" color="action" sx={{ fontSize: { xs: 18, md: 24 } }} />
                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>{property.area} m²</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;
