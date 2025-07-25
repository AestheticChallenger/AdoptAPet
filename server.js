// const express = require('express');
// const app = express();

// const path = require('path');

const express = require('express');
const app = express();

const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'Home.html'));
});

app.get('/adopt', (req, res) => {
    var name = req.query.name || 'Guest';
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'AdoptAPet.html'));
});

app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'AboutUs.html'));
});

app.get('/pet-products', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'PetProduct.html'));
});

// we can have one page just for cart


app.listen(7942, () => {
    console.log('Server is running on port 7942');
})