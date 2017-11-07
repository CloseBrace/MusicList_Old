const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  albums: [Schema.Types.Mixed],
  artists: [Schema.Types.Mixed],
  email: String,
  firstName: String,
  lastName: String,
  passwordReset: { type: String, select: false },
  username: String,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
