import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const userSettingsState: IUserSettingsState = {
    isColorMode: true,
    color: "#00fff7",
    isSummarizeMode: true,
    weight: 33
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
