import { combineReducers } from 'redux';
import AuthenticationReducer from '../reducers/authentication';
import ProgressReducer from '../reducers/progress';

const reducers = {
  authentication: AuthenticationReducer,
  progress: ProgressReducer,
};

export default combineReducers(reducers);
