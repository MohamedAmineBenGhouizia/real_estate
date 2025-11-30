import React, { useState, useEffect } from 'react';
import invoiceService from '../../services/invoiceService';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';

const InvoicesManagement = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const data = await invoiceService.getAll();
                setInvoices(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                Invoices
            </Typography>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Reservation ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((inv) => (
                            <TableRow key={inv.id}>
                                <TableCell>#{inv.id}</TableCell>
                                <TableCell>#{inv.reservationId}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>${inv.amount?.toLocaleString()}</TableCell>
                                <TableCell>{new Date(inv.issuedDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={inv.status}
                                        color={inv.status === 'paid' ? 'success' : 'warning'}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default InvoicesManagement;
