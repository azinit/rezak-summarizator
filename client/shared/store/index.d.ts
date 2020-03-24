declare type IUserSettingsState = {
    isColorMode: boolean;
    color: string;
    isSummarizeMode: boolean;
    // 0...1
    ratio: number;
}
declare type IGlobalState = {
    userSettings: IUserSettingsState;
}
