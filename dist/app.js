import express from 'express';
import { config } from 'dotenv';
config();
const app = express();
app.use(express.json()); // middleware: to parse data into JSON
export default app;
//# sourceMappingURL=app.js.map