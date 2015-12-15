/*
 * This is my simple users model for demonstrating Passport.
 * You, of course, will store user information in a database and therefore will
 * not define static data as is done here.
 * This file demonstrates using two database lookup methods:  findByUsername
 * and findById.  It does not demonstrate a method to store a user profile
 * to the database when a new user signs up with your app.  This exercise is
 * left for you.
 *
 */
 
// Kluge:  initialize simple user profile data.
var users = [
  { id: 1,
    username: 'fred', 
    password: 'cupcake', 
    displayName: 'Fred'},
  { id: 2, 
    username: 'wilma', 
    password: 'sunshine', 
    displayName: 'Wilma'}
  ];

/* 
 * Find a user given their username
 * @param {string} username - username to be searched for in the database
 * @param {function} callback - the function to call upon completion
 *
 * Note that this function is not asynchronous, so the user value could have
 * been the function return value. But when you put a database query in 
 * here it *will* be asynchronous so you will have to use a callback. Therefore
 * the example uses a callback for you to more easily make that transition to a
 * database.
 */
exports.findByUsername = function(username, callback) {
  var foundUser = null;
  // Err would be used if there was an error communicating with the database
  // This is different than not finding a User, which is a normal possibility
  // Since my example is just using an array, an error won't happen.
  // Your users should be saved in a database.
  var err = null;
  // search for the user with a given username
  for (var i = 0 ; i < users.length ; i++) {
    if (users[i].username == username) {
      foundUser = users[i];
      break;
    }
  }
  /*
   * Call the given callback function with err and the foundUser
   * err may be null (no error connecting to database)
   * and foundUser also null if no user by this name is found
   */
  callback(err, foundUser);
}

/* 
 * Find a user given their id
 * @param {number} id - id to be searched for in the database
 * @param {function} callback - the function to call upon completion
 */
exports.findById = function(id, callback) {
  var foundUser = null;
    console.log("DO WE GET HERE???")
  // Err would be used if there was an error communicating with the database
  // This is different than not finding a User, which is a normal possibility
  // Since my example is just using an array, an error won't happen.
  // Your users should be saved in a database.
  var err = null;
  // search for the user with a given id
  for (var i = 0 ; i < users.length ; i++) {
      console.log("ARE WE LOOPING FOR USERS?")
    if (users[i].id == id) {
      foundUser = users[i];
        console.log("DID WE FIND A USER??")
      break;
    }
  }
  /*
   * Call the given callback function with err and the foundUser
   * err may be null (no error connecting to database)
   * and foundUser also null if no user by this name is found
   */
  callback(err, foundUser);
}
