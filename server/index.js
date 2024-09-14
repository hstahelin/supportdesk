const express = require("express");
const session = require("express-session");
const passport = require("./passport");
const cors = require("cors");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supportdesk_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 3600000, // 1 hour
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const ticketsRoutes = require("./routes/tickets-routes");
const usersRoutes = require("./routes/users-routes");
const kbRoutes = require("./routes/kb-routes");
const aiRoutes = require("./routes/ai-routes");
const authRoutes = require("./routes/auth-routes");

app.use("/auth", authRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/users", usersRoutes);
app.use("/kb", kbRoutes);
app.use("/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
