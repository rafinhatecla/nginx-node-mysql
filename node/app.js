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
  db.query("INSERT INTO people(name) value(?);", name);

  db.query("SELECT name FROM people;", (error, results, fields) => {
    if (error) {
      return res.status(500).json({ message: "Application Error." });
    }
    const names = results.map((r) => {
      const name = r.name;
      return name;
    });
    return res.status(200).json(names);
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

function connectionRetry() {
  db = mysql.createConnection(config);

  db.connect(function (err) {
    if (err) {
      setTimeout(connectionRetry, 2000);
      return;
    }

    console.log("connected as mysql");
    startServer();
  });
}

connectionRetry();
