declare type IUserSettingsState = {
    isColorMode: boolean;
    isSummarizeMode: boolean;
    color: string;
}
declare type IGlobalState = {
    userSettings: IUserSettingsState;
}
