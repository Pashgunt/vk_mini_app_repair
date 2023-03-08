import { Group, Div } from "@vkontakte/vkui";
import React, { Fragment, useState } from "react";
import { Icon48Play, Icon48Pause, Icon48ArrowLeftOutline } from '@vkontakte/icons';

export default function DiagnosticDisplayComponent(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const [intervalID, setIntervalID] = useState(null);
    const [isPlayed, setIsPlayed] = useState(false);
    const [currentColor, setCurrentColor] = useState('rgba(0,0,0,.6)');

    function* generateColors() {
        yield 'red';
        yield 'green';
        return 'blue';
    }

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

    return (
        <Fragment>
            <Group
                mode="plain"
                separator={false}
                style={{
                    background: "red",
                    minHeight: "100vh",
                    backgroundColor: currentColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Div style={{
                    display: "flex",
                    gap: "10px",
                    position: "absolute",
                    top: "0",
                    left: "0"
                }}>
                    <Icon48ArrowLeftOutline fill="white" onClick={() => {
                        stopToggle()
                        changeShowActivePanel(state.panels.panel_mainScreen, state)
                    }} />
                    {isPlayed ? <Icon48Pause fill="white" onClick={stopToggle} /> : <Icon48Play fill="white" onClick={startToggle} />}
                </Div>
            </Group>
        </Fragment>
    );
}