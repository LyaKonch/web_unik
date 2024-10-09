const http = require('http');
const fs = require('fs');
const path = require('path');



// Створення HTTP сервера
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    // Обробка URL шляхів
    if (req.url === '/') {
        res.statusCode = 200;
        const filePath = path.join(`../`, 'index.html');
        
        // Читаємо файл
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data); // Відправляємо HTML-сторінку
            }
        });
    } else if (req.url === '/style.css') {
        const cssPath = path.join( `../`, 'style.css');
        
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('CSS file not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data); // Send CSS file
            }
        });
    } else if (req.url === '/index.js') {
        const cssPath = path.join( `../`, 'index.js');
        
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Javascript file not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data); 
            }
        });
    }else if (req.url === '/about') {
        res.statusCode = 200;
        const filePath = path.join(`../`, 'loginform.html');
        
        // Читаємо файл
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data); // Відправляємо HTML-сторінку
            }
        });
        
    } else if (req.url === '/contact') {
        res.statusCode = 200;
        res.end('Contact page');
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

// Сервер слухає на порту 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
