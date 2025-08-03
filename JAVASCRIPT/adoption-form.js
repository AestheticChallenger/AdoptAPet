const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/adoption-forms')
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log('error connecting'));

// middleware
app.use(express.urlencoded({ extended: true }));

// creating schema for adding adoption forms data

/* NOTE:::=>>= ADD THE REST!!!! =<<=:::*/
const adoptionFormSchema = new mongoose.Schema({
    pet_name: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    jobTitle: {
        type: String,

    },

    gender: {
        type: String,

    }

});

const adoptionFormModel = mongoose.model("adoptionForm", adoptionFormSchema);

app.post("api/adoption", async (req, res) => {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name) {
        return res.status(400).json({ msg: "fields are required" })
    }

    
});