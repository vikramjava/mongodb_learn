// A different Schema design as compared to post.
// For post we just created the Schema but no class model.
// Here we will create the model and BlogPosts will be referenced
// by user.


// Below we pass a reference to a different comment model using ObjectID.
//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema= new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectID,
    ref : 'comment'
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);
module.exports = BlogPost;
