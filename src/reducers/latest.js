const initialState = {};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MUSIC_ALBUM_LATEST_SUCCESS': {
      const newState = action.json;
      return newState;
    }
    case 'MUSIC_ALBUM_LATEST_FAILURE': {
      const newState = Object.assign({}, initialState);
      return newState;
    }
    default: {
      return state;
    }
  }
}
