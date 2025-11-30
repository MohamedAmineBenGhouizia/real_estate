const Joi = require('joi');

const authSchemas = {
    register: Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('client', 'admin').default('client'),
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

const propertySchemas = {
    create: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(''),
        price: Joi.number().required(),
        address: Joi.string().required(),
        type: Joi.string().valid('Apartment', 'House', 'Villa', 'Commercial').required(),
        status: Joi.string().valid('available', 'sold', 'rented').default('available'),
    }),
    update: Joi.object({
        title: Joi.string(),
        description: Joi.string().allow(''),
        price: Joi.number(),
        address: Joi.string(),
        type: Joi.string().valid('Apartment', 'House', 'Villa', 'Commercial'),
        status: Joi.string().valid('available', 'sold', 'rented'),
    }),
};

const reservationSchemas = {
    create: Joi.object({
        propertyId: Joi.number().integer().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    }),
    updateStatus: Joi.object({
        status: Joi.string().valid('pending', 'confirmed', 'cancelled').required(),
    }),
};

module.exports = {
    authSchemas,
    propertySchemas,
    reservationSchemas,
};
