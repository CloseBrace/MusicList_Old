import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
export const artistAddFailure = error => ({ type: 'MUSIC_ARTIST_ADD_FAILURE', error });
export const artistAddSuccess = json => ({ type: 'MUSIC_ARTIST_ADD_SUCCESS', json });
export const artistSearchClear = () => ({ type: 'MUSIC_ARTIST_SEARCH_CLEAR' });
export const artistSearchFailure = error => ({ type: 'MUSIC_ARTIST_SEARCH_FAILURE', error });
export const artistSearchSuccess = json => ({ type: 'MUSIC_ARTIST_SEARCH_SUCCESS', json });
export const artistsPopulateFailure = error => ({ type: 'MUSIC_ARTISTS_POPULATE_FAILURE', error });
export const artistsPopulateSuccess = json => ({ type: 'MUSIC_ARTISTS_POPULATE_SUCCESS', json });

// Add an Artist
export function addArtist(id) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Send packet to our API, which will communicate with Discogs
    await fetch(
      // where to contact
      '/api/artists/add',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.email) {
        return dispatch(artistAddSuccess(json));
      }
      return dispatch(artistAddFailure(new Error(json.error)));
    })
    .catch(error => dispatch(artistAddFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Populate Artist data
export function populateArtists(artists) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // Hit the API
    await fetch(
      '/api/artists/populate',
      {
        method: 'POST',
        body: JSON.stringify(artists),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (!json.error) {
        return dispatch(artistsPopulateSuccess(json));
      }
      return dispatch(artistsPopulateFailure(new Error(json.error)));
    })
    .catch(error => dispatch(artistsPopulateFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}


// Search Artists
export function searchArtists(searchText) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());


    dispatch(incrementProgress());

    // Build packet to send to Discogs API
    const searchQuery = {
      q: searchText,
      type: 'artist',
    };

    // Send packet to our API, which will communicate with Discogs
    await fetch(
      // where to contact
      '/api/artists/search',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(searchQuery),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.results) {
        return dispatch(artistSearchSuccess(json));
      }
      return dispatch(artistSearchFailure(new Error(json.error)));
    })
    .catch(error => dispatch(artistSearchFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}
