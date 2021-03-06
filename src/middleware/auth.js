const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const auth = async (req, res, next) => {
    try {
        console.log("auth");

        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "thisismynewcourse");
        // find user with this id and with a valid login token
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });
        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate" });
    }
};

module.exports = auth;
