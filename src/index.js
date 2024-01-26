const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config.json');
const loadRoutes = require('./utils/router');
const message = require('./handler/message');

const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.disable('x-powered-by');

loadRoutes(app, path.join(__dirname, 'routes')).then(() => {
  app.listen(config.api.port, config.api.hostname, () => {
    message.success(`Server started on ${config.api.hostname}:${config.api.port}`);
  });
}).catch(err => {
  console.error('Error while loading routes:', err);
});
