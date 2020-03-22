declare type ISumOptions = {
}
declare type IReduceResponse = {
    textSentences: string[];
    totalSelection: number[];
}
declare type IColorsResponse = {
    colors: string[];
}
declare type ISummarizeResponse = {
    textSentences: string[];
}
declare type ITokenizeResponse = {
    textSentences: string[];
}
declare type IFetchOtions = {
    timeout: number,
    mockUrl: string
}

declare type FetchResponse = Promise<Response>
declare type IFetchService = {
    mockFetch:<T = Object> (response: T, options?: IFetchOtions) => Promise<T>
    reduce: (text: string, options?: ISumOptions) => Promise<IReduceResponse>;
    getColors: (baseColor?: number) => Promise<IColorsResponse>;
    summarize: (textSentences: string[], totalSelection: number[], weightThreshold: number) => Promise<ISummarizeResponse>;
    tokenize: (text: string) => Promise<ITokenizeResponse>;
}