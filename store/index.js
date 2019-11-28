import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../src/reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['liked_jobs']
};

const persistedReducer = persistReducer(persistConfig,reducers);

export default combineStore = () => {
	const store = createStore(persistedReducer, applyMiddleware(thunk));
	const persistor = persistStore(store);
	return { store, persistor };
};
