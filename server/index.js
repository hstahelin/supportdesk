const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send("SUPPORTDESK");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
