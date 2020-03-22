import React from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { Form } from 'react-bootstrap'
import { MAX_WEIGHT, previewText } from '../fixtures'
import './index.scss'

// TODO: add percent to weight-picker

/**
 * @see https://github.com/brownieboy/react-bootstrap-slider
 */
const WeightPicker = () => {
    const [enabled, setEnabled] = React.useState<boolean>(true)
    const [value, setValue] = React.useState<number>(33)
    const MIN_VALUE = 0
    const MAX_VALUE = 100;

    const onChangeMode = (e) => {
        const nextEnabled = e.target.checked;
        if (!nextEnabled) {
            setValue(0)
        }
        setEnabled(nextEnabled)
    }

    const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(+e.target.value)
    }

    const getSentence = (weight: number, content: string) => {
        const ratio = value / MAX_VALUE;
        const threshold = ratio * MAX_WEIGHT;
        return (weight >= threshold) ? content : ''
    }

    return (
        <div className='weight-picker mt-3'>
            <Form.Check
                type='switch'
                id='reduce-enabled'
                label={
                    <div className="mb-1 select-none">
                        <div className="h6 mb-0">Степень сокращения</div>
                        <div className="text-muted font-small">(от сохранения всех предложений - до наиболее важных)</div>
                    </div>
                }
                onChange={onChangeMode}
                checked={enabled}
            />
            <div className="demo rounded-top bg-dark text-light p-2 outline-none font-micro select-none">
                <samp>
                    {previewText.map(({ weight, content }, index) => (
                        <span key={index}>{getSentence(weight, content)}</span>
                    ))}
                </samp>
            </div>
            <ReactBootstrapSlider
                value={value}
                change={onChangeWeight}
                slideStop={onChangeWeight}
                step={1}
                min={MIN_VALUE}
                max={MAX_VALUE}
            // orientation="vertical"
            // reversed={true}
                disabled={!enabled && "disabled" || null} 
            />
        </div>
    )
}

export default WeightPicker
