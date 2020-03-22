import React from 'react'
import { HuePicker } from 'react-color'
import hex2rgb from 'hex2rgb'
import { Form } from 'react-bootstrap'
import { MAX_WEIGHT, previewText } from '../fixtures'
import classNames from 'classnames'
import './index.scss'

/**
 * @see https://casesandberg.github.io/react-color/
 */
const ColorPicker = () => {
    const [color, setColor] = React.useState<string>('#00fff7')
    const [enabled, setEnabled] = React.useState<boolean>(true)

    const onChangeMode = (e) => {
        const nextEnabled = e.target.checked;
        setEnabled(nextEnabled)
    }

    // TODO: add to store
    const onChangeColor = (nextColor) => {
        if (enabled) {
            setColor(nextColor.hex)
        }
    };

    const getColor = (weight: number) => {
        if (weight === 0) {
            return '#6C757D'
        }
        const [r, g, b] = hex2rgb(color).rgb
        return `rgba(${r}, ${g}, ${b}, ${(weight / MAX_WEIGHT) + 0.3})`
    }

    return (
        <div className='color-picker mt-2'>
            <Form.Check
                type='switch'
                id='colorize-enabled'
                label={<span className="h6 select-none">Цвет семантической покраски текста</span>}
                onChange={onChangeMode}
                checked={enabled}
            />
            <div className={classNames(
                'demo',
                'rounded-top p-2',
                'bg-dark text-secondary',
                'outline-none font-micro select-none',
                { disabled: !enabled }
            )}>
                <samp>
                    {previewText.map(({ weight, content }, index) => (
                        <span key={index} style={{ color: getColor(weight) }}>{content}</span>
                    ))}
                </samp>
            </div>
            <HuePicker color={color} onChange={onChangeColor} />
        </div>
    )
}

export default ColorPicker
