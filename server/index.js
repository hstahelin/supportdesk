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
    console.log("Request Origin:", origin);
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      // Allow the request

      callback(null, true);
    } else {
      // Reject the request
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  // methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// const corsOptions = {
//   origin: true,
//   credentials: true,
// };

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.REACT_APP_BASE_URL); // Must be the client URL, not '*'
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supportdesk_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Cookies should be sent over HTTPS in production
      httpOnly: true, // Prevents JavaScript access to cookies
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Use "None" in production for cross-site cookies
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
