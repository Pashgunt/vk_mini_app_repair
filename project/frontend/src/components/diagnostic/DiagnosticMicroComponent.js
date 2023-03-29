import { Fragment } from "react";
import { Group, Div, Spacing, Title, usePlatform } from "@vkontakte/vkui";
import { Icon28ChevronBack } from "@vkontakte/icons";
import RecorderControls from "../recorder/RecorderControls";
import RecordingsList from "../recorder/RecordingsList";
import useRecorder from "../../hooks/useRecorder";

export default function DiagnosticMicroComponent(props) {
    const [
        state,
        userData,
        myDeviceList,
        setChooseDevice,
        setChooseDeviceType,
        changeShowActiveModal,
        changeShowActivePanel,
        confirmAdd,
        confirmDelete,
        actionsLog,
        setProblem,
        chooseProblemType,
        chooseProblemText,
        chooseDevice,
        chooseDeviceType,
        setChooseProblemType,
        setChooseProblemText,
        userPhone,
        problem,
        setMyDeviceList,
        addActionLogItem,
        requestsForRepair,
        setRequestsForRepair,
        chooseActiveRequestRepairItem,
        setChooseActiveRequestRepairItem,
        history,
        setHistory
    ] = props.data;

    const { recorderState, ...handlers } = useRecorder();
    const { audio } = recorderState;
    const platform = usePlatform();

    const back = () => {
        let toPanel = history?.at(-2);
        history.pop();
        history.pop();
        setHistory([...history])
        changeShowActivePanel(toPanel, state)
    }

    return (<Fragment>
        <Div style={{
            minHeight: "100vh"
        }}>
            <Group mode="plain" style={{
                position: "relative"
            }}>
                <div style={{
                    paddingTop: platform === 'ios' ? '50px' : '12px',
                    left: "0",
                    display: 'flex',
                    alignItems: 'center',
                    gap: "15px"
                }}>
                    <div>
                        <Icon28ChevronBack onClick={back} />
                    </div>
                    <Title>
                        Микрофон
                    </Title>
                </div>
            </Group>

            <Spacing size={80} />

            <RecorderControls recorderState={recorderState} handlers={handlers} />
            <Spacing size={60} />
            <RecordingsList audio={audio} />
        </Div>
    </Fragment>)
}