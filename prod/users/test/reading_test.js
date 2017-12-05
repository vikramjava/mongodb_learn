const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the DB', () => {
  let joe, maria, alex, zach;

  // Need to insert a user before trying to find it.
  beforeEach((done) => {
      // In mongoDB, the ID is created by mongoose before
      // the instance gets saved to the DB. Can be used later to
      // verify if we saved and retrieved the instance correctly.
      // However in mongoDB id is saved as ObjectID. Not as a raw string.

      // for skip limit test we add more users.
      alex= new User({ name : 'Alex' });
      joe = new User({ name : 'Joe' });
      maria = new User({ name : 'Maria' });
      zach = new User({ name : 'Zach' })

      // Promise for all. See assoications_test.js
      Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
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

  it('can skip and limit the result set', (done) => {
    // Query modifier to skip first user. And limit the output to only 2 users.
    // So only Joe and Maria should be shown in the result set.
    // To make sure results are consistent, do a sort by name.
    User.find({})
      .sort({ name : 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
        done();
      })
  });
});
