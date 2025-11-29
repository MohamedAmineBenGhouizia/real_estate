const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Reservation = require('./Reservation');

const Invoice = sequelize.define('Invoice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    issuedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('paid', 'unpaid'),
        defaultValue: 'unpaid'
    }
});

// Associations
Reservation.hasOne(Invoice, { foreignKey: 'reservationId' });
Invoice.belongsTo(Reservation, { foreignKey: 'reservationId' });

module.exports = Invoice;
