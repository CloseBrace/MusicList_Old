import { combineReducers } from 'redux';
import AlbumsReducer from '../reducers/albums';
import AuthenticationReducer from '../reducers/authentication';
import ErrorReducer from '../reducers/error';
import ProgressReducer from '../reducers/progress';
import UserReducer from '../reducers/user';

const reducers = {
  albums: AlbumsReducer,
  authentication: AuthenticationReducer,
  error: ErrorReducer,
  progress: ProgressReducer,
  user: UserReducer,
};

export default combineReducers(reducers);
