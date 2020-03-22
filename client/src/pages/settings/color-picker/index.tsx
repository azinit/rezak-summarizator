import React from 'react'
import { HuePicker } from 'react-color'
import hex2rgb from 'hex2rgb'
import { MAX_WEIGHT, previewText } from '../fixtures'
import './index.scss'

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
        return `rgba(${r}, ${g}, ${b}, ${(weight / MAX_WEIGHT) + 0.3})`
    }

    return (
        <div className='color-picker mt-3'>
            <div className="text-center h6">Цвет семантической покраски текста</div>
            <div className="demo rounded-top bg-dark text-secondary p-2 outline-none font-micro select-none">
                <samp>
                    {previewText.map(({ weight, content }, index) => (
                        <span key={index} style={{ color: getColor(weight) }}>{content}</span>
                    ))}
                </samp>
            </div>
            <HuePicker color={color} onChange={onChange} />
        </div>
    )
}

export default ColorPicker
