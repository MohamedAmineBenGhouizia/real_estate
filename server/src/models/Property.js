const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Property = sequelize.define('Property', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'sold', 'rented'),
        defaultValue: 'available'
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL supports arrays
        defaultValue: []
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    area: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    hasGarden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hasBalcony: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Property;
