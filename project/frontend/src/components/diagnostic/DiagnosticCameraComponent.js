import { Fragment, useEffect, useRef, useState } from "react";
import { Group, Div, Spacing, Title, Headline, usePlatform } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon28CameraOutline } from "@vkontakte/icons";

export default function DiagnosticCameraComponent(props) {
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

    const platform = usePlatform();

    const back = () => {
        history.pop();
        let toPanel = history?.at(-1);
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