// // MongoDB - Database
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/adopt-a-pet')
//     .then(() => console.log('MongoDB connected'))
//     .catch(() => console.log('error connecting'));


// // Adoption form
// // creating schema for adding adoption forms data
// const adoptionFormSchema = new mongoose.Schema({
//     pet_name: {
//         type: String,
//         required: true
//     },

//     full_name: {
//         type: String,
//         required: true
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     address: {
//         type: String,
//         required: true
//     },

//     contact_number: {
//         type: Number,
//         required: true
//     },

//     occupation: {
//         type: String,
//         required: true
//     },

//     owned_pet: {
//         type: String,
//         required: true
//     },

//     hours_away: {
//         type: Number,
//         required: true
//     },

//     family: {
//         type: Number,
//         required: true
//     },

//     roomates: {
//         type: Number,
//         required: true
//     },

//     children: {
//         type: Number,
//         required: true
//     },

//     agree_to_have_pet: {
//         type: String,
//         required: true
//     }

// }, { timestamps: true });

// const adoptionFormModel = mongoose.model("adoptionForm", adoptionFormSchema);

// app.post("/submit-adoption-form", async (req, res) => {
//     const body = req.body;

//     if (!body ||
//         !body.pet_name ||
//         !body.full_name ||
//         !body.email ||
//         !body.address ||
//         !body.contact_number ||
//         !body.occupation ||
//         !body.owned_pet ||
//         !body.hours_away ||
//         !body.family ||
//         !body.roomates ||
//         !body.children ||
//         !body.agree_to_have_pet) {
//         return res.status(400).json({ msg: "fields are required" })
//     }

//     const adoptionFormDetails = await adoptionFormModel.create({
//         pet_name: body.pet_name,
//         full_name: body.full_name,
//         email: body.email,
//         address: body.address,
//         contact_number: Number(body.contact_number),
//         occupation: body.occupation,
//         owned_pet: body.owned_pet,
//         hours_away: Number(body.hours_away),
//         family: Number(body.family),
//         roomates: Number(body.roomates),
//         children: Number(body.children),
//         agree_to_have_pet: body.agree_to_have_pet
//     })

//     console.log("form: " + adoptionFormDetails);
//     return res.status(201).json({ msg: "success!" });
// });