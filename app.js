const express = require('express');
const ejs = require('ejs')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'hj11018210045',
    password: 'Babo$@123',
    database: 'mytable'
});

connection.connect();
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
app.get('/get-Donors', (req, res) => {
    connection.query('SELECT * FROM Donors', (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

app.get('/details', (req, res) => {
    connection.query('SELECT * FROM Donors', (err, results) => {
      if (err) {
        console.log('Error retrieving data from MySQL database', err);
        return;
      }
      res.render('details', { Donors: results });
    });
  });
  

app.post('/post-Donors', (req,res)=>{
    const Name=req.body.username;
    const EmailAddress=req.body.email;
    const Number=req.body.phone_number;
    const Blood=req.body.blood_group;
    connection.query('INSERT INTO Donors (username,email,phone_number,blood_group) VALUES(?,?,?,?)', [Name,EmailAddress,Number,Blood],(error,result)=>{
        if (error) throw error;

       res.redirect('/')
    })
})

app.listen(3000,()=> console.log("Server started on port 3000"));