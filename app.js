const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const prakritiRoutes = require('./routes/prakriti');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ayurbot');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Template variables middleware
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    res.locals.user = req.session.user;
    next();
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRouter);
app.use('/', authRoutes);
app.use('/', prakritiRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
