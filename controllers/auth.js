const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

// exporting controller for /auth/register
exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body

  database.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.render('register', {
        message: "email is already in use"
      })
    } else if (password !== passwordConfirm) {
      return res.render('register', {
        message: 'Password is not matching try again'
      })
    }

    let hashedPassword = await bcrypt.hash(password, 8)
    console.log("hashedPassword:" + hashedPassword);

    database.query(`INSERT INTO users SET ?`,{name:name,email:email,password:hashedPassword},(error,results)=>{
      if (error){
        console.log(error);
      }else {
        console.log(results);
        return res.render("register",{
          message:'User registered'
        })
      }
    })

  })
}