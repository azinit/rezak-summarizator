import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const userSettingsState: IUserSettingsState = {
    isColorMode: true,
    color: "#00fff7",
    isSummarizeMode: true,
    ratio: 0.33
}

const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState: userSettingsState,
    reducers: {
        updateState(state: IUserSettingsState, action: PayloadAction<Partial<IUserSettingsState>>) {
            state = { ... state, ...action.payload }
            return state;
        },
        pushState(state: IUserSettingsState) {
            chrome.runtime.sendMessage({
                type: 'UPDATE_USER_SETTINGS',
                payload: state,
            });
            return state
        }
    }
})

export const { updateState, pushState } = userSettingsSlice.actions;

export const userSettingsReducer = userSettingsSlice.reducer;
