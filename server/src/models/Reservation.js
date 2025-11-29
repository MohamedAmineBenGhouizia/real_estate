const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Property = require('./Property');

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending'
    }
});

// Associations
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Property.hasMany(Reservation, { foreignKey: 'propertyId' });
Reservation.belongsTo(Property, { foreignKey: 'propertyId' });

module.exports = Reservation;
