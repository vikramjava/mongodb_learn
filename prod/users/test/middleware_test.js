const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
      joe = new User({
        name : 'Joe'
      });

      blogPost = new BlogPost({
        title : 'JS MiddleWare is great',
        content: 'Yep it really is!'
      });

      joe.blogPosts.push(blogPost);

      // Combine all the 3 promises into a single promise.
      Promise.all([joe.save(), blogPost.save()])
        .then(() => done());
    });

  it('users clean up dangling blogposts after remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      })
  })
});
