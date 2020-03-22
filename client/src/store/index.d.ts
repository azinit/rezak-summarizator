declare type IUserSettingsState = {
    isColorMode: boolean;
    color: string;
    isSummarizeMode: boolean;
    weight: number;
}
declare type IGlobalState = {
    userSettings: IUserSettingsState;
}
