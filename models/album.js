const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Album = new Schema({
  title: String,
  discogId: Number,
  artists: [Schema.Types.Mixed],
  thumb: String,
  country: String,
  formats: [Schema.Types.Mixed],
  genres: [Schema.Types.Mixed],
  images: [Schema.Types.Mixed],
  labels: [Schema.Types.Mixed],
  notes: String,
  released: String,
  styles: [String],
  tracklist: [Schema.Types.Mixed],
  year: Number,
});

module.exports = mongoose.model('Album', Album);
