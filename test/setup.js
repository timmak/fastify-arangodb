const arango = require("arangojs");
const DB = new arango.Database();

DB.useBasicAuth("root", "root");
DB.createDatabase("test")
  .then(() => console.log("created test database"))
  .catch(() => console.log("unable to create test database"));
