const arango = require("arangojs");
const DB = new arango.Database();

DB.createDatabase("test")
  .then(() => console.log("created test database"))
  .catch(() => console.log("unable to create test database"));
