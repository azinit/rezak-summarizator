import React from 'react'
import { HuePicker } from 'react-color'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import classNames from 'classnames'
import { MAX_WEIGHT, previewText } from '../fixtures'
import { updateState, pushState } from '../../../../shared/store/user-settings'
import BLService from '../../../../shared/service'
import './index.scss'

// TODO: add get-colors impl from server

type Props = {
    isColorMode: boolean;
    color: string;
    onUpdateState: (nextState: Partial<IUserSettingsState>) => void;
    onPushState: () => void;
}

/**
 * @see https://casesandberg.github.io/react-color/
 */
const ColorPicker = (props: Props) => {
    const { isColorMode, color, onUpdateState, onPushState } = props;
    const colors = BLService.getPalette(color, MAX_WEIGHT, isColorMode);

    const onChangeMode = (e) => {
        const nextMode = e.target.checked;
        onUpdateState({ isColorMode: nextMode })
        onPushState()
    }

    const onChangeColor = (nextColor) => {
        if (isColorMode) {
            onUpdateState({ color: nextColor.hex })
        }
    };

    const onChangeColorComplete = (nextColor) => {
        if (isColorMode) {
            onUpdateState({ color: nextColor.hex })
            onPushState()
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
})

const mapDispatchToProps = (dispatch: any) => ({
    onUpdateState: (nextState: Partial<IUserSettingsState>) => dispatch(updateState(nextState)),
    onPushState: () => dispatch(pushState())
})
export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)
