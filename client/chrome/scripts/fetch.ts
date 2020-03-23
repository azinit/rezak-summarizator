const FetchService = {
    api: "http://80.211.47.203:29500",
    headers: Object.freeze({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }),
    /** Обработчик по сокращению текста */
    reduce(text: string, ratio: number = 0.5) {
        return fetch(`${this.api}/reduce`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ text, sum_options: {ratio} })
        })
    }
}

export default FetchService
