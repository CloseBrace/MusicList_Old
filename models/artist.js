const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Artist = new Schema({
  namevariations: [String],
  profile: String,
  urls: [String],
  discogsId: { type: Number, unique: true },
  images: [Schema.Types.Mixed],
  members: [Schema.Types.Mixed],
});

module.exports = mongoose.model('Artist', Artist);
