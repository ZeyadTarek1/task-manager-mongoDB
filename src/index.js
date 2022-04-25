const express = require("express");
require("./db/mongoose.js");

const User = require("./models/user.js");
const Task = require("./models/task.js");

const app = express();
const port = process.env.PORT || 3000; // heroku or dev port

// parse incoming json to an object automatically
app.use(express.json());

app.get("/users", (req, res) => {
    User.find({}) //read all users from DB
        .then((users) => {
            //send users
            res.send(users);
        })
        .catch((e) => {
            res.status(500).send();
        });
});

app.get("/users/:id", (req, res) => {
    //fetch by paramater
    const _id = req.params.id;
    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        })
        .catch((e) => {
            res.status(500).send();
        });
});

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

app.get("/tasks", (req, res) => {
    Task.find({})
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((e) => {
            res.status(500).send();
        });
});

app.get("/tasks:id", (req, res) => {
    const _id = res.params.id;
    Task.findById(_id)
        .then((task) => {
            if (!task) {
                return res.send(404).send();
            }
            res.send(task);
        })
        .catch((e) => {
            res.status(500).send();
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
