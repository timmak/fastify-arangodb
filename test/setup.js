const arango = require("arangojs");
const DB = new arango.Database({
  url: "http://127.0.0.1:8529"
});

DB.useBasicAuth("root", "root");
DB.createDatabase("test")
  .then(() => console.log("created test database"))
  .catch(() => console.log("unable to create test database"));
