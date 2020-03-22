const service: IBackgroundService = {
    pushState(state: IUserSettingsState) {
        chrome.runtime.sendMessage({
            type: 'NEW_STATE',
            payload: state,
        });
    }
}

export default service
