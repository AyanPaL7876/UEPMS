// Correct version of dbConnect.js

import mongoose from 'mongoose';

export async function connect() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('connected', () => {
            console.log('DB connected successfully');
        });

        mongoose.connection.on('error', (error) => {
            console.log('DB connection error:', error);
            process.exit();
        });

    } catch (e) {
        console.log('DB connection error:', e);
        process.exit();
    }
}
