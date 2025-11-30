const { User, sequelize } = require('./src/models');

const seedAdmin = async () => {
    try {
        await sequelize.sync();

        const adminExists = await User.findOne({ where: { email: 'admin@example.com' } });
        if (adminExists) {
            console.log('Admin user already exists.');
            return;
        }

        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'adminpassword123', // Will be hashed by the model hook
            role: 'admin',
        });

        console.log('Admin user created successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: adminpassword123');
    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await sequelize.close();
    }
};

seedAdmin();
