import { Fragment, useState } from "react";

export default function DiagnosticGPSComponent(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const [GPSdata, setGPSdata] = useState('');

    const getLocation = function () {
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
    }

    return (<Fragment>
        Hello
    </Fragment>);
}