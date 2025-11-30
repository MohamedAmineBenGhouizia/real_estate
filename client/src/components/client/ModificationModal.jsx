import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';

const ModificationModal = ({ open, onClose, onSubmit, reservation }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        if (!startDate || !endDate || !reason) return;
        onSubmit(reservation.id, { startDate, endDate, reason });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Modifier la réservation</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Veuillez sélectionner les nouvelles dates souhaitées et indiquer la raison de la modification.
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <DatePicker
                                label="Nouvelle date d'arrivée"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                slotProps={{ textField: { fullWidth: true } }}
                                disablePast
                            />
                            <DatePicker
                                label="Nouvelle date de départ"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                slotProps={{ textField: { fullWidth: true } }}
                                disablePast
                                minDate={startDate}
                            />
                        </Stack>
                    </LocalizationProvider>

                    <TextField
                        label="Raison de la modification"
                        multiline
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        fullWidth
                        required
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Annuler</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="secondary"
                    disabled={!startDate || !endDate || !reason}
                    sx={{ color: 'white' }}
                >
                    Envoyer la demande
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModificationModal;
