import { selection, summary, text, text_sentences, colors, sum_sentences } from './fixtures'

// TODO: connect to server

const FetchService: IFetchService = {
    /** Симуляция fetch-запроса @test */
    mockFetch<T = Object>(response: T, options?: IFetchOtions): Promise<T> {
        const { timeout = 500, mockUrl = 'api/fixtures/rezak' } = options;

        console.log(`[GET] fetching data from: ${mockUrl}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('[GET] fetched!\n\n');
                resolve(response)
            }, timeout)
        });
    },
    /** Обработчик по сокращению текста */
    reduce(text: string, options?: ISumOptions) {
        return this.mockFetch({
            text_sentences,
            selection
        }, {
            mockUrl: 'api/reduce'
        })
    },
    /** Получить палитру цветов */
    getColors(baseColor?: number) {
        return this.mockFetch({
            colors
        }, {
            mockUrl: 'api/get-colors'
        })
    },
    /** Получить сокращенный текст */
    summarize(textSentences: string[], totalSelection: number[], weightThreshold: number) {
        return this.mockFetch({
            sum_sentences
        }, {
            mockUrl: 'api/summarize'
        })
    },
    /** Токенизировать текст */
    tokenize(text: string) {
        return this.mockFetch({
            text_sentences
        }, {
            mockUrl: 'api/tokenize'
        })
    }
}

export default FetchService;