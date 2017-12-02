const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the DB', () => {
  let joe;

  // Need to insert a user before trying to find it.
  beforeEach((done) => {
      // In mongoDB, the ID is created by mongoose before
      // the instance gets saved to the DB. Can be used later to
      // verify if we saved and retrieved the instance correctly.
      // However in mongoDB id is saved as ObjectID. Not as a raw string.
      joe = new User({ name : 'Joe'});
      joe.save()
        .then(() => done());

  });

  it('finds all users with a name of Joe', (done) => {
    // User the User class to find all users with name of Joe.
    // Expect back an array.
    User.find({ name : 'Joe' })
      .then((users) => {
        // Convert objectID from mongoDB to string and compare with
        // entry saved above.
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it("find a user with a particular id", (done) => {
    // Returns one single user with ID of joe.
    User.findOne({ _id : joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      })
  })
});
