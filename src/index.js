const express = require("express");
require("./db/mongoose.js");

const User = require("./models/user.js");
const Task = require("./models/task.js");

const app = express();
const port = process.env.PORT || 3000; // heroku or dev port

// parse incoming json to an object automatically
app.use(express.json());

// process post requests and save to DB
app.post("/users", (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            res.status(201).send(user); // 201 = created
        })
        .catch((error) => {
            res.status(400).send(error); // 400 = error
        });
});

app.post("/tasks", (req, res) => {
    const task = new Task(req.body);

    task.save()
        .then(() => {
            res.status(201).send(task);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
