import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from '../mixins/storage';
import {reducer as projectFilesReducer} from '../containers/ProjectFiles/slice';

const persistConfig = {
    key: 'root',
    storage,
}


export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        projectFiles: projectFilesReducer,
        ...injectedReducers,
    });

    return persistReducer(persistConfig, rootReducer);
}