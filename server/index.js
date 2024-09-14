const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("./passport");
const cors = require("cors");
const app = express();
require("dotenv").config();

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_LOCAL_USER,
  password: process.env.DB_LOCAL_PASSWORD,
  database: process.env.DB_LOCAL_DBNAME,
};

const sessionStore = new MySQLStore(options);

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Parse CORS_ORIGINS into an array
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      // Allow the request

      callback(null, true);
    } else {
      // Reject the request
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// const corsOptions = {
//   origin: true,
//   credentials: true,
// };

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supportdesk_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      secure: false, // Use secure cookies in production
      httpOnly: true, // Prevents JavaScript access to cookies
      sameSite: "lax", // Provides some protection against CSRF
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
