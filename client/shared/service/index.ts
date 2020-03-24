import convert from 'color-convert'
import { HSV, HEX } from 'color-convert/conversions';

const EXCESS_COLOR = '#6c757d'
const DUMMY_COLOR = '#dbe1e6';

const BLService: IBLService = {
    // FIXME: modify logic (more bright)?
    getPalette(baseColor: string, maxWeight: number, isColorMode: boolean) {
        console.log('[REZAK-SERVICE] ::palette::', baseColor)
        if (!isColorMode) {
            return [...new Array(maxWeight + 1)].map(i => DUMMY_COLOR)
        }
        return [...new Array(maxWeight + 1)].map((item, weight) => {
            if (weight === 0) return EXCESS_COLOR;
            if (weight === 1) return DUMMY_COLOR;

            const [h, s, v] = convert.hex.hsv(baseColor)
            const ratio = weight / maxWeight;
            const adaptedColorHSV: HSV = [ h, (ratio * 80) + 20 , 100 ]
            const adaptedColorHEX: HEX = convert.hsv.hex(adaptedColorHSV);
            return `#${adaptedColorHEX}`;
        })
    },
    reduceSentences(sentences: ISentence[], threshold: number, isSummarizeMode: boolean) {
        console.log('[REZAK-SERVICE] ::reduce::', threshold)
        if (!isSummarizeMode) {
            return sentences;
        }
        return sentences.filter(({ weight }) => weight >= threshold)
    }
}

export default BLService;