import { Fragment, useEffect, useRef, useState } from "react";
import { Group, Div, Spacing, Title, Headline } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon28CameraOutline } from "@vkontakte/icons";

export default function DiagnosticCameraComponent(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const [issetCamera, setIssetCamera] = useState(true);
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
                setIssetCamera(true);
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(function (err) {
                setIssetCamera(false);
            });
    }, [chooseCameraType])

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
                    alignItems: 'center',
                    gap: "15px"
                }}>
                    <Icon28ChevronBack onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                    <Title>
                        Камера
                    </Title>
                </div>
            </Group>
            <Spacing size={20} />
            <Icon28CameraOutline onClick={changeChooseCameraType} />
            <Spacing size={20} />
            {!issetCamera && <Headline>
                Не удалось получить доступ к камере
            </Headline>}
            <video style={{
                width: "100%"
            }} ref={videoRef} autoPlay={true}></video>
        </Div>
    </Fragment>);
}