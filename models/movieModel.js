/*
 * This model uses the Node.js MongoDB Driver.
 * To install:  npm install mongodb --save
 */
var mongoClient = require('mongodb').MongoClient;

/*
 * This connection_string is for mongodb running locally.
 * Change nameOfMyDb to reflect the name you want for your database
 */
var connection_string = 'localhost:27017/Users';
/*
 * If OPENSHIFT env variables have values, then this app must be running on 
 * OPENSHIFT.  Therefore use the connection info in the OPENSHIFT environment
 * variables to replace the connection_string.
 */
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
// Global variable of the connected database
var mongoDB; 

// Use connect method to connect to the MongoDB server
mongoClient.connect('mongodb://'+connection_string, function(err, db) {
  if (err) doError(err);
  console.log("Connected to MongoDB server at: "+connection_string);
  mongoDB = db; // Make reference to db globally available.
});

var curUser = "Angela";

/*
 * In the methods below, notice the use of a callback argument,
 * how that callback function is called, and the argument it is given.
 * Why do we need to be passed a callback function? Why can't the create, 
 * retrieve, and update functinons just return the data directly?
 * (This is what we discussed in class.)
 */

/********** CRUD Create -> Mongo insert ***************************************
 * @param {string} collection - The collection within the database
 * @param {object} data - The object to insert as a MongoDB document
 * @param {function} callback - Function to call upon insert completion
 *
 * See the API for more information on insert:
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#insertOne
 */
exports.createList = function(listname) {
  // Do an asynchronous insert into the given collection
    
    
//    mongoDB.collection('users').insert(
//        {"username": curUser, 
//        "lists": [{"Favorites": []},
//         {"To Watch": []}]       
//        }
//    )
    
    var query = {};
    query[listname] = [];
    
    
    mongoDB.collection('users').insert(
        {"username": curUser}
    )
    
    mongoDB.collection('users').update(
        {"username": curUser},
        {$set: query}
    )
}

/********** CRUD Retrieve -> Mongo find ***************************************
 * @param {string} collection - The collection within the database
 * @param {object} query - The query object to search with
 * @param {function} callback - Function to call upon completion
 *
 * See the API for more information on find:
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#find
 * and toArray:
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html#toArray
 */
exports.retrieve = function(query, callback) {
  /*
   * The find sets up the cursor which you can iterate over and each
   * iteration does the actual retrieve. toArray asynchronously retrieves the
   * whole result set and returns an array.
   */
  mongoDB.collection("users").find(query).toArray(function(err, docs) {
    if (err) doError(err);
    // docs are MongoDB documents, returned as an array of JavaScript objects
    // Use the callback provided by the controller to send back the docs.
    callback(docs);
  });
}

/********** CRUD Update -> Mongo updateMany ***********************************
 * @param {string} collection - The collection within the database
 * @param {object} filter - The MongoDB filter
 * @param {object} update - The update operation to perform
 * @param {function} callback - Function to call upon completion
 *
 * See the API for more information on insert:
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#updateMany
 */
exports.update = function(filter, update, callback) {
  mongoDB
    .collection("users")     // The collection to update
    .updateMany(                // Use updateOne to only update 1 document
      filter,                   // Filter selects which documents to update
      update,                   // The update operation
      {upsert:true},            // If document not found, insert one with this update
                                // Set upsert false (default) to not do insert
      function(err, status) {   // Callback upon error or success
        if (err) doError(err);
        callback('Modified '+ status.modifiedCount 
                 +' and added '+ status.upsertedCount+" documents");
        });
}

/********** CRUD Delete -> Mongo deleteOne or deleteMany **********************
 * The delete model is left as an exercise for you to define.
 */


var doError = function(e) {
        console.error("ERROR: " + e);
        throw new Error(e);
}

exports.addMovieToList = function(list, title) {    
    
    var query = {}
    query[list] = title;
    
    console.log("query is: " + JSON.stringify(query));
    
    mongoDB.collection("users").update(
      {"username": curUser},
      { $push: query}
    )
}
        

exports.getArrayOfLists = function(callback) {
    console.log("HOW ABOUT HERE")
    var notListnames = ["_id", "username"];
    mongoDB.collection("users").findOne({"username": curUser}, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            var listObject = [];
           for (var key in result) {
                key = key.toString()
                if ( result.hasOwnProperty(key) && (notListnames.indexOf(key) == -1)) {
                    listObject.push(key);
                    console.log("LIST IS:" + key)
                }
            }
            console.log("LIST OBJECT SHOULD BE: " + listObject)
            callback(listObject)
        }
    }) 
}


exports.getMoviesInList = function(listname, callback) {
    console.log("LISTNAME AT THIS POINT IS: " + listname)
    var listQuery = {};
    listQuery[listname] = 1;
    mongoDB.collection("users").findOne({}, listQuery, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            var movies = result[listname]
            console.log("MOVIES IS: " + movies)
            callback(movies)
        }
    })
}






