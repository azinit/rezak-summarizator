import { selection, summary, text, text_sentences, colors, sum_sentences } from './fixtures'

// TODO: connect to server

const FetchService: IFetchService = {
    api: "http://80.211.47.203:29500",
    headers: Object.freeze({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }),
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
        return fetch(`${this.api}/reduce`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ text })
        })
    }
}

export default FetchService;