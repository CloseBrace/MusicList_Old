const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Artist = new Schema({
  discogsId: { type: Number, unique: true },
  images: [Schema.Types.Mixed],
  members: [Schema.Types.Mixed],
  name: String,
  namevariations: [String],
  profile: String,
  urls: [String],
});

module.exports = mongoose.model('Artist', Artist);
