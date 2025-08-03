const express = require('express');
const path = require('path');
const app = express();

// Serve static folders with proper capitalization
app.use('/IMAGES', express.static(path.join(__dirname, 'IMAGES')));
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/JAVASCRIPT', express.static(path.join(__dirname, 'JAVASCRIPT')));

// serve HTML_PAGES static for gettingt direct URL access
app.use(express.static(path.join(__dirname, 'HTML_PAGES')));

// Routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'Home.html'));
});

// if user didn't log in
app.get('/adopt', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'AdoptAPet.html'));
});

// if user log in
app.get('/adopt/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'AdoptAPet.html'));
});

app.get('/about-developers', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'AboutDevelopers.html'));
});

app.get('/pet-products', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'PetProduct.html'));
});

// we can have one page just for cart
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'Payment.html'));
});

app.get('/adoption-form/:user/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'adoption-form.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'login.html'));
});




app.listen(7942, () => {
    console.log('🚀 Server is running at http://localhost:7942');
});


