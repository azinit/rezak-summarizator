declare type ISentence = {
    content: string;
    weight: number;
}
declare type IBLService = {
    getPalette: (baseColor: string, maxWeight: number, isColorMode: boolean) => string[];
    reduceSentences: (sentences: ISentence[], threshold: number, isSummarizeMode: boolean) => ISentence[];
}