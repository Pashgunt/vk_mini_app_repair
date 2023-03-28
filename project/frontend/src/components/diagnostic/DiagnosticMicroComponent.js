import { Fragment } from "react";
import { Group, Div, Spacing, Title, usePlatform } from "@vkontakte/vkui";
import { Icon28ChevronBack } from "@vkontakte/icons";
import RecorderControls from "../recorder/RecorderControls";
import RecordingsList from "../recorder/RecordingsList";
import useRecorder from "../../hooks/useRecorder";

export default function DiagnosticMicroComponent(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const { recorderState, ...handlers } = useRecorder();
    const { audio } = recorderState;
    const platform = usePlatform();

    return (<Fragment>
        <Div style={{
            minHeight: "100vh"
        }}>
            <Group mode="plain" style={{
                position: "relative"
            }}>
                <div style={{
                    paddingTop:  platform === 'ios' ? '50px' : '12px',
                    left: "0",
                    display: 'flex',
                    alignItems: 'center',
                    gap:"15px"
                }}>
                    <Icon28ChevronBack onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
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