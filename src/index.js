require("./db/mongoose.js");
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000; // heroku or dev port

// app.use((req, res, next) => {
//     if (req.method === "GET") {
//         res.send("Get requests are disabled");
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => res.status(503).send("Servers under maintenance"));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
