const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The Schema is a small portion of the overall UserModel that just
// states what type of data is expected.

const UserSchema = new Schema({
  name: String,
  postCount : Number

});

// Create User class / User model that represents the entire collection
// of data.
const User = mongoose.model('user', UserSchema);

// Allow other files to access the User class.
module.exports = User;
