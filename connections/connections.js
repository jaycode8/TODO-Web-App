const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

let conn = mysql.createConnection({
    user : process.env.USERNAME,
    host : process.env.HOST,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

conn.connect(err =>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connected successfully to the db');
    };
});

module.exports = conn;