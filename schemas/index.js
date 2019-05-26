const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb+srv://${MONGO_ID}:${MONGO_PASSWORD}@cluster0-a2ure.mongodb.net/test?retryWrites=true`;

module.exports = () => {
  const connect = () => {
    (NODE_ENV  !== 'production') && mongoose.set('debug', true);
    mongoose.connect(MONGO_URL, {
      dbName: 'nodeplace',
      useCreateIndex: true,
      useNewUrlParser: true
    }, (error) => {
      (error) ? console.log('몽고디비 연결 에러', error) : console.log('몽고디비 연결 성공');
    });
  };
  connect();

  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러: ', error);
  })

  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결 재시도합니다.');
    connect();
  });

  require('./favorite');
  require('./history');
};