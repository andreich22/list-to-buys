import { compose, createStore, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
// import thunk from 'redux-thunk';
// import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers'

const loger = createLogger();
const enhancer = compose(
  persistState('task', ''/*paths, config*/),
  applyMiddleware(loger)
)


export default function configureStore(initialState) {
  
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}