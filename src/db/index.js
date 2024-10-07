import mongoose from 'mongoose';

export async function connect() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL environment variable is not defined");
        }

        const connection = await mongoose.connect(process.env.MONGO_URL);

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
