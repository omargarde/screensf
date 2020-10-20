const { Client } = require('pg');
// const { proxy } = require('../keys');
// const { local } = require('../keys');
// const client = new Client(proxy);
// const client = new Client(local);

const client = new Client({
  host: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

module.exports = {
  client,
};
