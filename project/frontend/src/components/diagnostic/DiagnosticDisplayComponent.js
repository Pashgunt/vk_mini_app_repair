import { Group, Div, usePlatform } from "@vkontakte/vkui";
import React, { Fragment, useEffect, useState } from "react";
import { Icon48Play, Icon48Pause, Icon28ChevronBack } from '@vkontakte/icons';

export default function DiagnosticDisplayComponent(props) {
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

    const [intervalID, setIntervalID] = useState(null);
    const [isPlayed, setIsPlayed] = useState(false);
    const [currentColor, setCurrentColor] = useState('rgba(0,0,0,.6)');
    const [crashedItems, setCrashedItems] = useState([]);
    const [isCrashed, setIsCrashed] = useState(false);
    const [isCancel, setIsCancel] = useState(false);

    function* generateColors() {
        yield 'red';
        yield 'green';
        return 'blue';
    }

    function generateCrached() {
        const width = window.screen.width,
            height = window.screen.height,
            left = 0,
            top = 0;
        let coords = [],
            count = 0,
            promise = new Promise((resolve, reject) => {
                let intervalCrashedID = setInterval(function () {
                    count += 1;
                    coords.push({
                        'x': Math.floor(Math.random() * (width - left) + left),
                        'y': Math.floor(Math.random() * (height - top) + top)
                    })
                    if (count === 7) {
                        clearInterval(intervalCrashedID);
                        resolve(coords);
                    }
                }, 50);
            });
        promise.then(coords => {
            setCrashedItems(coords);
        })
    }

    useEffect(() => {
        if (state.isCrashedTests && (Math.random() > 0.85 || myCrashedTests[userData.id]?.includes(state.activePanel))) {
            async function fetchData() {
                await state.api.createCrashedTestForUser(userData.id, state.activePanel)
            }
            try {
                if (!myCrashedTests[userData.id]?.includes(state.activePanel)) {
                    fetchData();
                }
            } catch (e) { }
            setIsCrashed(true);
            generateCrached();
        }
    }, [])

    let generator = generateColors();

    const startToggle = function () {
        setIsPlayed(true);
        const intervalIDValue = setInterval(() => {
            let elem = generator.next();
            setCurrentColor(elem.value)
            if (elem.done) {
                generator = generateColors();
            }
        }, 400);
        setIntervalID(intervalIDValue);
    }

    const stopToggle = function () {
        setIsPlayed(false);
        clearInterval(intervalID);
    }

    const platform = usePlatform();

    const back = () => {
        if (isCrashed && !isCancel) {
            changeShowActiveModal(state.panels.modal_orderRepairShow, state);
            setIsCancel(true);
        } else {
            if (isCancel || !isCrashed) {
                history.pop();
                let toPanel = history?.at(-1);
                setHistory([...history])
                changeShowActivePanel(toPanel, state)
            }
        }
    }

    return (
        <Fragment>
            <Group
                mode="plain"
                separator={false}
                style={{
                    background: "red",
                    minHeight: "100vh",
                    maxHeight: "100vh",
                    overflow: "hidden",
                    backgroundColor: currentColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative"
                }}>
                {isPlayed ? <Icon48Pause fill="white" onClick={stopToggle} width={96} height={96} /> : <Icon48Play fill="white" onClick={startToggle} width={96} height={96} />}
                {crashedItems?.map(({ x, y }) => {
                    return <div
                        key={x}
                        style={{
                            position: "absolute",
                            top: `${x}px`,
                            left: `${y}px`,
                            width: '1px',
                            height: '1px',
                            background: "black"
                        }}></div>;
                })}
                <Div style={{
                    display: "flex",
                    gap: "15px",
                    position: "absolute",
                    top: platform === 'ios' ? '50px' : '12px',
                    left: "0"
                }}>
                    <Icon28ChevronBack fill="white" onClick={() => {
                        stopToggle()
                        back()
                    }} />
                </Div>
            </Group>
        </Fragment>
    );
}