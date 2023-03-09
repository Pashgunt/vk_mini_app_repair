import { Fragment, useEffect, useState } from "react";
import { Div, Group, Spacing, Title } from "@vkontakte/vkui";
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
        state, , , , , , changeShowActivePanel, , , , , , , , , , ,
    ] = props.data;

    const [GPSdata, setGPSdata] = useState('');

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

    return (<Fragment>
        <Group mode="plain" separator="hide" style={{
            minHeight: "100vh",
            background: "#fff"
        }}>
            <Div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Icon28ChevronBack onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                <Spacing size={10} />
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
                        center: [GPSdata.latitude, GPSdata.longitude],
                        zoom: 5
                    }}>
                        <Placemark
                            geometry={[GPSdata.latitude, GPSdata.longitude]}
                            properties={{
                                hintContent: 'Собственный значок метки',
                                balloonContent: 'Это красивая метка'
                            }}
                        />
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