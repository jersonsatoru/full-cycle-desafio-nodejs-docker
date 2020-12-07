const express = require('express');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'mysqlnode',
    user: 'root',
    password: 'root',
    database: 'desafio-nodejs'
});

const createTable = `CREATE TABLE IF NOT EXISTS users(
    id int auto_increment primary key,
    name varchar(255)
)`;

conn.query(createTable);


const app = express();
app.use(express.json());
app.post('/', (request, response) => {
    const { name } = request.body;

    //SQL INJECTION PRONE, I KNOW THAT
    const sql = `INSERT INTO users (name) VALUES ('${name}')`;
    conn.query(sql);
    response.json({"message": "ok"}).status(201);
});

app.get('/', (request, response) => {
    const sql = `SELECT * FROM users`;
    const users = conn.query(sql, (err, result, fields) => {
        return response.json(result).status(200);
    });
    
    return response.status(500);
});

app.listen(3000, () => console.log('Running in 3000'));
