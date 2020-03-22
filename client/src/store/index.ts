import { updateState, userSettingsReducer} from './user-settings'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    userSettings: userSettingsReducer
})

export const store = configureStore({
    reducer: rootReducer
})