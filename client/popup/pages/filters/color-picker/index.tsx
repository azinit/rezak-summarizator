import React from 'react'
import { HuePicker } from 'react-color'
import { connect } from 'react-redux'
import hex2rgb from 'hex2rgb'
import { Form } from 'react-bootstrap'
import { MAX_WEIGHT, previewText } from '../fixtures'
import classNames from 'classnames'
import { updateState } from '../../../../shared/store/user-settings'
import { log } from '../../../chrome-tools'
import './index.scss'
import BackgroundService from '../../../../shared/service'
import BLService from '../../../../shared/service/bl'

// TODO: add get-colors impl from server

type Props = {
    isColorMode: boolean;
    color: string;
    // FIXME:
    state: IUserSettingsState;
    onUpdateState: (nextState: Partial<IUserSettingsState>) => void;
}

/**
 * @see https://casesandberg.github.io/react-color/
 */
const ColorPicker = (props: Props) => {
    const { isColorMode, onUpdateState, color, state } = props;
    const colors = BLService.getPalette(color, MAX_WEIGHT);

    const onChangeMode = (e) => {
        onUpdateState({ isColorMode: e.target.checked })
    }

    const onChangeColor = (nextColor) => {
        if (isColorMode) {
            onUpdateState({ color: nextColor.hex })
        }
    };

    const onChangeColorComplete = (nextColor) => {
        if (isColorMode) {
            onUpdateState({ color: nextColor.hex })
            BackgroundService.pushState({ ...state, color: nextColor.hex })
        }
    }

    return (
        <div className={classNames('color-picker mt-2', { disabled: !isColorMode })}>
            <Form.Check
                type='switch'
                id='colorize-enabled'
                label={<span className="h6 select-none">Color of "semantinc painting"</span>}
                onChange={onChangeMode}
                checked={isColorMode}
            />
            <div className="demo rounded-top p-2 bg-dark text-secondary outline-none font-micro select-none">
                <samp>
                    {previewText.map(({ weight, content }, index) => (
                        <span key={index} style={{ color: colors[weight] }}>{content}</span>
                    ))}
                </samp>
            </div>
            <HuePicker
                color={color}
                onChange={onChangeColor}
                onChangeComplete={onChangeColorComplete}
            />
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    isColorMode: state.userSettings.isColorMode,
    color: state.userSettings.color,
    state: state.userSettings
})

const mapDispatchToProps = (dispatch: any) => ({
    onUpdateState: (nextState: Partial<IUserSettingsState>) => dispatch(updateState(nextState))
})
export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)
