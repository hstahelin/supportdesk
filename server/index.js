const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const ticketsRoutes = require("./routes/tickets-routes");
const usersRoutes = require("./routes/users-routes");

app.use("/tickets", ticketsRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
