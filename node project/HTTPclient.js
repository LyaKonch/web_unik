const http = require('http');

// Опції для GET-запиту
const getOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
};

// Опції для POST-запиту
const postOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify({ message: 'Hello, Server!' }))
    }
};

// Створення POST-запиту
const postReq = http.request(postOptions, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('POST response:', data);
    });
});

// Надсилання даних у POST-запиті
postReq.write(JSON.stringify({ message: 'Hello, Server!' }));
postReq.end();

// Створення GET-запиту
const getReq = http.request(getOptions, (res) => {
    let data = '';
    
    // Отримання даних з відповіді
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    // Коли відповідь отримана повністю
    res.on('end', () => {
        console.log('GET response:', data);
    });
});

// Надсилання GET-запиту
getReq.end();
