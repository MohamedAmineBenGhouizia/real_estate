import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import {
    People as PeopleIcon,
    HomeWork as PropertyIcon,
    EventNote as ReservationIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography color="text.secondary" gutterBottom variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        bgcolor: `${color}.light`,
                        color: `${color}.main`,
                        p: 1.5,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                Dashboard Overview
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Properties" value="12" icon={<PropertyIcon />} color="primary" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Users" value="25" icon={<PeopleIcon />} color="secondary" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Active Reservations" value="5" icon={<ReservationIcon />} color="success" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Revenue" value="$12,450" icon={<MoneyIcon />} color="warning" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: '400px' }}>
                        <Typography variant="h6" gutterBottom>
                            Revenue Analytics
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary' }}>
                            Chart Placeholder (Install Recharts for real charts)
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: '400px' }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Activity
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary' }}>
                            Activity List Placeholder
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
