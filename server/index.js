require("dotenv").config();
const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT | 3010;

app.use(cors());

const tempData = [
  ["AAPL", "Apple Computer"],
  ["TSLA", "Tesla Inc."],
  ["PG", "Procter & Gamble Company, The"],
  ["IBM", "International Business Machines Corporation"],
  ["APDN", "Applied DNA Sciences, Inc."],
];

app.get("/", (req, res) => {
  res.send("version 0.0");
});

app.get("/data", (req, res) => {
  const data = tempData
    .map((item) => ({ symbol: item[0], name: item[1] }))
    .sort((a, b) => {
      if (a.symbol > b.symbol) return 1;
      if (a.symbol < b.symbol) return -1;
      return 0;
    });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
