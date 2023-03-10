import React, { Fragment, useEffect, useState } from "react";
import { Group, Div, platform, Platform } from "@vkontakte/vkui";
import { Icon48ArrowLeftOutline } from "@vkontakte/icons";

export default function DiagnosticMultitouchComponents(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const [canToDoTest, setCanToDoTest] = useState(true);
    const [pointerIDs, setPointerIDs] = useState({});

    useEffect(() => {
        if (platform() == Platform.VKCOM) {
            setCanToDoTest(false);
        }
    })

    const pointerDown = function (event) {
        let pointerId = +event.pointerId,
            eventTargetX = event.pageX,
            eventTargetY = event.pageY;
        if (!Object.keys(pointerIDs).includes(pointerId)) {
            let newData = Object.assign({}, pointerIDs);
            newData[pointerId] = `${eventTargetX - 50}px, ${eventTargetY - 50}px`;
            setPointerIDs(newData)
        }
    }

    const pointerUp = function (event) {
        let pointerId = +event.pointerId;
        let newData = Object.assign({}, pointerIDs);
        delete (newData[pointerId]);
        setPointerIDs(newData)
    }

    const preventAllAnotherMove = function (event) {
        event.preventDefault();
    }

    return (
        <Fragment>
            <Group
                mode="plain"
                separator={false}
                onPointerDown={pointerDown}
                onPointerUp={pointerUp}
                onScroll={preventAllAnotherMove}
                onTouchMove={preventAllAnotherMove}
                style={{
                    background: "red",
                    height: "100vh",
                    backgroundColor: 'red',
                    overflow: 'hidden',
                    display: "flex",
                    position: "relative"
                }}>
                <Div style={{
                    display: "flex",
                    gap: "10px",
                    position: "absolute",
                    top: "0",
                    gap:"15px",
                    left: "0"
                }}>
                    <Icon48ArrowLeftOutline fill="white" onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                </Div>
                {
                    Object.values(pointerIDs).map(position => {
                        return <div
                            key={position}
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                background: state.scheme != 'dark' ? '#19191A' : '#fff',
                                position: "absolute",
                                transform: `translate(${position})`
                            }}></div>
                    })
                }
                <Div style={{
                    fontSize: "1.2rem",
                    color: "white",
                    textAlign: 'center'
                }}>
                    {!canToDoTest && 'Данный тест возможен только при использовании приложения на IOS или Android'}
                </Div>
            </Group>
        </Fragment>
    );
}