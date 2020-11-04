const next = require('next');
const express = require('express');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev: isDev });

app.prepare().then(() => {
    const server = express();

    server.listen(port, error => {
        if (error) {
            throw error;
        }
        console.log(`Listening on PORT ${port}`);
    });
});