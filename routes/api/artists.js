const Artist = require('../../models/artist.js');
const appConfig = require('../../config.js');
const Discogs = require('disconnect').Client;
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/user.js');

const router = express.Router();

// configure mongoose promises
mongoose.Promise = global.Promise;

// configure Discogs
const discogsClient = new Discogs('MusicList-closebrace/0.1', {
  consumerKey: appConfig.discogs.key,
  consumerSecret: appConfig.discogs.secret,
});
const discogsDB = discogsClient.database();

// Check if artist exists and if not, save it
const saveArtist = async (artistInfo) => {
  let errors = false;
  const artistQuery = await Artist.findOne({ discogsId: artistInfo.id });
  if (!artistQuery) {
    const artistInfoModified = Object.assign({ discogsId: artistInfo.id }, artistInfo);
    const newArtist = new Artist(artistInfoModified);
    await newArtist.save((error) => {
      if (error) { errors = true; }
    });
  }
  if (errors) {
    return false;
  }
  return true;
};

// POST to /add
router.post('/add', async (req, res) => {
  // Make sure a user's actually logged in
  if (!req.user) {
    return res.json({ error: 'User not logged in' });
  }

  // Get a single artist from Discogs
  const discogsGetArtist = artistId => new Promise((resolve) => {
    discogsDB.getArtist(artistId, (err, data) => {
      resolve(data);
    });
  });

  const artistId = parseInt(req.body.id, 10);
  let result;

  try {
    // Get artist info from discogs AI
    const artistInfo = await discogsGetArtist(artistId);

    // Save it to the MusicList DB if it's not already there
    const artistSaved = await saveArtist(artistInfo);
    if (!artistSaved) { return JSON.stringify(new Error('There was a problem saving the artist to the database.')); }

    // Find the user we want to save to
    const query = User.findOne({ email: req.user.email });
    const foundUser = await query.exec();

    // Sanity Check! Is the artist already added?
    const artistIndex = foundUser.artists.indexOf(artistInfo.id);
    if (artistIndex < 0) {
      foundUser.artists.push(artistInfo.id);
    }

    foundUser.save((error) => {
      if (error) {
        result = res.json({ error: 'Artist could not be saved. Please try again.' });
      } else {
        result = res.json(foundUser);
      }
    });
  } catch (err) {
    result = res.json({ error: 'There was an error saving the artist to the database. Please try again.' });
  }

  return result;
});

// POST to /search
router.post('/search', async (req, res) => {
  // Contact Discogs API
  await discogsDB.search(req.body, (err, data) => {
    if (err) {
      const error = new Error(err);
      return res.json(error);
    }
    return res.json(data);
  });
});

module.exports = router;
