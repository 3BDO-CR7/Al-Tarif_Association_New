import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import register from './RegisterReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    register
});