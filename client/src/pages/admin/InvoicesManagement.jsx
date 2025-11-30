import React, { useState, useEffect, useContext } from 'react';
import invoiceService from '../../services/invoiceService';
import { NotificationContext } from '../../context/NotificationContext';
import { formatPrice } from '../../utils/formatPrice';
import {
    Box,
    Typography,
    Paper,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Stack,
    Chip,
    Tooltip
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const InvoicesManagement = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentInvoice, setCurrentInvoice] = useState(null);
    const notify = useContext(NotificationContext);

    const [formData, setFormData] = useState({
        reservationId: '',
        amount: '',
        status: 'unpaid',
        dueDate: ''
    });

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const data = await invoiceService.getAll();
            setInvoices(data);
        } catch (err) {
            notify.error('Erreur lors du chargement des factures');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleOpenDialog = (invoice = null) => {
        if (invoice) {
            setCurrentInvoice(invoice);
            setFormData({
                reservationId: invoice.reservationId,
                amount: invoice.amount,
                status: invoice.status,
                dueDate: invoice.dueDate ? invoice.dueDate.split('T')[0] : ''
            });
        } else {
            setCurrentInvoice(null);
            setFormData({
                reservationId: '',
                amount: '',
                status: 'unpaid',
                dueDate: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentInvoice(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentInvoice) {
                await invoiceService.update(currentInvoice.id, formData);
                notify.success('Facture mise à jour avec succès');
            } else {
                await invoiceService.create(formData);
                notify.success('Facture créée avec succès');
            }
            fetchInvoices();
            handleCloseDialog();
        } catch (error) {
            notify.error(error.response?.data?.message || 'Échec de l\'opération');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
            try {
                await invoiceService.delete(id);
                notify.success('Facture supprimée avec succès');
                fetchInvoices();
            } catch (error) {
                notify.error('Erreur lors de la suppression');
            }
        }
    };

    const generatePDF = (invoice) => {
        const doc = new jsPDF();
        const tenantName = invoice.Reservation?.User ? `${invoice.Reservation.User.firstName} ${invoice.Reservation.User.lastName}` : 'Inconnu';
        const tenantEmail = invoice.Reservation?.User?.email || 'N/A';

        // Header
        doc.setFontSize(20);
        doc.setTextColor(26, 26, 26);
        doc.text('FACTURE', 105, 20, null, 'center');

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Immobilière`, 20, 30);
        doc.text(`Tunis, Tunisie`, 20, 35);

        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Facture #: ${invoice.id}`, 140, 40);
        doc.text(`Date: ${format(new Date(), 'dd MMM yyyy', { locale: fr })}`, 140, 47);
        doc.text(`Statut: ${invoice.status === 'paid' ? 'PAYÉE' : 'IMPAYÉE'}`, 140, 54);

        // Client Info
        doc.text(`Facturé à:`, 20, 65);
        doc.setFontSize(11);
        doc.text(tenantName, 20, 72);
        doc.text(tenantEmail, 20, 78);

        // Details
        autoTable(doc, {
            startY: 90,
            head: [['Description', 'Montant']],
            body: [
                [`Réservation #${invoice.reservationId}`, `${Number(invoice.amount).toLocaleString()} TND`],
                ['Date d\'échéance', invoice.dueDate ? format(new Date(invoice.dueDate), 'dd MMM yyyy', { locale: fr }) : 'N/A'],
            ],
            theme: 'grid',
            headStyles: { fillColor: [212, 175, 55] }, // Gold color
        });

        // Total
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.text(`Total: ${Number(invoice.amount).toLocaleString()} TND`, 140, finalY);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Merci de votre confiance !', 105, 280, null, 'center');

        doc.save(`facture_${invoice.id}.pdf`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'tenant',
            headerName: 'Locataire',
            width: 200,
            valueGetter: (value, row) => {
                const user = row.Reservation?.User;
                return user ? `${user.firstName} ${user.lastName}` : 'Inconnu';
            }
        },
        { field: 'reservationId', headerName: 'Réf. Rés.', width: 100 },
        {
            field: 'amount',
            headerName: 'Montant',
            width: 120,
            renderCell: (params) => formatPrice(params.value)
        },
        {
            field: 'status',
            headerName: 'Statut',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value === 'paid' ? 'Payée' : params.value === 'unpaid' ? 'Impayée' : 'En attente'}
                    color={params.value === 'paid' ? 'success' : params.value === 'unpaid' ? 'error' : 'warning'}
                    size="small"
                    sx={{ color: 'white' }}
                />
            )
        },
        {
            field: 'dueDate',
            headerName: 'Échéance',
            width: 150,
            valueFormatter: (value) => value ? format(new Date(value), 'dd MMM yyyy', { locale: fr }) : '-'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Modifier">
                        <IconButton size="small" onClick={() => handleOpenDialog(params.row)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Télécharger PDF">
                        <IconButton size="small" color="primary" onClick={() => generatePDF(params.row)}>
                            <PdfIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                        <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: '"Playfair Display", serif' }}>
                    Gestion des Factures
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ color: 'white' }}
                >
                    Créer une Facture
                </Button>
            </Stack>

            <Paper sx={{ height: 600, width: '100%', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <DataGrid
                    rows={invoices}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    checkboxSelection
                    disableSelectionOnClick
                    loading={loading}
                    components={{ Toolbar: GridToolbar }}
                    sx={{ border: 'none' }}
                />
            </Paper>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{currentInvoice ? 'Modifier la Facture' : 'Créer une Facture'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Stack spacing={2}>
                            <TextField
                                label="ID Réservation"
                                type="number"
                                value={formData.reservationId}
                                onChange={(e) => setFormData({ ...formData, reservationId: e.target.value })}
                                fullWidth
                                required
                                disabled={!!currentInvoice}
                            />
                            <TextField
                                label="Montant"
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                fullWidth
                                required
                                InputProps={{ startAdornment: 'TND ' }}
                            />
                            <TextField
                                select
                                label="Statut"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                fullWidth
                            >
                                <MenuItem value="unpaid">Impayée</MenuItem>
                                <MenuItem value="paid">Payée</MenuItem>
                                <MenuItem value="pending">En attente</MenuItem>
                            </TextField>
                            <TextField
                                label="Date d'échéance"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Annuler</Button>
                        <Button type="submit" variant="contained" color="secondary" sx={{ color: 'white' }}>
                            {currentInvoice ? 'Mettre à jour' : 'Créer'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default InvoicesManagement;
