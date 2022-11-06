
const mysql = require('mysql');

let connection;

module.exports = {
    dbConnection: function () {
        connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            port: 3306,
            multipleStatements: true

        });

        connection.connect();
        return connection;
    }
};