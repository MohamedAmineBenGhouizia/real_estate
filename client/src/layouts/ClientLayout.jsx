import React, { useContext, useState } from 'react';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

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
        { title: 'Home', path: '/', icon: <HomeIcon /> },
        { title: 'Properties', path: '/properties', icon: <BusinessIcon /> },
        { title: 'My Reservations', path: '/my-reservations', icon: <EventIcon /> },
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                RealEstate
            </Typography>
            <Divider />
            <List>
                {navLinks.map((item) => (
                    <ListItem button key={item.title} component={RouterLink} to={item.path}>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
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
                            variant="h6"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'flex' },
                                flexGrow: { xs: 1, md: 0 },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            RealEstate
                        </Typography>

                        {/* Desktop Nav Links */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                            {navLinks.map((item) => (
                                <Button
                                    key={item.title}
                                    component={RouterLink}
                                    to={item.path}
                                    sx={{ my: 2, color: 'text.primary', display: 'block', textTransform: 'none', fontSize: '1rem' }}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </Box>

                        {/* User Menu */}
                        <Box sx={{ flexGrow: 0 }}>
                            {user ? (
                                <>
                                    <Button
                                        onClick={handleMenu}
                                        color="inherit"
                                        startIcon={<Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>{user.name[0]}</Avatar>}
                                        endIcon={<AccountCircle />}
                                        sx={{ textTransform: 'none' }}
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
                                    >
                                        {user.role === 'admin' && (
                                            <MenuItem component={RouterLink} to="/admin" onClick={handleClose}>
                                                <DashboardIcon sx={{ mr: 1 }} /> Dashboard
                                            </MenuItem>
                                        )}
                                        <MenuItem onClick={handleLogout}>
                                            <LogoutIcon sx={{ mr: 1 }} /> Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button component={RouterLink} to="/login" color="primary" variant="outlined">
                                        Login
                                    </Button>
                                    <Button component={RouterLink} to="/register" color="primary" variant="contained">
                                        Register
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

const Footer = () => (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper', borderTop: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <RouterLink color="inherit" to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    RealEstate App
                </RouterLink>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Container>
    </Box>
);

const ClientLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
};

export default ClientLayout;
