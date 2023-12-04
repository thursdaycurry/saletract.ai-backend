import { connect, disconnect } from 'mongoose';
export default async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error('MongoDB Connection Failure');
    }
}
// If serious problem happens to app, disconnect DB with this for security
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error('MongoDB Dis-connection Failure');
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map