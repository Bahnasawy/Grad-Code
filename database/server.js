const server = require("./app");
require("dotenv").config();

const { PORT = 3000 } = process.env;

server.listen(PORT, () => {
  console.log(`Postgraphile server listening on port ${PORT}!`);
});

module.exports = server;
