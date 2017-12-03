const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name : "Joe",
      posts : [{title: "PostTitle" }]
    });

    joe.save()
    .then(() => User.findOne({ name : "Joe" }))
    .then((user) => {
      assert(user.posts[0].title === "PostTitle");
      done();
    })
  });

  it("Can add a subdocument to an already present record", (done) => {
    const joe = new User({
      name : 'Joe',
      posts : [ ]
    });

    joe.save()
      .then(() => User.findOne({ name : "Joe"}))
      .then((user) => {
        user.posts.push({ title : "New Post" });
        return user.save();
      })
      .then(() => User.findOne({ name : "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "New Post");
        done();
      });
  });

  it("can remove an exisiting subdocument", (done) => {
    const joe = new User ({
      name : "Joe",
      posts : [{ title : 'New Title'}]
    })

    joe.save()
      .then(() => User.findOne({ name : "Joe"}))
      .then((user) => {
        const post = user.posts[0];
        // This call does not remove the document from the DB.
        // Still need to call save to remove this subdocument.
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name : "Joe" }))
      .then((user) => {
        assert(user.posts.length == 0);
        done();
      });
  });
});
