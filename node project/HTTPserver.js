const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Serve the HTML file from the parent directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html')); // Absolute path to index.html in the parent directory
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'analnijmonstr@@gmail.com',
            pass: '*************'
        }
    });

    const mailOptions = {
        from: email,
        to: 'y.otrokh@student.sumdu.edu.ua',
        subject: `Message from ${name}: ${subject}`,
        text: message
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
