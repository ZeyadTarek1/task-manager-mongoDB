// users database

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be positive");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.contains("password", value)) {
                throw new Error("Password cannot be password");
            }
        },
    },
});

userSchema.pre("save", async function (next) {
    // user being saved can be accessed by this
    const user = this;
    console.log(user.password);
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    console.log("just before saving");

    next(); //call this function to exit out of userSchema.pre
});
const User = mongoose.model("User", userSchema);

module.exports = User;
