import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const userSettingsState: IUserSettingsState = {
    color: "#00fff7",
    isColorMode: true,
    isSummarizeMode: true
}

const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState: userSettingsState,
    reducers: {
        updateState(state: IUserSettingsState, action: PayloadAction<Partial<IUserSettingsState>>) {
            state = { ... state, ...action.payload }
            return state;
        }
    }
})

export const { updateState } = userSettingsSlice.actions;

export const userSettingsReducer = userSettingsSlice.reducer;
