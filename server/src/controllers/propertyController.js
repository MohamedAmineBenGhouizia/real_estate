const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
    try {
        const { type, status, minPrice, maxPrice } = req.query;
        const where = {};

        if (type) where.type = type;
        if (status) where.status = status;
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price['$gte'] = minPrice;
            if (maxPrice) where.price['$lte'] = maxPrice;
        }

        const properties = await Property.findAll({ where });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Admin
exports.createProperty = async (req, res) => {
    try {
        const { title, description, address, price, type, status } = req.body;
        let images = [];

        if (req.files) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'real-estate-app'
                });
                images.push(result.secure_url);
                // Remove file from local uploads folder
                fs.unlinkSync(file.path);
            }
        }

        const property = await Property.create({
            title,
            description,
            address,
            price,
            type,
            status,
            images
        });

        res.status(201).json(property);
    } catch (error) {
        // Clean up files if error occurs
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const { title, description, address, price, type, status } = req.body;

        // Handle new images if uploaded (optional: append or replace logic)
        // For simplicity, let's say we append new images if any
        let images = property.images || [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'real-estate-app'
                });
                images.push(result.secure_url);
                fs.unlinkSync(file.path);
            }
        }

        await property.update({
            title,
            description,
            address,
            price,
            type,
            status,
            images
        });

        res.json(property);
    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        await property.destroy();
        res.json({ message: 'Property removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
