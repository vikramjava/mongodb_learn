//Validation is a special feature provided by Mongoose and not inbuilt in mongo.

const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('Requires a user name', () => {
      const user = new User({ name : undefined});
      const validationResult = user.validateSync();
      console.log(validationResult);
      const message = validationResult.errors.name.message;

      assert(message === 'Name is required.');
  });

  it('Requires a user\'s name longer than 2 characters', () => {
    const user = new User({name : 'Al' });
    const validationResult = user.validateSync();
    // Below call is exactly the same as the one in the it func above.
    // this is an ES6 feature.
    const { message } = validationResult.errors.name;

    assert(message === "Name must be longer than 2 characters.");
  });

  it("disallows invalid records from being saved", (done) => {
    const user = new User({ name : 'Al' });

    // Here if we expect a failure, instead of using 'then'
    // we should use 'catch' This is because promise is being
    // rejected.
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;

        assert(message === "Name must be longer than 2 characters.");
        done();
      })
  })
});
