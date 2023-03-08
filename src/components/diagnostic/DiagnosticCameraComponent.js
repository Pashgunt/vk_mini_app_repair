import { Fragment, useEffect, useRef, useState } from "react";
import { Group, Div, Spacing, Title } from "@vkontakte/vkui";
import { Icon48ArrowLeftOutline, Icon28CameraOutline } from "@vkontakte/icons";

export default function DiagnosticCameraComponent(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;
    const [chooseCameraType, setChooseCameraType] = useState('user')

    const changeChooseCameraType = function () {
        if (chooseCameraType === 'user') {
            setChooseCameraType('environment');
            return;
        }
        setChooseCameraType('user');
    }

    const videoRef = useRef(null);

    useEffect(() => {
        let options = {
            video: {
                facingMode: chooseCameraType,
                width: {
                    min: 1024,
                    ideal: 1280,
                    max: 1920
                },
                height: {
                    min: 776,
                    ideal: 720,
                    max: 1080
                }
            },
            audio: false,
        }
        navigator.mediaDevices.getUserMedia(options)
            .then(function (stream) {
                videoRef.current.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });
    }, [chooseCameraType])

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
                        Камера
                    </Title>
                </div>
            </Group>
            <Spacing size={20} />
            <Icon28CameraOutline onClick={changeChooseCameraType} />
            <Spacing size={20} />
            <video style={{
                width: "100%"
            }} ref={videoRef} autoPlay={true}></video>
        </Div>
    </Fragment>);
}