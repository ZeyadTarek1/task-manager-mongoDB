// ** Playground file ***

// Not Only Structered Query Language
// *** Vocab ***
// Table = Collection = list of entries
// Row = Document = individual entry
// Column = Field
// CRUD = create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient; // setup mongo client
// const ObjectID = mongodb.ObjectID; // setup object IDs

const { MongoClient, ObjectId } = require("mongodb"); // shorter + destructured syntax to above

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId(); //generates new id

// connect to server
MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log("Unable to connect to database");
        }

        // create a database reference
        const db = client.db(databaseName);

        // insert new document in a collection called Users
        db.collection("Users").insertOne(
            {
                name: "Ziad",
                age: 26,
            },
            (error, result) => {
                if (error) {
                    return console.log("Unable to insert");
                }
                console.log(result.insertedId);
            }
        );

        // insert multiple documents in a new collection called Tasks
        db.collection("Tasks").insertMany(
            [
                {
                    description: "test",
                    completed: true,
                },
                {
                    description: "test2",
                    completed: true,
                },
                {
                    description: "test3",
                    completed: false,
                },
            ],
            (error, result) => {
                if (error) {
                    ("Unable to insert data");
                }
                console.log(result.insertedIds);
            }
        );

        // findOne returns the first match
        db.collection("Tasks").findOne(
            { _id: ObjectId("6212498f28c16fa4af258fd5") },
            (error, data) => {
                if (error) {
                    return console.log("Unable to find user");
                }
                console.log(data); // data will be null if query does not match
            }
        );

        // find = findall
        db.collection("Tasks")
            .find({ completed: true })
            .toArray((error, data) => {
                if (error) {
                    return console.log("Unable to find user");
                }
                console.log(data);
            });

        // updateOne
        // returns a promise
        // params: filter,update,options (optional)

        db.collection("Users")
            .updateOne(
                {
                    _id: ObjectId("6212427949d19f5bd3214b9b"), // filter param
                },
                {
                    $set: {
                        //update param
                        name: "ahmed",
                    },
                }
            ) // call as a promise
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        // updateMany
        // returns a promise
        // params: filter,update,options (optional)

        db.collection("Tasks")
            .updateMany(
                {
                    completed: false, // filter param
                },
                {
                    $set: {
                        //update param
                        completed: true,
                    },
                }
            ) // call as a promise
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        // deleteOne
        db.collection("Users")
            .deleteOne({
                age: 26,
            })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
);

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// connect to server
MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            return console.log("Unable to connect to database");
        }

        //create a database reference
        const db = client.db(databaseName);
    }
);

// mongoose code
// const me = new User({
//     name: "ziad",
//     age: 26,
//     email: "help@gmail.com",
//     password: "asdasdasdas",
// });

// // returns a promise
// me.save()
//     .then(() => {
//         console.log(me);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const Task = mongoose.model("Task", {
//     description: {
//         type: String,
//         trim: true,
//         required: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     },
// });

// const test = new Task({
//     description: "test2",
// });

// test.save()
//     .then(() => {
//         console.log(test);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
