const { Pool } = require('pg');

const pool = new Pool({
  user: 'ivangr', 
  host: '138.68.87.73', 
  database: 'db_ivangr',
  password: 'K%t4D5zD',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}

