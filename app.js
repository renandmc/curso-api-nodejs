const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

// conexão db -> mongodb+srv://<username>:<password>@clusterapi-jifra.gcp.mongodb.net/test?retryWrites=true&w=majority

const url = config.bd_string;
// const url = 'mongodb+srv://usuario_admin:renandmc93@clusterapi-jifra.gcp.mongodb.net/test?retryWrites=true&w=majority';
const options = {
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão com o banco de dados' + err);
});
mongoose.connection.on('disconected', () => {
  console.log('Aplicação desconectada do banco de dados!');
});
mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada ao banco de dados!');
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;