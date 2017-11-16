import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
export const userClearList = () => ({ type: 'USER_CLEAR_LIST' });
export const userLookupFailure = error => ({ type: 'USER_LOOKUP_FAILURE', error });
export const userLookupSuccess = json => ({ type: 'USER_LOOKUP_SUCCESS', json });

// Look up a user
export function userLookup(username) {
  return async (dispatch) => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // API call
    await fetch(
      '/api/users/find',
      {
        method: 'POST',
        body: JSON.stringify({ username }),
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
      if (json.username) {
        return dispatch(userLookupSuccess(json));
      }
      return dispatch(userLookupFailure(new Error(json.error)));
    })
    .catch(error => dispatch(userLookupFailure(new Error(error))));

    // turn off spinner
    return dispatch(decrementProgress());
  };
}
