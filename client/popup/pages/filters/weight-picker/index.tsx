import React from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { MAX_WEIGHT, previewText } from '../fixtures'
import { updateState } from '../../../../shared/store/user-settings';
import './index.scss'
import BackgroundService from '../../../../shared/service';
import BLService from '../../../../shared/service/bl';
import { log } from '../../../chrome-tools'

// TODO: add percent to weight-picker
type Props = {
    isSummarizeMode: boolean;
    ratio: number;
    state: IUserSettingsState;
    onUpdateState: (nextState: Partial<IUserSettingsState>) => void;
}

/**
 * @see https://github.com/brownieboy/react-bootstrap-slider
 */
const WeightPicker = (props: Props) => {
    const { ratio, isSummarizeMode, onUpdateState, state } = props;
    const MIN_VALUE = 0
    const MAX_VALUE = 100;
    const CUR_VALUE = Math.ceil(ratio * MAX_VALUE);
    log(`[${MIN_VALUE}-${MAX_VALUE}] >>> ${CUR_VALUE} (${ratio})`)

    /** text reducing logic */
    const text_sentences = previewText.map(s => s.content);
    const total_selection = previewText.map(s => s.weight);
    // FIXME: remove later
    const threshold = ratio * MAX_WEIGHT;
    const reducedText = BLService.reduceSentences(text_sentences, total_selection, threshold)

    const onChangeMode = (e) => {
        const nextEnabled = e.target.checked;
        if (!nextEnabled) {
            // FIXME: remove?
            onUpdateState({ ratio: 0 })
        }
        onUpdateState({ isSummarizeMode: nextEnabled })
    }

    const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ratio = +e.target.value / MAX_VALUE;
        onUpdateState({ ratio })
        // FIXME:
        BackgroundService.pushState({ ...state, ratio })
    }

    return (
        <div className='weight-picker mt-3'>
            <Form.Check
                type='switch'
                id='reduce-enabled'
                label={
                    <div className="mb-1 select-none">
                        <div className="h6 mb-0">Reduction intensity</div>
                        <div className="text-muted font-small">(from origin - to important sentences)</div>
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
    // FIXME:
    state: state.userSettings
})

const mapDispatchToProps = (dispatch: any) => ({
    onUpdateState: (nextState: Partial<IUserSettingsState>) => dispatch(updateState(nextState))
})

export default connect(mapStateToProps, mapDispatchToProps)(WeightPicker)
