const pool = require('../config/database');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Connection error', err);
    } else {
        console.log('Connection successful:', res.rows[0]);
    }
    pool.end();
});
