import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Stack,
    IconButton,
    CardActionArea,
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    Bed as BedIcon,
    Bathtub as BathIcon,
    SquareFoot as SquareFootIcon,
    FavoriteBorder as FavoriteIcon,
} from '@mui/icons-material';

const PropertyCard = ({ property }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <CardActionArea component={Link} to={`/properties/${property.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={property.title}
                    />
                    <Chip
                        label={property.status}
                        color={property.status === 'available' ? 'success' : 'warning'}
                        size="small"
                        sx={{ position: 'absolute', top: 10, left: 10, textTransform: 'capitalize' }}
                    />
                    <Chip
                        label={property.type}
                        color="primary"
                        size="small"
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                            color: 'white',
                            p: 1,
                        }}
                    >
                        <Typography variant="h6" component="div" fontWeight="bold">
                            ${property.price?.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>

                <CardContent sx={{ width: '100%', flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                        {property.title}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2, color: 'text.secondary' }}>
                        <LocationIcon fontSize="small" />
                        <Typography variant="body2" noWrap>
                            {property.address}
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 1 }} />

                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ color: 'text.secondary' }}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <BedIcon fontSize="small" />
                            <Typography variant="caption">3 Beds</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <BathIcon fontSize="small" />
                            <Typography variant="caption">2 Baths</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <SquareFootIcon fontSize="small" />
                            <Typography variant="caption">120 m²</Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>

            {/* Optional: Add Favorite Button or Actions here if needed outside the link */}
            {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions> */}
        </Card>
    );
};

// Helper for Divider since I forgot to import it
import Divider from '@mui/material/Divider';

export default PropertyCard;
