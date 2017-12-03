const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;

// The Schema is a small portion of the overall UserModel that just
// states what type of data is expected.

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectID
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// Create User class / User model that represents the entire collection
// of data.
const User = mongoose.model('user', UserSchema);

// Allow other files to access the User class.
module.exports = User;
