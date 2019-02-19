import { combineReducers } from 'redux';
import auth from './auth';
import flashMessage from './flashMessage';
// import article from './article';

export default combineReducers({
    auth,
    flashMessage,
    // article
})