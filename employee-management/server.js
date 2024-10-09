const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');



const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname))); // Ensure to create a public directory
// Middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',         // replace with your PostgreSQL username
    host: 'localhost',
    database: 'postgres', // replace with your database name
    password: 'qw010877', // replace with your PostgreSQL password
    port: 5432,
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve your HTML file
});
// Get list of employees
app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "SCOTT"."emp"');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add new employee
app.post('/employees', async (req, res) => {
    const { empno, ename, job, mgr, hiredate, sal, comm, deptno } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "SCOTT"."emp" (empno, ename, job, mgr, hiredate, sal, comm, deptno) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [empno, ename, job, mgr, hiredate, sal, comm, deptno]
        );
        res.status(201).send('Employee added successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update employee
app.put('/employees/:empno', async (req, res) => {
    const { empno } = req.params;
    const { ename, job, mgr, hiredate, sal, comm, deptno } = req.body;
    try {
        await pool.query(
            'UPDATE "SCOTT"."emp" SET ename = $1, job = $2, mgr = $3, hiredate = $4, sal = $5, comm = $6, deptno = $7 WHERE empno = $8',
            [ename, job, mgr, hiredate, sal, comm, deptno, empno]
        );
        res.send('Employee updated successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete employee
app.delete('/employees/:empno', async (req, res) => {
    const { empno } = req.params;
    try {
        await pool.query('DELETE FROM "SCOTT"."emp" WHERE empno = $1', [empno]);
        res.send('Employee deleted successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
