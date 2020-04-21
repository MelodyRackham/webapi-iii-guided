const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// CUSTOM MIDDLEWARE!
//write a gatekeeper middleware that reads a password from the headers and if the password is "mellon", let it continue
// if not, send back status code 401 and a message. Use it for the /area51 endpoint

function gateKeeper(req, res, next) {
  const password = req.headers.password;
  if (password && password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(401).json({ you: 'shall not pass!!' });
  }
}
// built in middleware
server.use(express.json()); // this is middleware and it parses the body for us!

// third party middleware
server.use(helmet());

// router
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get('./area51', helmet(), (req, res) => {
  res.send(req.headers);
});

module.exports = server;
