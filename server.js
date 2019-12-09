const express = require('express');
const connectDB = require('./config/db')

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extends: false}))

const port = process.env.PORT || 5000;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });


app.use('/api/pbquotes', require('./routes/pbQuotes'))
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quotes', require('./routes/quotes'));
// app.use('/api/comlik', require('./routes/comLik'));




app.listen(port, () => console.log(`server ready in ${port}`))