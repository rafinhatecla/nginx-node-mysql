const http = require("http");
const express = require("express");
const mysql = require("mysql");
const faker = require("@faker-js/faker").faker;

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const config = {
  host: "mysql",
  user: "nodeuser",
  password: "nodepwd",
  database: "nodedb",
};

const app = express();

let db = undefined;

app.get("/", (_, res) => {
  const name = faker.name.fullName();
  db.query("INSERT INTO people(name) values(?);", name);

  db.query("SELECT name FROM people;", (error, results, fields) => {
    if (error) {
      return res.status(500).json({ message: "Application Error." });
    }
    const names = results.map((r) => {
      const name = r.name;
      return `<li>${name}</li>`;
    });

    const content = `<h1>Full Cycle Rocks!</h1><ul>${names.join(" ")}</ul>`;

    return res.status(200).send(content);
  });
});

app.get("/healthz", (_, res) => {
  db.query("SELECT 1+1;", (error, _results, _fields) => {
    if (error) {
      return res.status(500).json({ message: "Not ready" });
    }
    return res.status(200).json({ message: "Ready" });
  });
});

function startServer() {
  const server = http.createServer(app).listen(PORT, HOST, false, () => {
    console.log(`Server listening on http://${HOST}:${PORT}"`);
    server.on("close", () => {
      connection.end();
    });
  });
}

db = mysql.createConnection(config);

db.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("connected as mysql");
  startServer();
});
