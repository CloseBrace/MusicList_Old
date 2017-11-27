const initialState = {
  username: '',
  albums: [],
  albumsPopulated: [],
  artists: [],
  artistsPopulated: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MUSIC_ALBUM_DELETE_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.albums = action.json.albums;
      return newState;
    }
    case 'MUSIC_ALBUMS_POPULATE_FAILURE': {
      const newState = Object.assign({}, state);
      newState.albumsPopulated = [];
      return newState;
    }
    case 'MUSIC_ALBUMS_POPULATE_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.albumsPopulated = action.json;
      return newState;
    }
    case 'MUSIC_ARTIST_DELETE_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.artists = action.json.artists;
      return newState;
    }
    case 'MUSIC_ARTISTS_POPULATE_FAILURE': {
      const newState = Object.assign({}, state);
      newState.artistsPopulated = [];
      return newState;
    }
    case 'MUSIC_ARTISTS_POPULATE_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.artistsPopulated = action.json;
      return newState;
    }
    case 'USER_CLEAR_LIST':
    case 'USER_LOOKUP_FAILURE': {
      const newState = Object.assign({}, initialState);
      return newState;
    }
    case 'USER_LOOKUP_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.username = action.json.username;
      newState.albums = action.json.albums;
      newState.artists = action.json.artists;
      return newState;
    }
    default: {
      return state;
    }
  }
}
