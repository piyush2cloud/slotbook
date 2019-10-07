var mysql = require('mysql');
const express = require('express')
const app = express()
var cors = require('cors');
const port = 3000

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sys"
});

con.connect(function(err) {
  console.log("as");
});

app.get('/getTimeBooked', (req, res) => {
      //Select all customers and return the result object:
      con.query("SELECT * FROM slot_booking where userId=1", function (err, result, fields) {
        if (err) throw err;
        console.log(result[0]["userID"]);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ a:  result[0]["timebooked"]}));
      });
})

app.get('/', async(req, res) => {
      console.log(req.query);
      // var bookingId=req.param('bookids');
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ a: req.query}));
      // var cData=req.param('cDate');
      // var cPC=req.param('cPID');
      // var id=req.param('id');

      // console.log(bookingId);
      // console.log(cData);
      // console.log(cPC);
      // console.log(id);

      var sqlQuery = `INSERT INTO slot_booking ("userID","timebooked","datebooked","pcbooked") VALUES (${id.toString()},${bookingId.toString()},${cData.toString()},${cPC.toString()})`;

      // var sql = "UPDATE slot_booking SET timeBooked='" + bookingId.toString() + "' WHERE userID="+1;
      console.log(sqlQuery);
      con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        // console.log(result.affectedRows + " record(s) updated");
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ a: 1}));
      });
})

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO slot_booking (userId,timebooked,datebooked) VALUES ('1', '10,13,14', '20')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  