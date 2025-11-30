import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Send } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#1A1A1A', color: 'white', pt: 8, pb: 4, mt: 'auto' }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Brand Column */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, mb: 2, color: '#D4AF37' }}>
                            RealEstate
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#999', mb: 3, maxWidth: 300, lineHeight: 1.8 }}>
                            Discover the epitome of luxury living. We connect discerning clients with the world's most prestigious properties.
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                                <IconButton key={index} sx={{ color: 'white', '&:hover': { color: '#D4AF37' } }}>
                                    <Icon />
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Properties</Typography>
                        <Stack spacing={2}>
                            {['Buy', 'Rent', 'Sell', 'New Developments'].map((item) => (
                                <Link key={item} component={RouterLink} to="/properties" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Company */}
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Company</Typography>
                        <Stack spacing={2}>
                            {['About Us', 'Careers', 'Press', 'Contact'].map((item) => (
                                <Link key={item} href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: '#D4AF37' } }}>
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Newsletter */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Newsletter</Typography>
                        <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
                            Subscribe to receive updates on exclusive listings and market trends.
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                placeholder="Your email address"
                                variant="outlined"
                                size="small"
                                fullWidth
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    input: { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                                        '&:hover fieldset': { borderColor: '#D4AF37' },
                                    }
                                }}
                            />
                            <Button variant="contained" color="secondary" sx={{ minWidth: 50 }}>
                                <Send />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 8, pt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        © {new Date().getFullYear()} RealEstate Luxury Homes. All rights reserved.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                        Developed by MOHAMED AMINE BEN GHOUIZIA
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
