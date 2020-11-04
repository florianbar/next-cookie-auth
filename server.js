const next = require('next');
const express = require('express');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

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