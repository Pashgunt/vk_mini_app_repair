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
        state, , , , , , changeShowActivePanel, , , , , , , , , , ,
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

    return (<Fragment>
        <Group mode="plain" separator="hide" style={{
            minHeight: "100vh",
            background: state.setBgColor()
        }}>
            <Div style={{
                paddingTop:  platform === 'ios' ? '50px' : '12px',
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
                        center: [59.935243, 30.327481],
                        zoom: 10
                    }}>
                        {state.servicePlacemarks.map(item => {
                            return (
                                <Placemark
                                    geometry={item.coords}
                                    properties={item.properties}
                                    options={item.options}
                                    modules={
                                        ['geoObject.addon.balloon', 'geoObject.addon.hint']
                                    }
                                />
                            );
                        })}
                        {state.engineerPlacemarks.map(item => {
                            return (
                                <Placemark
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