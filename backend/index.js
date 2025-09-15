const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
const allowedOrigins = ["http://localhost:3000", "http://localhost:3006"];

app.use(cors({
    origin: 'https://mern-appfinal-i1as.vercel.app', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // if using cookies or authentication headers
}));


app.use(express.json());

// your routes
app.use('/auth', require('./routes/auth'));






// app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(process.env.PORT || 8080, () => {
    console.log('Server running...');
})
