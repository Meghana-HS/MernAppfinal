const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
    { name: "Mobile", price: 10000 },
    { name: "TV", price: 20000 },
    { name: "Laptop", price: 45000 },
    { name: "Headphones", price: 1500 },
    { name: "Smartwatch", price: 7000 },
    { name: "Camera", price: 25000 },
    { name: "Tablet", price: 18000 },
    { name: "Speaker", price: 3000 },
    { name: "Keyboard", price: 1200 },
    { name: "Mouse", price: 800 },
    { name: "Refrigerator", price: 35000 },
    { name: "Microwave", price: 8000 },
    { name: "Air Conditioner", price: 40000 },
    { name: "Washing Machine", price: 22000 },
    { name: "Router", price: 2500 }
]);


});

module.exports = router;