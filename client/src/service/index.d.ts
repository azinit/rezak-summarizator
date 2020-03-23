declare type IBackgroundService = {
    // FIXME:
    pushState: (nextState: IUserSettingsState) => void;
}
declare type IBLService = {
    getPalette: (baseColor: string, maxWeight: number) => string[];
    reduceSentences: (sentences: string[], selection: number[], threshold: number) => string[];
}