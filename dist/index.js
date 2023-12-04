import express from 'express';
const app = express();
app.use(express.json()); // middleware to parse data into JSON
app.post('/hello/:id', (req, res, next) => {
    console.log(req.params.id);
    return res.send('Hello');
});
app.listen(5000, () => console.log('server is running..'));
//# sourceMappingURL=index.js.map