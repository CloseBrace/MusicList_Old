const initialState = {
  firstName: '',
  id: '',
  isLoggedIn: false,
  isLoggingIn: false,
  lastName: '',
  username: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_LOGIN_ATTEMPT': {
      const newState = Object.assign({}, state);
      newState.isLoggingIn = true;
      return newState;
    }
    case 'AUTHENTICATION_LOGIN_FAILURE': {
      const newState = {
        firstName: '',
        id: '',
        isLoggedIn: false,
        isLoggingIn: false,
        lastName: '',
        username: '',
      };
      return newState;
    }
    case 'AUTHENTICATION_LOGIN_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.firstName = action.json.firstName;
      newState.id = action.json._id;
      newState.isLoggedIn = true;
      newState.isLoggingIn = false;
      newState.lastName = action.json.lastName;
      newState.username = action.json.username;
      return newState;
    }
    default: {
      return state;
    }
  }
}
