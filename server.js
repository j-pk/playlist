var express = require("express");
var https = require('https');
var fs = require('fs');
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var FAVORITED_COLLECTION = "favorited";

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var app = express();
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
https.createServer({
   key: fs.readFileSync('key.pem'),
   cert: fs.readFileSync('cert.pem')
}, app).listen(process.env.PORT || 8080);

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/favorited", function(req, res) {
  db.collection(FAVORITED_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/favorited", function(req, res) {
  var newFavorite = req.body;
  newFavorite.createDate = new Date();

  db.collection(FAVORITED_COLLECTION).insertOne(newFavorite, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to favorite song");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/favorited/:id", function(req, res) {
  db.collection(FAVORITED_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get favorited song");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/favorited/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(FAVORITED_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update favorited song");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/favorited/:id", function(req, res) {
  db.collection(FAVORITED_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete favorited song");
    } else {
      res.status(204).end();
    }
  });
});
