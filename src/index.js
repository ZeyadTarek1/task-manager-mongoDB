const express = require("express");
require("./db/mongoose.js");

const User = require("./models/user.js");
const Task = require("./models/task.js");

const app = express();
const port = process.env.PORT || 3000; // heroku or dev port

// parse incoming json to an object automatically
app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({}); //read all users from DB
        res.send(users); //send users
    } catch (e) {
        res.status(500).send();
    }
});

app.get("/users/:id", async (req, res) => {
    //fetch by paramater

    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

// process post requests and save to DB
app.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

app.get("/tasks/:id", async (req, res) => {
    const _id = res.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.send(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every(
        (update) => allowedUpdates.includes(update) // return false if any of the conditions inside are false
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid update" });
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["completed", "description"];

    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid operation" });
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
