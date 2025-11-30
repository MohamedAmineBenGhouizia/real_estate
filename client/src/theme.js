import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1A1A1A', // Deep Charcoal
            light: '#2C2C2C',
            dark: '#000000',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#D4AF37', // Elegant Gold
            light: '#F4CF57',
            dark: '#A4841D',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F8F8F8', // Soft Gray
            paper: '#ffffff',
        },
        text: {
            primary: '#2C2C2C',
            secondary: '#757575',
        },
        error: {
            main: '#d32f2f',
        },
        success: {
            main: '#2e7d32',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: '3.5rem', // 56px
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: '2.5rem', // 40px
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: '2rem', // 32px
            lineHeight: 1.3,
        },
        h4: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: '1.5rem', // 24px
            lineHeight: 1.4,
        },
        h5: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 500,
            fontSize: '1.25rem', // 20px
            lineHeight: 1.4,
        },
        h6: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1rem', // 16px
            lineHeight: 1.5,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        body1: {
            fontFamily: '"Inter", sans-serif',
            fontSize: '1rem', // 16px
            lineHeight: 1.6,
        },
        body2: {
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem', // 14px
            lineHeight: 1.6,
        },
        button: {
            fontFamily: '"Inter", sans-serif',
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.02em',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '12px 24px',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#1A1A1A',
                    '&:hover': {
                        backgroundColor: '#333333',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#D4AF37',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#B8941F',
                    },
                },
                outlined: {
                    borderWidth: '1px',
                    '&:hover': {
                        borderWidth: '1px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
                    border: 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#D4AF37',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
                colorPrimary: {
                    backgroundColor: '#1A1A1A',
                },
                colorSecondary: {
                    backgroundColor: '#D4AF37',
                    color: '#fff',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    color: '#1A1A1A',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                },
            },
        },
    },
});

export default theme;
