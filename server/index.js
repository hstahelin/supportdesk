require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("./passport");
const cors = require("cors");
const app = express();

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
    console.log("Request Origin: ", origin);
    console.log("Allowed Origins: ", allowedOrigins);

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supportdesk_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Use "None" in production for cross-site cookies
      maxAge: 3600000, // 1 hour
    },
  })
);

// Add this to see session and cookie settings
app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("Cookie settings:", req.cookies);
  next();
});

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

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
