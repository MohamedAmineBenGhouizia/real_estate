import React, { useContext, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
    useMediaQuery,
    Stack
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    Dashboard as DashboardIcon,
    ExitToApp as LogoutIcon,
    Home as HomeIcon,
    Business as BusinessIcon,
    EventNote as EventIcon,
} from '@mui/icons-material';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate('/login');
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navLinks = [
        { title: 'Accueil', path: '/', icon: <HomeIcon /> },
        { title: 'Propriétés', path: '/properties', icon: <BusinessIcon /> },
        { title: 'Mes Réservations', path: '/my-reservations', icon: <EventIcon /> },
    ];

    const isHomePage = location.pathname === '/';

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', bgcolor: 'background.default' }}>
            <Typography variant="h5" sx={{ my: 4, fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
                RealEstate
            </Typography>
            <List>
                {navLinks.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path} sx={{ py: 2 }}>
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    align: 'center',
                                    fontWeight: 500,
                                    fontFamily: '"Inter", sans-serif'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar
            position="fixed"
            elevation={scrolled ? 4 : 0}
            sx={{
                bgcolor: scrolled || !isHomePage ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: scrolled || !isHomePage ? 'blur(10px)' : 'none',
                color: scrolled || !isHomePage ? 'text.primary' : 'white',
                transition: 'all 0.3s ease',
                borderBottom: scrolled || !isHomePage ? '1px solid rgba(0,0,0,0.05)' : 'none',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: 80 }}>
                    {/* Mobile Menu Icon */}
                    {isMobile && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Logo */}
                    <Typography
                        variant="h4"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex' },
                            flexGrow: { xs: 1, md: 0 },
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RealEstate
                    </Typography>

                    {/* Desktop Nav Links */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4 }}>
                        {navLinks.map((item) => (
                            <Button
                                key={item.title}
                                component={RouterLink}
                                to={item.path}
                                sx={{
                                    my: 2,
                                    color: 'inherit',
                                    display: 'block',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '0%',
                                        height: '2px',
                                        bottom: 0,
                                        left: 0,
                                        backgroundColor: '#D4AF37',
                                        transition: 'width 0.3s ease'
                                    },
                                    '&:hover::after': {
                                        width: '100%'
                                    }
                                }}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </Box>

                    {/* Right Side Actions */}
                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
                        {user ? (
                            <>
                                <Button
                                    onClick={handleMenu}
                                    color="inherit"
                                    startIcon={
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                bgcolor: 'secondary.main',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {user.name[0]}
                                        </Avatar>
                                    }
                                    endIcon={<AccountCircle />}
                                    sx={{ textTransform: 'none', fontWeight: 600 }}
                                >
                                    <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }}>
                                        {user.name}
                                    </Typography>
                                </Button>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                        },
                                    }}
                                >
                                    {user.role === 'admin' && (
                                        <MenuItem component={RouterLink} to="/admin" onClick={handleClose}>
                                            <DashboardIcon sx={{ mr: 1, color: 'secondary.main' }} /> Tableau de bord
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon sx={{ mr: 1, color: 'error.main' }} /> Déconnexion
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Stack direction="row" spacing={2}>
                                <Button
                                    component={RouterLink}
                                    to="/login"
                                    color="inherit"
                                    variant="text"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Connexion
                                </Button>
                                <Button
                                    component={RouterLink}
                                    to="/register"
                                    color="secondary"
                                    variant="contained"
                                    sx={{
                                        color: 'white',
                                        px: 3,
                                        boxShadow: '0 4px 14px 0 rgba(212, 175, 55, 0.39)'
                                    }}
                                >
                                    S'inscrire
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Toolbar>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
