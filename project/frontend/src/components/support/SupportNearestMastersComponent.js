import { Fragment, useEffect, useState } from "react";
import { Div, Group, Spacing, Title, usePlatform } from "@vkontakte/vkui";
import { Icon28ChevronBack } from "@vkontakte/icons";
import bridge from '@vkontakte/vk-bridge';
import {
    YMaps,
    Map,
    Placemark,
    FullscreenControl,
    GeolocationControl,
    ZoomControl
} from '@pbe/react-yandex-maps';

export default function SupportNearestMastersComponent(props) {
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

    const [GPSdata, setGPSdata] = useState('');
    const platform = usePlatform();
    useEffect(() => {
        bridge.send('VKWebAppGetGeodata')
            .then((data) => {
                if (data.available) {
                    setGPSdata({
                        "latitude": data.lat,
                        "longitude": data.long,
                        "accuracy": data.accuracy
                    });
                }
            })
            .catch((error) => {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    let crd = pos.coords;
                    if (crd.latitude == null) {
                        setGPSdata({});
                    } else {
                        setGPSdata({
                            "latitude": crd.latitude,
                            "longitude": crd.longitude,
                            "accuracy": crd.accuracy
                        });
                    }
                });
            });
    }, []);

    const back = () => {
        let toPanel = history?.at(-2);
        setHistory([...history, toPanel])
        changeShowActivePanel(toPanel, state)
    }

    return (<Fragment>
        <Group mode="plain" separator="hide" style={{
            minHeight: "100vh",
            background: state.setBgColor()
        }}>
            <Div style={{
                paddingTop: platform === 'ios' ? '50px' : '12px',
                display: 'flex',
                alignItems: 'center',
                gap: "15px"
            }}>
                <div>
                    <Icon28ChevronBack onClick={back} />
                </div>
                <Title style={{
                    marginLeft: "10px"
                }}>
                    Ближайшие мастера
                </Title>
            </Div>

            <Div>
                <YMaps>
                    <Map style={{
                        width: "100%",
                        height: "85vh"
                    }} defaultState={{
                        center: [59.935243, 30.327481],
                        zoom: 10
                    }}>
                        {state.servicePlacemarks.map((item, index) => {
                            return (
                                <Placemark
                                    key={index}
                                    geometry={item.coords}
                                    properties={item.properties}
                                    options={item.options}
                                    modules={
                                        ['geoObject.addon.balloon', 'geoObject.addon.hint']
                                    }
                                />
                            );
                        })}
                        {state.engineerPlacemarks.map((item, index) => {
                            return (
                                <Placemark
                                    key={index}
                                    geometry={item.coords}
                                    properties={item.properties}
                                    options={item.options}
                                    modules={
                                        ['geoObject.addon.balloon', 'geoObject.addon.hint']
                                    }
                                />
                            );
                        })}
                        <FullscreenControl options={{
                            float: "left"
                        }} />
                        <GeolocationControl options={{
                            float: 'left'
                        }} />
                        <ZoomControl />
                    </Map>
                </YMaps>
            </Div>
        </Group>

    </Fragment>);
}