//Similar to import of Python. const is similar to var. With const we don't
// to change the variable.
const mongoose = require('mongoose');

// mongoose promise has been deprecated. So we use the ES6 promise.
mongoose.Promise = global.Promise;


// Before runs just once. This is to ensure that connection is setup before
// mocha starts.
before((done) => {
  // Use the connect function of mongoose to connect to mongodb
  // Always have to specify which copy of the database mongoose should connect to.
  // If you have multiple DBs in mongo, it will connect to users_test.
  // If users_test is not present mongo will automatically create it at this time.
  mongoose.connect('mongodb://localhost/users_test');

  // After the connect call we don't how long to wait for the connection to be
  // successful. So we wait here with the event handlers of once or error.

  // 'open' and 'error' are specific events to mongoose. Can be found in the docs.
  // Call done to tell mocha we're ready with the connection.
  mongoose.connection
    .once('open', () =>  { done(); })
    .on('error', (error) =>  {
      console.warn('Warning', error);
  });
});

// A hook is a function that executes before any test.
// Here we drop the full DB created from any prior test run.
// But we have to inform Mocha not to run any tests until this drop completes.
// That can be accomplished with 'done' callback.
beforeEach((done) => {
  //Added after associations were created.
  // Mongoose normalizes each name below and makes it lower case.
  const { users, comment, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop ((){
      blogPosts.drop(() => {
        // Ready to run the next test!!
        done();
      });
    });
  });
});
