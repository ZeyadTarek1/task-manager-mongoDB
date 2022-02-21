// Not Only Structered Query Language
// *** Vocab ***
// Table = Collection = list of entries
// Row = Document = individual entry
// Column = Field
// CRUD = create read update delete

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
