import React from 'react'
import { HuePicker } from 'react-color'
import hex2rgb from 'hex2rgb'
import './index.scss'

type ISentence = {
    content: string;
    weight: number;
}

const previewText: ISentence[] = [
    { content: "Lorem Ipsum is simply dummy text.", weight: 3 },
    { content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", weight: 1 },
    { content: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", weight: 0 },
    { content: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.", weight: 1 }
]

const maxWeight = Math.max(...previewText.map(s1 => s1.weight))

/**
 * @see {@link https://casesandberg.github.io/react-color/}
 */
const ColorPicker = () => {
    const [color, setColor] = React.useState('#00fff7')

    // TODO: add to store
    const onChange = (nextColor) => {
        setColor(nextColor.hex)
    };

    const getColor = (weight: number) => {
        if (weight === 0) {
            return '#6C757D'
        }
        const [r, g, b] = hex2rgb(color).rgb
        return `rgba(${r}, ${g}, ${b}, ${(weight / maxWeight) + 0.3})`
    }

    return (
        <div className='color-picker mt-2'>
            <div className="text-center h6">Цвет семантической покраски текста</div>
            <div className="demo rounded-top bg-dark text-secondary p-2 outline-none">
                <samp>
                    {previewText.map((sentence) => (
                        <span style={{ color: getColor(sentence.weight) }}>{sentence.content}</span>
                    ))}
                </samp>
            </div>
            <HuePicker color={color} onChange={onChange} />
        </div>
    )
}

export default ColorPicker
