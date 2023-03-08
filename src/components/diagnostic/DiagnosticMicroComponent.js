import { Fragment } from "react";
import { Group, Div, Spacing, Title } from "@vkontakte/vkui";
import { Icon48ArrowLeftOutline } from "@vkontakte/icons";
import RecorderControls from "../recorder/RecorderControls";
import RecordingsList from "../recorder/RecordingsList";
import useRecorder from "../../hooks/useRecorder";

export default function DiagnosticMicroComponent(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const { recorderState, ...handlers } = useRecorder();
    const { audio } = recorderState;

    return (<Fragment>
        <Div>
            <Group mode="plain" style={{
                position: "relative"
            }}>
                <div style={{
                    top: "0",
                    left: "0",
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Icon48ArrowLeftOutline onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                    <Spacing size={10} />
                    <Title>
                        Микрофон
                    </Title>
                </div>
            </Group>

            <Spacing size={80} />

            <RecorderControls recorderState={recorderState} handlers={handlers} />
            <Spacing size={60}/>
            <RecordingsList audio={audio} />
        </Div>
    </Fragment>)
}