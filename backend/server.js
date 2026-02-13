require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./models');
const apiRoutes = require('./routes/');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('re-sync db.');
    app.listen(PORT, () => {
      console.log(`Everything is ok! server on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
