const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Serve static folders with proper capitalization
app.use('/IMAGES', express.static(path.join(__dirname, 'IMAGES')));
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/JAVASCRIPT', express.static(path.join(__dirname, 'JAVASCRIPT')));
app.use(express.static(path.join(__dirname, 'HTML_PAGES')));

// middleware
app.use(express.urlencoded({ extended: true })); // for making sure the the values are in json format
app.use(express.json());

// Routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'Home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'Home.html'));
});

app.get('/home/:name', (req, res) => {
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

app.get('/adoptv2', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'AdoptAPetV2.html'));
});

app.get('/about-developers', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'AboutDevelopers.html'));
});

app.get('/about-developers/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'AboutDevelopers.html'));
});

app.get('/pet-products', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'PetProduct.html'));
});

app.get('/pet-products/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'PetProduct.html'));
});

// we can have one page just for cart
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'Payment.html'));
});

app.get('/cart/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'Payment.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'profile.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_PAGES', 'login.html'));
});

const PORT = process.env.PORT || 7942;
app.listen(PORT, () => {
    console.log('🚀 Server is running at http://localhost:7942');
});

// ===================================================================

// MongoDB - Database

const MongoDB_URI = process.env.MongoDB_URI
const mongoose = require('mongoose');
mongoose.connect(MongoDB_URI)
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

// ===================================================================

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
    return res.status(201).json({ msg: "success" });

});

// ===================================================================

// User Form -> login / sign in
const userSchema = new mongoose.Schema({
    full_name: {
        unique: true,
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        //for no duplicate emeil
        unique: true
    },

    password: {
        type: String,
        require: true,
    },

    address: {
        type: String
    },

    contact_number: {
        type: Number
    },

    occupation: {
        type: String
    }
}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)

//signUp route
app.post("/signup", async (req, res) => {

    const { full_name, email, password, confirm_password } = req.body

    if (!full_name || !email || !password || !confirm_password) {
        return res.status(400).json({ message: `All fields are required. ${full_name}, ${email}, ${password}, ${confirm_password}` });

    }

    if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be 6 characters." });;
    }

    try {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered." });
        }

        if (await userModel.findOne({full_name})) {
            return res.status(400).json({ message: "Name already registered." });
        }

        const newUser = new userModel({
            full_name,
            email,
            password
        })

        await newUser.save();
        console.log("New user created: ", newUser)

        res.status(201).json({ message: "Account created successfully!" });

    } catch (err) {
        console.error("SignUp error: ", err)
        res.status(500).json({ message: "Internal server error." });
    }
})


// ===== User Login Route =====
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // Login successful
        return res.status(200).json({ message: "Login successful!", user });
        ;
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
});


// For getting info from the mongodb
app.get('/userInfo/:name', async (req, res) => {
    const userName = req.params.name;

    try {
        const user = await userModel.find({ full_name: userName });

        if (!user || user.length === 0)
            return res.status(404).json({ msg: "User not Found!" });

        return res.json({ user });
    } catch (error) {
        console.log("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/profile/:name', async (req, res) => {
    const userName = req.params.name;

    try {
        const user = await userModel.find({ full_name: userName });

        if (!user || user.length === 0)
            return res.status(404).json({ msg: "User not Found!" });

        return res.json({ user });
        
    } catch (error) {
        console.log("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/profile/:name', async (req, res) => {
    const userName = req.params.name;

    try {
        const user = await userModel.find({ full_name: userName });

        if (!user || user.length === 0)
            return res.status(404).json({ msg: "User not Found!" });

        return res.json({ user });
        
    } catch (error) {
        console.log("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.put("/update-profile", async (req, res) => {
    const { full_name, address, contact_number, occupation } = req.body;

    if (!full_name || !address || !contact_number || !occupation) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { full_name: full_name }, // find by name
            {
                full_name, 
                address,
                contact_number,
                occupation
            },
            { new: true, overwrite: false } // overwrite: false to not replace whole doc
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Profile updated successfully.", user: updatedUser });
    } catch (error) {
        console.error("PUT update error:", error);
        res.status(500).json({ message: "Server error while updating profile." });
    }
});

app.get('/get-forms/:name', async (req, res) => {
    const userName = req.params.name;

    try {
        const forms = await adoptionFormModel.find({ full_name: userName });

        return res.status(200).json(forms);  // Always return 200 with array
    } catch (error) {
        console.log("Error fetching adoption forms:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// const cartSchema = new mongoose.Schema({
//     full_name: {
//         type: String,
//         required: true
//     },
    
//     product_name: {
//         type: String,
//         required: true
//     },

//     quantity: {
//         type: Number,
//         required: true
//     },

//     price: {
//         type: Number,
//         required: true,
//     },

// }, { timestamps: true });

// const cartModel = mongoose.model("cart", cartSchema);

// app.post("/submit-cart", async (req, res) => {
//     const body = req.body;

//     if (!body || !body.full_name || !body.product_name || !body.quantity || !body.price)
//         return res.status(400).json({
//             msg: `fields are required: 
//                 ${body}, ${body.product_name}, ${body.quantity}, ${body.price}`
//         });


//     const cartDetails = await cartModel.create({
//         full_name: body.full_name,
//         product_name: body.product_name,
//         quantity: body.quantity,
//         price: body.price,
//     });

//     console.log("form: " + cartDetails);
//     return res.status(201).json({ msg: "success!" });
// });

// app.get("/get-cart/:name", async (req, res) => {
//     const userName = req.params.name;

//     try {
//         const forms = await cartModel.find({ full_name: userName });

//         return res.status(200).json(forms);  // Always return 200 with array
//     } catch (error) {
//         console.log("Error fetching adoption forms:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });
