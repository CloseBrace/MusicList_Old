const initialState = {
  albums: [],
  artists: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_LOGIN_SUCCESS':
    case 'AUTHENTICATION_SESSION_CHECK_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.albums = action.json.albums;
      newState.artists = action.json.artists;
      return newState;
    }
    case 'MUSIC_ALBUM_ADD_SUCCESS': {
      const newState = Object.assign({ }, state);
      newState.albums = action.json.albums;
      return newState;
    }
    case 'MUSIC_ARTIST_ADD_SUCCESS': {
      const newState = Object.assign({ }, state);
      newState.artists = action.json.artists;
      return newState;
    }
    default: {
      return state;
    }
  }
}
