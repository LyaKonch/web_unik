const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

https.createServer(options, (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end('<h1>Secure Connection Established</h1>');
}).listen(3001, () => {
    console.log('HTTPS server running on https://localhost:3001');
});