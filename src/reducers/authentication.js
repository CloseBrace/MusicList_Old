const initialState = {
  firstName: '',
  id: '',
  isLoggedIn: false,
  isLoggingIn: false,
  lastName: '',
  registrationSucceeded: false,
  username: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_LOGIN_ATTEMPT': {
      const newState = Object.assign({}, state);
      newState.isLoggingIn = true;
      return newState;
    }
    case 'AUTHENTICATION_LOGIN_FAILURE':
    case 'AUTHENTICATION_SESSION_CHECK_FAILURE':
    case 'AUTHENTICATION_LOGOUT_SUCCESS': {
      const newState = Object.assign({}, initialState);
      return newState;
    }
    case 'AUTHENTICATION_LOGIN_SUCCESS':
    case 'AUTHENTICATION_SESSION_CHECK_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.firstName = action.json.firstName;
      newState.id = action.json._id;
      newState.isLoggedIn = true;
      newState.isLoggingIn = false;
      newState.lastName = action.json.lastName;
      newState.username = action.json.username;
      return newState;
    }
    case 'AUTHENTICATION_LOGOUT_FAILURE':
    case 'AUTHENTICATION_REGISTRATION_FAILURE': {
      return state;
    }
    case 'AUTHENTICATION_REGISTRATION_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.registrationSucceeded = true;
      return newState;
    }
    case 'AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED': {
      const newState = Object.assign({}, state);
      newState.registrationSucceeded = false;
      return newState;
    }
    default: {
      return state;
    }
  }
}
