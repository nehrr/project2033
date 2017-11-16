const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./database/init');

const port = process.argv[2] || 8080;

const app = express();

//Routes
/*
GET /

GET /sign-in
POST /sign-in
GET /sign-up
POST /sign-up
  GET /

  GET /user/id
  GET /user/id/edit
  PUT /user/id
  DELETE /user/id

  GET /user/id/modules
  POST /user/id/modules
  DELETE /user/id/modules/id

  PUT /user/id/update-password

*/
const index = require('./routes/index');

//Set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use('/', index);

// 404
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

db.sequelize.sync().then(() => {
  console.log(`Database config successful`);

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${port}`)
  });
})
.catch((err) => {
  console.error('Unable to connect to the database: ', err)
})
