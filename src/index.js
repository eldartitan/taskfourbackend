const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
require('./strategies/local');
require('./database');
// Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRETCODE = 'ASDAHDFLSJHFVSHDFKBDFKJBSDKJFBSKDJF';
app.use(
  cors({
    origin: "https://taskfourclient.up.railway.app", // <-- location of the react app were connecting to
    // origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(SECRETCODE));
app.use(
  session({
    secret: SECRETCODE,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://myadmin:root@cluster0.rikqx0b.mongodb.net',
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/test", (req, res) => {
  res.send("it's working.")
})

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));