const express = require('express');
const path = require('path');
const app = express();

// Serve static folders with proper capitalization
app.use('/IMAGES', express.static(path.join(__dirname, 'IMAGES')));
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/JAVASCRIPT', express.static(path.join(__dirname, 'JAVASCRIPT')));
app.use(express.static(path.join(__dirname, 'HTML_PAGES')));

// middleware
app.use(express.urlencoded({ extended: true })); // for making sure the the values are in json format

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

// MongoDB - Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/adopt-a-pet')
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log('error connecting'));


// Adoption form
// creating schema for adding adoption forms data
const adoptionFormSchema = new mongoose.Schema({
    pet_name: {
        type: String,
        required: true
    },

    full_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true
    },

    contact_number: {
        type: Number,
        required: true
    },

    occupation: {
        type: String,
        required: true
    },

    owned_pet: {
        type: String,
        required: true
    },

    hours_away: {
        type: Number,
        required: true
    },

    family: {
        type: Number,
        required: true
    },

    roomates: {
        type: Number,
        required: true
    },

    children: {
        type: Number,
        required: true
    },

    agree_to_have_pet: {
        type: String,
        required: true
    }

}, { timestamps: true });

const adoptionFormModel = mongoose.model("adoption_form", adoptionFormSchema);

app.post("/submit-adoption-form", async (req, res) => {
    const body = req.body;

    if (!body || !body.pet_name || !body.full_name || !body.email || !body.address || !body.contact_number || !body.occupation || !body.owned_pet || !body.hours_away || !body.family || !body.roomates || !body.children || !body.agree_to_have_pet)
        return res.status(400).json({
            msg: `fields are required: 
                ${body}, ${body.pet_name}, ${body.full_name}, ${body.email}, ${body.address}, ${body.contact_number}, 
                ${body.occupation}, ${body.owned_pet}, ${body.hours_away}, ${body.family}, ${body.roomates}, ${body.children}, 
                ${body.agree_to_have_pet}`
        });


    const adoptionFormDetails = await adoptionFormModel.create({
        pet_name: body.pet_name,
        full_name: body.full_name,
        email: body.email,
        address: body.address,
        contact_number: Number(body.contact_number),
        occupation: body.occupation,
        owned_pet: body.owned_pet,
        hours_away: Number(body.hours_away),
        family: Number(body.family),
        roomates: Number(body.roomates),
        children: Number(body.children),
        agree_to_have_pet: body.agree_to_have_pet
    });

    console.log("form: " + adoptionFormDetails);
    return res.status(201).json({ msg: "success!" });
});


// About Developers Page
const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const contactUsModel = mongoose.model("contact_us_form", contactUsSchema);

// ===================================================================
app.post("/submit-contact-us-form", async (req, res) => {
    const body = req.body;
    if (!body || !body.name || !body.email || !body.message)
        return res.status(400).json({
            msg: `fields are required: ${body}, ${body.name}, ${body.email}, ${body.message}`
        });

    const contactUsModelDetails = await contactUsModel.create({
        name: body.name,
        email: body.email,
        message: body.message
    });

    console.log("form: " + contactUsModelDetails);
    return res.status(201).json({ msg: "success!" });

});

// Order Page here => Mehejat
 // cart

// User Form -> login / sign in

const userSchema = new mongoose.Schema({

    full_name: {
        type: String,
        require: true,
    },

    email: {
     type: String,
     require: true,   
    },

    password: {
    type: String,
    require: true,
    }
},{timestamps: true})

const userModel = mongoose.model("users", userSchema)

app.post("/signup", async (req, res) => {

    const {full_name, email, password, confirm_password} = req.body

    if(!full_name || !email || !password || !confirm_password){
        return res.status(400).json({message: "All fields are required."})

    }

    if(password !== confirm_password){
        return res.status(400).json({message: "Passwords do not match."});
            }

    if(password.length < 6){
        return res.status(400).json({message: "Password must be 6 characters."});;
    }

    try{
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(400).json({message: "Email already registered."});
        }

        const newUser = new unserModel({
            full_name,
            email,
            password
        })

        await newUser.save();

        res.status(201).json({message: "Account created successfully!"});

    }catch (error){
        console.error("SignUp error: ", error)
        res.status(500).json({message: "Internal server error."});
    }
})