const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: './.env' })

const app = express()

//connecting to database
const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

//checking connection with database
database.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Database connected, yey!!');
  }
})

//Setting path for html/css/js
const publicDirectory = path.join(__dirname, './public') // __dirname = current directory, './public' = html/css/js folder
//setting path in express
app.use(express.static(publicDirectory))

//to get data from http request
app.use(express.urlencoded({extended:false}))
//To get request in json formate
app.use(express.json())

//setting up view engine
app.set('view engine', 'hbs')

//define routes
app.use('/',require('./routes/pages'))
app.use('/auth',require('./routes/auth'))

// making app listen on port 5001
app.listen(5001, () => {
  console.log("Servers running on localhost:5001");
})