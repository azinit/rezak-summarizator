/**
 * based on
 * https://github.com/robinmalburn/redux-persist-chrome-storage
 * https://github.com/rt2zz/redux-persist#basic-usage
 * 
 * Используется storage, адаптированный под Chrome
 * По дефолту для redux-persist используется:
 * @example
 * <pre>
 * import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 * </pre>
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import defaultStorage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createChromeStorage from 'redux-persist-chrome-storage'
import { userSettingsReducer } from './user-settings'

/** Main reducer */
const rootReducer = combineReducers({
    userSettings: userSettingsReducer
})

// Create a ChromeStorage instance using the chrome runtime and the Sync StorageArea.
// FIXME: as env.var?
// FIXME: enable chrome storage
const storage = (chrome.extension && false) ? createChromeStorage(window.chrome, 'sync') : defaultStorage;
const config = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(config, rootReducer);

export default () => {
    let store = configureStore({
        reducer: persistedReducer
    })
    let persistor = persistStore(store)
    return { store, persistor };
}