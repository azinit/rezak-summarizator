import hex2rgb from 'hex2rgb'

const DUMMY_COLOR = '#6C757D';

const BLService: IBLService = {
    // FIXME: modify logic (more bright)?
    getPalette(baseColor: string, maxWeight: number) {
        console.log('[REZAK-SERVICE] ::palette::', baseColor)
        return [...new Array(maxWeight + 1)].map((item, weight) => {
            if (weight === 0) {
                return DUMMY_COLOR
            }
            const [r, g, b] = hex2rgb(baseColor).rgb
            return `rgba(${r}, ${g}, ${b}, ${(weight / maxWeight) + 0.4})`
        })
    },
    reduceSentences(sentences: string[], selection: number[], threshold: number) {
        console.log('[REZAK-SERVICE] ::reduce::', threshold)
        return sentences.filter((s, i) => selection[i] >= threshold)
    }
}

export default BLService;