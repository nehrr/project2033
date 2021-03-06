const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejsLayout = require('express-ejs-layouts');

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
const user = require('./routes/users')

//Set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(ejsLayout);
app.set('layout', 'layouts/_main');


//Middlewares
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use('/', index);
app.use('/user', user);

// 404
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  //next(err);
  res.render('404');
});

db.sequelize.sync().then(() => {
  console.log(`Database config successful`);

  if (db.module.count()
  .then(modulesNb => {
    if (modulesNb == 0) {
      const moduleJSON = require(path.join(__dirname, 'database', 'modules.json'));

      moduleJSON.modules.forEach(mod => {
        db.module.create(mod)
        .then(module => {
          console.log(`Module ${module.name} added successfully`);
        })
      })
    }

  }))

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${port}`)
  });
})
.catch((err) => {
  console.error('Unable to connect to the database: ', err)
})
