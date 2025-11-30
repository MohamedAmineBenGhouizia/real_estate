const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
    try {
        const { type, status, minPrice, maxPrice, bedrooms, bathrooms, minArea, maxArea, hasGarden, hasBalcony } = req.query;
        const where = {};

        if (type) where.type = type;
        if (status) where.status = status;
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price['$gte'] = minPrice;
            if (maxPrice) where.price['$lte'] = maxPrice;
        }
        if (bedrooms) where.bedrooms = { '$gte': bedrooms };
        if (bathrooms) where.bathrooms = { '$gte': bathrooms };
        if (minArea || maxArea) {
            where.area = {};
            if (minArea) where.area['$gte'] = minArea;
            if (maxArea) where.area['$lte'] = maxArea;
        }
        if (hasGarden === 'true') where.hasGarden = true;
        if (hasBalcony === 'true') where.hasBalcony = true;

        const Reservation = require('../models/Reservation');
        const { Op } = require('sequelize');

        const properties = await Property.findAll({
            where,
            include: [{
                model: Reservation,
                required: false,
                where: {
                    status: { [Op.or]: ['confirmed', 'pending'] },
                    endDate: { [Op.gte]: new Date() }
                },
                attributes: ['startDate', 'endDate', 'status']
            }]
        });
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
        const { title, description, address, price, type, status, bedrooms, bathrooms, area, hasGarden, hasBalcony } = req.body;
        let images = [];

        if (req.files) {
            console.log('Files received:', req.files);
            for (const file of req.files) {
                console.log('Processing file:', file.path);
                if (!fs.existsSync(file.path)) {
                    console.error('File does not exist on disk:', file.path);
                    throw new Error(`File not found: ${file.path}`);
                }
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
            images,
            bedrooms,
            bathrooms,
            area,
            hasGarden,
            hasBalcony
        });

        res.status(201).json(property);
    } catch (error) {
        console.error('Error creating property:', error);
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

        const { title, description, address, price, type, status, bedrooms, bathrooms, area, hasGarden, hasBalcony } = req.body;

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
            images,
            bedrooms,
            bathrooms,
            area,
            hasGarden,
            hasBalcony
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

// @desc    Get property availability
// @route   GET /api/properties/:id/availability
// @access  Public
exports.getAvailability = async (req, res) => {
    try {
        const Reservation = require('../models/Reservation');
        const { Op } = require('sequelize');

        const reservations = await Reservation.findAll({
            where: {
                propertyId: req.params.id,
                status: {
                    [Op.or]: ['confirmed', 'pending']
                },
                endDate: {
                    [Op.gte]: new Date() // Only future/current reservations
                }
            },
            attributes: ['startDate', 'endDate']
        });

        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
