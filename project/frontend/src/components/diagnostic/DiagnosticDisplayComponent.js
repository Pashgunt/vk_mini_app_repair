import { Group, Div, usePlatform } from "@vkontakte/vkui";
import React, { Fragment, useState } from "react";
import { Icon48Play, Icon48Pause, Icon28ChevronBack } from '@vkontakte/icons';

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
    const platform = usePlatform();

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
                {isPlayed ? <Icon48Pause fill="white" onClick={stopToggle} width={96} height={96} /> : <Icon48Play fill="white" onClick={startToggle} width={96} height={96} />}
                <Div style={{
                    display: "flex",
                    gap: "15px",
                    position: "absolute",
                    top:  platform === 'ios' ? '50px' : '12px',
                    left: "0"
                }}>
                    <Icon28ChevronBack fill="white" onClick={() => {
                        stopToggle()
                        changeShowActivePanel(state.panels.panel_mainScreen, state)
                    }} />
                </Div>
            </Group>
        </Fragment>
    );
}