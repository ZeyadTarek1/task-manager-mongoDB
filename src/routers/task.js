const express = require("express");
const Task = require("../models/task.js");

const router = new express.Router();

router.get("/tasks/:id", async (req, res) => {
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

router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch("/tasks/:id", async (req, res) => {
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

router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
