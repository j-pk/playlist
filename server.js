var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var FAVORITED_COLLECTION = "favorited";

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
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

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
       handleError(res, err.message, "Failed to get favorited.");
     } else {
       res.status(200).json(docs);
     }
   });
 });

app.post("/favorited", function(req, res) {
  var favorited = req.body;

  var row = db.collection(FAVORITED_COLLECTION).find({
      row: req.body.row
  });

  if (row) {
    db.collection(FAVORITED_COLLECTION).deleteOne({ row: req.body.row }), function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to remove favorite song");
      }
    };
  } else {
    db.collection(FAVORITED_COLLECTION).insertOne(favorited, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to favorite song");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/favorited/:row", function(req, res) {
  db.collection(FAVORITED_COLLECTION).findOne({row: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get favorited song");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/favorited/:id", function(req, res) {
  var favoriteValue = {
    $set: {
      "favorited": false
    }
  };

  var findRow = {
    "row": req.row
  };

  db.collection(FAVORITED_COLLECTION).update(findRow, favoriteValue, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to update favorited song");
    } else {
      console.log(result.ops);
      res.status(200).json(result.ops);
    }
  });

  // db.collection(FAVORITED_COLLECTION).updateOne({row: req.id}, update, function(err, doc) {
  //   if (err) {
  //     handleError(res, err.message, "Failed to update favorited song");
  //   } else {
  //     res.status(204).end();
  //   }
  // });
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
