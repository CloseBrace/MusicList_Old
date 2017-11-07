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

// POST to /add
router.post('/add', async (req, res) => {
  // Make sure a user's actually logged in
  if (!req.user) {
    return res.json({ error: 'User not logged in' });
  }

  // Wrap discogs API call in a promise so we can use async / await
  const discogsGetMaster = albumId => new Promise((resolve) => {
    discogsDB.getMaster(albumId, (err, data) => {
      resolve(data);
    });
  });

  const albumId = parseInt(req.body.id, 10);
  let result;

  try {
    // Get album info from discogs AI
    const albumInfo = await discogsGetMaster(albumId);

    // Find the user we want to save to
    const query = User.findOne({ email: req.user.email });
    const foundUser = await query.exec();

    // Sanity Check! Is the album already added?
    const albumIndex = foundUser.albums.indexOf(albumInfo.id);
    if (albumIndex < 0) {
      foundUser.albums.push(albumInfo.id);
    }

    // Sanity Check 2! Is the artist already added?
    for (let i = 0; i < albumInfo.artists.length; i += 1) {
      const artistIndex = foundUser.artists.indexOf(albumInfo.artists[i].id);
      if (artistIndex < 0) {
        foundUser.artists.push(...albumInfo.artists.map(artist => artist.id));
      }
    }

    foundUser.save((error) => {
      if (error) {
        result = res.json({ error: 'Album could not be saved. Please try again.' });
      } else {
        result = res.json(foundUser);
      }
    });
  } catch (err) {
    result = res.json({ error: 'There was an error saving the album to the database. Please try again.' });
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
