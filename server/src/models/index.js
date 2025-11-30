const sequelize = require('../config/db');
const User = require('./User');
const Property = require('./Property');
const Reservation = require('./Reservation');
const Invoice = require('./Invoice');

// Associations
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Property.hasMany(Reservation, { foreignKey: 'propertyId' });
Reservation.belongsTo(Property, { foreignKey: 'propertyId' });

Reservation.hasOne(Invoice, { foreignKey: 'reservationId' });
Invoice.belongsTo(Reservation, { foreignKey: 'reservationId' });

module.exports = {
    sequelize,
    User,
    Property,
    Reservation,
    Invoice,
};
