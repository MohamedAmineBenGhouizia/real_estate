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
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('paid', 'unpaid', 'pending'),
        defaultValue: 'unpaid'
    }
});

// Associations
Reservation.hasOne(Invoice, { foreignKey: 'reservationId' });
Invoice.belongsTo(Reservation, { foreignKey: 'reservationId' });

module.exports = Invoice;
