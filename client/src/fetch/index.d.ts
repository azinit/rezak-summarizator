declare type ISumOptions = {
}
declare type IReduceResponse = {
    textSentences: string[];
    totalSelection: number[];
}
declare type IFetchOtions = {
    timeout: number,
    mockUrl: string
}

declare type FetchResponse = Promise<Response>
type FetchHeaders = Headers | string[][] | Record<string, string> | undefined;
declare type IFetchService = {
    headers: FetchHeaders;
    api: string;
    mockFetch:<T = Object> (response: T, options?: IFetchOtions) => Promise<T>
    reduce: (text: string, options?: ISumOptions) => Promise<Response>;
}