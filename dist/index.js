import app from './app.js';
import connectToDatabase from './db/connection.js';
// App listening and DB connection
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log(`Server runs on port ${PORT} and Database connected`));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map