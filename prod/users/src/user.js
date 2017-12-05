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
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  //In this function we don't use => because here 'this' === Joe
  const BlogPost = mongoose.model('blogPost')

  // Go through all the blogpost If the ID is in this(Joe), then remove it.
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
})

// Create User class / User model that represents the entire collection
// of data.
const User = mongoose.model('user', UserSchema);

// Allow other files to access the User class.
module.exports = User;
