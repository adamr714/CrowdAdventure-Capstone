const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRouter = require('./userRouter');
const adventureRouter = require('./adventureRouter');
const joinRouter = require('./joinRouter');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/adventures', adventureRouter);
app.use('/join', joinRouter);
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
