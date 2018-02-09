
import { combineReducers } from 'redux';
import { users } from './userReducers';
import { alert} from './alertReducer';
import {registration} from './regReducer';
import {authentication} from './authReducer';

const rootReducer = combineReducers({
    users,
    alert,
    registration,
    authentication
});

export default rootReducer;