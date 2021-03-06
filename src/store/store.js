import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import albumsReducer from '../reducers/albums';
import albumReducer from '../reducers/album';
import artistsReducer from '../reducers/artists';
import playlistReducer from '../reducers/playlist';
import tracksReducer from '../reducers/tracks';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    albums: albumsReducer,
    album: albumReducer,
    artists: artistsReducer,
    playlist: playlistReducer,
    tracks: tracksReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
