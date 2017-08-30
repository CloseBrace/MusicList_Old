import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { logger } from 'redux-logger';

import DevTools from '../components/shared/DevTools';
import AuthenticationReducer from '../reducers/authentication';
import ProgressReducer from '../reducers/progress';

const combinedReducers = combineReducers({
  progress: ProgressReducer,
  authentication: AuthenticationReducer,
});

const enhancer = compose(
  applyMiddleware(logger),
  DevTools.instrument(),
);

export default function configureStore(initialState) {
  const store = createStore(combinedReducers, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers/progress', () =>
      store.replaceReducer(ProgressReducer),
    );
  }

  return store;
}
