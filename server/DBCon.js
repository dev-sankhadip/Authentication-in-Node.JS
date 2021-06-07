const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    user:'root',
    password:'root',
    database:'auth'
})

module.exports={
    connection
}