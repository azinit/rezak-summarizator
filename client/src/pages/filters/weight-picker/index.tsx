import React from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { MAX_WEIGHT, previewText } from '../fixtures'
import { updateState } from '../../../store/user-settings';
import './index.scss'

// TODO: add percent to weight-picker
type Props = {
    isSummarizeMode: boolean;
    weight: number;
    onUpdateState: (nextState: Partial<IUserSettingsState>) => void;
}

/**
 * @see https://github.com/brownieboy/react-bootstrap-slider
 */
const WeightPicker = (props: Props) => {
    const { weight, isSummarizeMode, onUpdateState } = props;
    const MIN_VALUE = 0
    const MAX_VALUE = 100;

    const onChangeMode = (e) => {
        const nextEnabled = e.target.checked;
        if (!nextEnabled) {
            // FIXME: remove?
            onUpdateState({ weight: 0 })
        }
        onUpdateState({ isSummarizeMode: nextEnabled })
    }

    const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateState({ weight: +e.target.value })
    }

    const getSentence = (sWeight: number, sContent: string) => {
        const ratio = weight / MAX_VALUE;
        const threshold = ratio * MAX_WEIGHT;
        return (sWeight >= threshold) ? sContent : ''
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
                checked={isSummarizeMode}
            />
            <div className="demo rounded-top bg-dark text-light p-2 outline-none font-micro select-none">
                <samp>
                    {previewText.map(({ weight, content }, index) => (
                        <span key={index}>{getSentence(weight, content)}</span>
                    ))}
                </samp>
            </div>
            <ReactBootstrapSlider
                value={weight}
                change={onChangeWeight}
                slideStop={onChangeWeight}
                step={1}
                min={MIN_VALUE}
                max={MAX_VALUE}
            // orientation="vertical"
            // reversed={true}
                disabled={!isSummarizeMode && "disabled" || null} 
            />
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    isSummarizeMode: state.userSettings.isSummarizeMode,
    weight: state.userSettings.weight
})

const mapDispatchToProps = (dispatch: any) => ({
    onUpdateState: (nextState: Partial<IUserSettingsState>) => dispatch(updateState(nextState))
})

export default connect(mapStateToProps, mapDispatchToProps)(WeightPicker)
