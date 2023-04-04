import { Fragment, useRef, useState } from "react";
import { Group, Div, Spacing, Title, usePlatform } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon48Play, Icon48Pause } from "@vkontakte/icons";

export default function DiagnosticSoundComponent(props) {
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
        setHistory,
        myCrashedTests
    ] = props.data;

    const lineRef = useRef(null);
    const parentLineRef = useRef(null);
    const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
    const [isPlayed, setIsPlayed] = useState(false);
    const [intervalID, setIntervalID] = useState(null);
    const [isCrashed, setIsCrashed] = useState(false);
    const [isCancel, setIsCancel] = useState(false);

    const startPlay = function () {
        setIsPlayed(true);
        audio.play();
        if (state.isCrashedTests && (Math.random() > 0.9 || myCrashedTests[userData.id]?.includes(state.activePanel))) {
            async function fetchData() {
                await state.api.createCrashedTestForUser(userData.id, state.activePanel)
            }
            try {
                if (!myCrashedTests[userData.id]?.includes(state.activePanel)) {
                    fetchData();
                }
            } catch (e) { }
            setIsCrashed(true);
            const intervalIDValue = setInterval(() => {
                lineRef.current.style.width = `${Math.floor(Math.random() * (parentLineRef.current.offsetWidth - 10 + 1) + 10)}px`
                audio.volume = Math.random();
            }, 200);
            setIntervalID(intervalIDValue);
        } else {
            const intervalIDValue = setInterval(() => {
                lineRef.current.style.width = `${Math.floor(Math.random() * (parentLineRef.current.offsetWidth - 10 + 1) + 10)}px`
            }, 200);
            setIntervalID(intervalIDValue);
        }
    }

    const stopPlay = function () {
        setIsPlayed(false);
        audio.pause();
        clearInterval(intervalID);
    }

    audio.addEventListener('ended', function () {
        stopPlay()
    }, false);

    const platform = usePlatform();

    const back = () => {
        if (isCrashed && !isCancel) {
            setProblem("Проблемы со звком");
            changeShowActiveModal(state.panels.modal_orderRepairShow, state);
            setIsCancel(true);
        } else {
            setProblem("");
            if (isCancel || !isCrashed) {
                history.pop();
                let toPanel = history?.at(-1);
                setHistory([...history])
                changeShowActivePanel(toPanel, state)
            }
        }
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
                    gap: "15px",
                    alignItems: 'center'
                }}>
                    <div>
                        <Icon28ChevronBack onClick={back} />
                    </div>
                    <Title>
                        Звук
                    </Title>
                </div>
            </Group>
            <Spacing size={200} />
            <Div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                {isPlayed ? <Icon48Pause fill="#999" stroke="" onClick={stopPlay} width={256} height={256} /> : <Icon48Play fill="#999" onClick={startPlay} width={256} height={256} />}
                <div
                    style={{
                        height: "10px",
                        borderRadius: "5px",
                        width: "100%",
                        position: "relative",
                        background: "#ddd",
                        zIndex: "2",
                        overflow: "hidden",
                    }}
                    ref={parentLineRef}
                >
                    <div style={{
                        display: isPlayed ? 'block' : 'none',
                        position: "absolute",
                        top: "0",
                        left: "0",
                        height: "100%",
                        width: 0,
                        background: "#F28F93",
                        zIndex: "-1",
                        transition: ".2s all linear"
                    }}
                        ref={lineRef}
                    >
                    </div>
                </div>
            </Div>

        </Div>
    </Fragment>);
}