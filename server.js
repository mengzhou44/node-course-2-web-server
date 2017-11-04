const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  res.render('maintenance');
});

app.use((req, res, next) => {
  const date = new Date().toString();
  var log = `${date}: ${req.method}  ${req.url}`;

  console.log(log);
  fs.appendFile('./server.log', log + '\n', err => {
    if (err) {
      throw err;
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to Express!',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    currentYear: new Date().getFullYear()
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
