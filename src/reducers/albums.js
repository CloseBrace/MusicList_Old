const initialState = [];
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MUSIC_ALBUM_SEARCH_SUCCESS': {
      const newState = action.json.results.slice();
      return newState;
    }
    case 'MUSIC_ALBUM_SEARCH_CLEAR': {
      const newState = initialState.slice();
      return newState;
    }
    default: {
      return state;
    }
  }
}
