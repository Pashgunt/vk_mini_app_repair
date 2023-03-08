import { Fragment, useEffect, useState } from "react";
import {Group} from "@vkontakte/vkui";
import bridge from '@vkontakte/vk-bridge';

export default function SupportNearestMastersComponent(props) {
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
            {GPSdata}
        </Group>

    </Fragment>);
}