import { Fragment, useState } from "react";
import { Group, Div, Spacing, Title, Card, Link, usePlatform } from "@vkontakte/vkui";
import { Icon28ChevronBack } from "@vkontakte/icons";
import { YMaps, Map, Placemark, FullscreenControl, GeolocationControl, ZoomControl } from "@pbe/react-yandex-maps";

export default function DiagnosticGPSComponent(props) {
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

    const [GPSdata, setGPSdata] = useState('');
    const [isCrashed, setIsCrashed] = useState(false);
    const [isCancel, setIsCancel] = useState(false);

    const getLocation = function () {
        navigator.geolocation.getCurrentPosition(function (pos) {
            let crd = pos.coords;
            if (crd.latitude == null) {
                setGPSdata({});
            } else {
                if (state.isCrashedTests && (Math.random() > 0.98 || myCrashedTests[userData.id]?.includes(state.activePanel))) {
                    async function fetchData() {
                        await state.api.createCrashedTestForUser(userData.id, state.activePanel)
                    }
                    try {
                        if (!myCrashedTests[userData.id]?.includes(state.activePanel)) {
                            fetchData();
                        }
                    } catch (e) { }
                    setIsCrashed(true);
                    setGPSdata({
                        "latitude": Math.floor(crd.latitude) + 10,
                        "longitude": Math.floor(crd.longitude) + 10,
                        "accuracy": Math.floor(crd.accuracy)
                    });
                    return;
                }
                setGPSdata({
                    "latitude": Math.floor(crd.latitude),
                    "longitude": Math.floor(crd.longitude),
                    "accuracy": Math.floor(crd.accuracy)
                });
            }
        });
    }

    const platform = usePlatform();

    const back = () => {
        if (isCrashed && !isCancel) {
            setProblem("Не ловит сеть");
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
        <Group mode="plain" style={{
            minHeight: "100vh"
        }}>
            <Div>
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
                            GPS
                        </Title>
                    </div>
                </Group>
            </Div>
            <Div>
                <Card onClick={getLocation}>
                    <div style={{
                        padding: "5%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Link href="">
                            <Title level="2">
                                Проверить GPS
                            </Title>
                        </Link>
                    </div>
                </Card>
                {!Object?.keys(GPSdata).length ? <>
                    <Spacing size={10} />
                    <Title level="2" style={{
                        color: "#666"
                    }}>Не удалось получить текущее метоположение</Title>
                </> : <>
                    <Spacing size={15} />
                    <Title level="2" style={{
                        color: "#666"
                    }}>Широта: {GPSdata.latitude} Долгота: {GPSdata.longitude} Плюс-минус {GPSdata.accuracy} метров.</Title>
                </>}
            </Div>
            <Div>
                {
                    Object.keys(GPSdata).length ?
                        <YMaps>
                            <Map style={{
                                width: "100%",
                                height: "65vh"
                            }} defaultState={{
                                center: [GPSdata.latitude, GPSdata.longitude],
                                zoom: 5
                            }}>
                                <Placemark geometry={[GPSdata.latitude, GPSdata.longitude]} />
                                <FullscreenControl options={{
                                    float: "left"
                                }} />
                                <GeolocationControl options={{
                                    float: 'left'
                                }} />
                                <ZoomControl />
                            </Map>
                        </YMaps>
                        : ''
                }
            </Div>
        </Group>
    </Fragment>);
}