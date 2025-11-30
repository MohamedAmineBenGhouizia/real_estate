import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import { NotificationContext } from '../../context/NotificationContext';
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Paper,
    Typography,
    Grid,
    Stack,
    IconButton,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';

const PropertyForm = ({ initialData = {}, isEdit = false }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        address: initialData.address || '',
        price: initialData.price || '',
        type: initialData.type || 'Apartment',
        status: initialData.status || 'available',
    });
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const notify = useContext(NotificationContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImages(prev => [...prev, ...files]);
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index) => {
        setPreviews(prev => prev.filter((_, i) => i !== index));
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        images.forEach(image => data.append('images', image));

        try {
            if (isEdit) {
                await propertyService.update(initialData.id, data);
                notify.success('Property updated successfully');
            } else {
                await propertyService.create(data);
                notify.success('Property created successfully');
            }
            navigate('/admin/properties');
        } catch (error) {
            notify.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                {isEdit ? 'Edit Property' : 'Create New Property'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>$</Typography> }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            select
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="Apartment">Apartment</MenuItem>
                            <MenuItem value="House">House</MenuItem>
                            <MenuItem value="Villa">Villa</MenuItem>
                            <MenuItem value="Commercial">Commercial</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="available">Available</MenuItem>
                            <MenuItem value="sold">Sold</MenuItem>
                            <MenuItem value="rented">Rented</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>Images</Typography>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            sx={{ mb: 2 }}
                        >
                            Upload Images
                            <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
                        </Button>

                        {previews.length > 0 && (
                            <Grid container spacing={2}>
                                {previews.map((src, index) => (
                                    <Grid item key={index}>
                                        <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                                            <img src={src} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                                            <IconButton
                                                size="small"
                                                onClick={() => removeImage(index)}
                                                sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'background.paper', boxShadow: 1, '&:hover': { bgcolor: 'error.light', color: 'white' } }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="outlined" onClick={() => navigate('/admin/properties')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" disabled={loading}>
                                {isEdit ? 'Update Property' : 'Create Property'}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default PropertyForm;
