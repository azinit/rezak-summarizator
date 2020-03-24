import React from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { MAX_WEIGHT, previewText } from '../fixtures'
import { updateState, pushState } from '../../../../shared/store/user-settings';
import BLService from '../../../../shared/service';
import './index.scss'

// TODO: add percent to weight-picker
type Props = {
    isSummarizeMode: boolean;
    ratio: number;
    onUpdateState: (nextState: Partial<IUserSettingsState>) => void;
    onPushState: () => void;
}

/**
 * @see https://github.com/brownieboy/react-bootstrap-slider
 */
const WeightPicker = (props: Props) => {
    const { ratio, isSummarizeMode, onPushState, onUpdateState } = props;
    const MIN_VALUE = 0
    const MAX_VALUE = 100;
    const CUR_VALUE = Math.ceil(ratio * MAX_VALUE);

    /** text reducing logic */
    // FIXME: remove later
    const threshold = ratio * MAX_WEIGHT;
    const reducedText = BLService.reduceSentences(previewText, threshold, isSummarizeMode)

    const onChangeMode = (e) => {
        const nextEnabled = e.target.checked;
        if (!nextEnabled) {
            onUpdateState({ ratio: 0 })
        }
        onUpdateState({ isSummarizeMode: nextEnabled })
        onPushState();
    }

    const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ratio = +e.target.value / MAX_VALUE;
        onUpdateState({ ratio })
        onPushState();
    }

    return (
        <div className='weight-picker mt-3'>
            <Form.Check
                type='switch'
                id='reduce-enabled'
                label={
                    <div className="mb-1 select-none header">
                        <div className="h6 mb-0">Reduction intensity</div>
                        <div className="text-muted font-small">(from origin - to important sentences)</div>
                        <div className="text-secondary percentage-label">{CUR_VALUE}%</div>
                    </div>
                }
                onChange={onChangeMode}
                checked={isSummarizeMode}
            />
            <div className="demo rounded-top bg-dark text-light p-2 outline-none font-micro select-none">
                <samp>
                    {reducedText.map(({ content }, index) => (
                        <span key={index}>{content}</span>
                    ))}
                </samp>
            </div>
            <ReactBootstrapSlider
                value={CUR_VALUE}
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
    ratio: state.userSettings.ratio,
})

const mapDispatchToProps = (dispatch: any) => ({
    onUpdateState: (nextState: Partial<IUserSettingsState>) => dispatch(updateState(nextState)),
    onPushState: () => dispatch(pushState())
})

export default connect(mapStateToProps, mapDispatchToProps)(WeightPicker)
