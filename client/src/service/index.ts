const BackgroundService: IBackgroundService = {
    pushState(state: IUserSettingsState) {
        chrome.runtime.sendMessage({
            type: 'UPDATE_USER_SETTINGS',
            payload: state,
        });
    }
}

export default BackgroundService
