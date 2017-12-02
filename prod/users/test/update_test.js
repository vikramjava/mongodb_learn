const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name : "Joe", postCount : 0 });
    joe.save()
       .then(() => {
         done();
       });
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('instance type using update', (done) => {
    assertName(joe.update({ name : 'Alex' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name : 'Joe' }, { name : 'Alex' }),
      done
    );
  });

  it('A model class can update on record', (done) => {
    assertName(
      User.findOneAndUpdate({ name : 'Joe'}, { name : 'Alex'}),
      done
    );
  });

  it('A model class can record with ID and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name : 'Alex' }),
      done
    );
  });

  // Use the mongo update operator (inc). Google mongo update operator.
  it('A user can have their postcount incremented by 1', (done) => {
    User.update({ name : 'Joe' }, { $inc: { postCount: 10 } })
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
          assert(user.postCount === 10);
          done();
        });
  });
});
