// Create a new user and save it to the database
// Have to update the package.json file to run this with "npm run test"
const assert = require('assert');
const User = require('../src/user')

describe("Creating records", () => {
  it("saves a user", (done) => {
    // Create an instance 'joe' of class User.
    // This operation does not save anything to the DB.
    const joe = new User({ name : "Joe" });

    // Insert this record to the database.
    joe.save()
      .then(() => {
        // Has Joe been saved successfully.
        // the isNew variable is set to True until joe instance is saved
        // to the DB.
        assert(!joe.isNew);
        done();
      });
  });
});
