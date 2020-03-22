import React from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { MAX_WEIGHT, previewText } from '../fixtures'
import './index.scss'

const WeightPicker = () => {
    const [value, setValue] = React.useState(50)
    const MIN_VALUE = 0
    const MAX_VALUE = 100;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setValue(+e.target.value)
    }

    const getSentence = (weight: number, content: string) => {
        const ratio = value / MAX_VALUE;
        const threshold = ratio * MAX_WEIGHT;
        return (weight >= threshold) ? content : ''
    }

    return (
        <div className='weight-picker mt-3'>
            <div className="text-center mb-1">
                <div className="h6 mb-0">Степень сокращения</div>
                <div className="text-muted font-small">(от сохранения всех предложений - до наиболее важных)</div>
            </div>
            <div className="demo rounded-top bg-dark text-secondary p-2 outline-none font-micro select-none">
                <samp>
                    {previewText.map(({ weight, content }, index) => (
                        <span key={index}>{getSentence(weight, content)}</span>
                    ))}
                </samp>
            </div>
            <ReactBootstrapSlider
                value={value}
                change={onChange}
                slideStop={onChange}
                step={1}
                min={MIN_VALUE}
                max={MAX_VALUE}
                // orientation="vertical"
                // reversed={true}
                // disabled="disabled" 
            />
        </div>
    )
}

export default WeightPicker
