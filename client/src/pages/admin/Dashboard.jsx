import React, { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Skeleton
} from '@mui/material';
import {
    People as PeopleIcon,
    HomeWork as PropertyIcon,
    EventNote as ReservationIcon,
    AttachMoney as MoneyIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import adminService from '../../services/adminService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatPrice } from '../../utils/formatPrice';

const StatCard = ({ title, value, icon, color, loading }) => (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography color="text.secondary" gutterBottom variant="overline" fontWeight="bold">
                        {title}
                    </Typography>
                    {loading ? (
                        <Skeleton variant="text" width={60} height={40} />
                    ) : (
                        <Typography variant="h4" fontWeight="bold" sx={{ color: '#1A1A1A' }}>
                            {value}
                        </Typography>
                    )}
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
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                >
                    {icon}
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Mock data for chart since we don't have historical revenue endpoint yet
    const chartData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Fév', revenue: 3000 },
        { name: 'Mar', revenue: 2000 },
        { name: 'Avr', revenue: 2780 },
        { name: 'Mai', revenue: 1890 },
        { name: 'Juin', revenue: 2390 },
        { name: 'Juil', revenue: 3490 },
    ];

    return (
        <Box sx={{ pb: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, fontFamily: '"Playfair Display", serif', color: '#1A1A1A' }}>
                Tableau de Bord
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Propriétés"
                        value={stats?.totalProperties || 0}
                        icon={<PropertyIcon />}
                        color="primary"
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Utilisateurs"
                        value={stats?.totalUsers || 0}
                        icon={<PeopleIcon />}
                        color="secondary"
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Réservations Actives"
                        value={stats?.activeReservations || 0}
                        icon={<ReservationIcon />}
                        color="success"
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Revenu Total"
                        value={stats?.totalRevenue ? formatPrice(stats.totalRevenue) : formatPrice(0)}
                        icon={<MoneyIcon />}
                        color="warning"
                        loading={loading}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: '450px', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Analyses des Revenus
                        </Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value) => [`${value} TND`, 'Revenu']}
                                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: '450px', overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Activité Récente
                        </Typography>
                        <Box sx={{ overflowY: 'auto', flexGrow: 1, pr: 1 }}>
                            {loading ? (
                                <Stack spacing={2}>
                                    <Skeleton variant="rectangular" height={60} borderRadius={2} />
                                    <Skeleton variant="rectangular" height={60} borderRadius={2} />
                                    <Skeleton variant="rectangular" height={60} borderRadius={2} />
                                </Stack>
                            ) : (
                                <List>
                                    {stats?.recentActivity?.length > 0 ? (
                                        stats.recentActivity.map((activity, index) => (
                                            <React.Fragment key={activity.id}>
                                                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                                                    <ListItemAvatar>
                                                        <Avatar sx={{ bgcolor: '#D4AF37' }}>
                                                            <PersonIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                {activity.User ? `${activity.User.firstName} ${activity.User.lastName}` : 'Utilisateur Inconnu'}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                    display="block"
                                                                >
                                                                    A réservé {activity.Property?.title}
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {format(new Date(activity.createdAt), 'dd MMM, HH:mm', { locale: fr })}
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                {index < stats.recentActivity.length - 1 && <Divider variant="inset" component="li" sx={{ ml: 7 }} />}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <Typography color="text.secondary">
                                                Aucune activité récente
                                            </Typography>
                                        </Box>
                                    )}
                                </List>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
