const next = require('next');
const express = require('express');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(express.json());

    server.post("/api/login", (req, res) => {
        const { email, password } = req.body;
        res.json({
            email,
            password,
            success: true
        });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, error => {
        if (error) {
            throw error;
        }
        console.log(`Listening on PORT ${port}`);
    });
});