const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'roor',
  password: 'password',
  database: 'sys'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});