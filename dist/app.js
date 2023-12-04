import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
config();
const app = express();
// Middlewares
app.use(express.json()); // to parse data into JSON
app.use(morgan('dev')); // logger. Remove in production
app.use('/api/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map