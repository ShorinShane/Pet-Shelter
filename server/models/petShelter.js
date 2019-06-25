const mongoose = require("mongoose");

const petShelterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pet name is required"],
        minlength: [3, "Pet name must be 3 characters or longer"]
    },
    type: {
        type: String,
        required: [true, "Pet type is required"],
        minlength: [3, "Pet type must be 3 characters or longer"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be 3 characters or longer"]
    },
    skill1: {
        type: String,
    },
    skill2: {
        type: String,
    },
    skill3: {
        type: String,
    },
    likes: {
        type: Number,
    }
}, {timestamps: true});
mongoose.model("petShelter", petShelterSchema);