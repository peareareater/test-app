import posts from './posts';
import favourites from './favourites';
import status from './status';
import { combineReducers } from 'redux';

export default combineReducers({
    status,
    posts,
    favourites,
});
