import { Fragment, useRef, useState } from "react";
import { Group, Div, Spacing, Title } from "@vkontakte/vkui";
import { Icon48ArrowLeftOutline, Icon48Play, Icon48Pause } from "@vkontakte/icons";

export default function DiagnosticSoundComponent(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const lineRef = useRef(null);
    const parentLineRef = useRef(null);
    const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
    const [isPlayed, setIsPlayed] = useState(false);
    const [intervalID, setIntervalID] = useState(null);

    const startPlay = function () {
        setIsPlayed(true);
        audio.play();
        const intervalIDValue = setInterval(() => {
            lineRef.current.style.width = `${Math.floor(Math.random() * (parentLineRef.current.offsetWidth - 10 + 1) + 10)}px`
        }, 300);
        setIntervalID(intervalIDValue);
    }

    const stopPlay = function () {
        setIsPlayed(false);
        audio.pause();
        clearInterval(intervalID);
    }

    audio.addEventListener('ended', function () {
        stopPlay()
    }, false);

    return (<Fragment>
        <Div style={{
            minHeight: "100vh"
        }}>
            <Group mode="plain" style={{
                position: "relative"
            }}>
                <div style={{
                    top: "0",
                    left: "0",
                    display: 'flex',
                    gap:"15px",
                    alignItems: 'center'
                }}>
                    <Icon48ArrowLeftOutline onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
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