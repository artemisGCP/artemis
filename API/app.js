const express = require("express");
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());
app.get("/annotate", (req, res) => {
  // console.log(req.body);
  res.send("good");
});

app.post("/annotate", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
app.listen(port, () => console.log("listening 8080"));

