const assert = require('assert');
const User = require('../src/user');


describe('Deleting a user', () => {

  beforeEach((done) => {
    joe = new User({ name : 'Joe'});
    joe.save()
       .then(() => done());
  });

  it('model instance remove', (done) => {
    // Do a promise chaining here.
    // The first .then is called only after the remove.
    // The second .then is called only after the findOne call returns.
    joe.remove()
      .then(() => User.findOne({ name : 'Joe'}))
      .then((user) => {
        assert (user === null);
        done();
      });
  });

  // Class method remove is used to remove a bunch of records with some
  // given criteria.
  it('class method remove', (done) => {
    User.remove({ name : 'Joe' })
      .then(() => User.findOne({ name : 'Joe'}))
      .then((user) => {
        assert (user === null);
        done();
      });
  });

  // Find based on a particular criteria. And remove first entry.
  it('class method findAndRemove', (done) => {
      User.findOneAndRemove({ name : 'Joe' })
        .then(() => User.findOne({ name : 'Joe'}))
        .then((user) => {
          assert (user === null);
          done();
      });
  });

  // Works by looking at an id and remove that particular record.
  // Similar to User.findOneAndRemove({ _id : joe._id })
  it('class method findIdAndRemove', (done) => {
      User.findByIdAndRemove(joe._id)
        .then(() => User.findOne({ name : 'Joe'}))
        .then((user) => {
          assert (user === null);
          done();
      });
  });

});
