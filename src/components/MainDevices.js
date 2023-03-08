import { Fragment } from 'react';
import {
    Card,
    CardScroll,
    Group,
    Header,
    Link,
    Spacing,
    Title
} from "@vkontakte/vkui";
import { Icon20ChevronRightOutline, Icon36Add } from "@vkontakte/icons";

export default function MainDevices({ state, userData, myDeviceList, changeShowActivePanel, setChooseDevice, setChooseDeviceType }) {
    return (
        <Fragment>
            <Group mode="plain">
                <Header>
                    <Title level="2" weight="2">
                        <Link href="" style={{ color: "black" }} onClick={() => changeShowActivePanel(state.panels.panel_deviceScreen, state)}>
                            {state.components.mainDevices.title} <Icon20ChevronRightOutline />
                        </Link>
                    </Title>
                </Header>
                <Spacing size={10} />
                <CardScroll size={false}>
                    <Card onClick={() => changeShowActivePanel(state.panels.panel_deviceScreen, state)} style={state.components.mainDevices.styleButton}>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <Link href="">
                                <Icon36Add /><br />
                                {state.components.mainDevices.button}
                            </Link>
                        </div>
                    </Card>
                    {
                        myDeviceList && Object.keys(myDeviceList).map(deviceType => {
                            return myDeviceList[deviceType].map(deviceName => {
                                return (
                                    <Card key={deviceType} onClick={() => {
                                        changeShowActivePanel(state.panels.panel_deviceInnerPage, state)
                                        setChooseDevice(`${deviceName} ${userData ? `(${userData.first_name})` : ''}`)
                                        setChooseDeviceType(deviceType)
                                    }}
                                        style={state.components.mainDevices.styleButton}
                                    >
                                        <div style={{
                                            textAlign: "center"
                                        }}>
                                            <img alt='device' src={state.images[deviceType]} width={state.sizes[deviceType].md.width} height={state.sizes[deviceType].md.height} />
                                            <Spacing size={16} />
                                            {deviceName} {userData ? `(${userData.first_name})` : ''}
                                        </div>
                                    </Card>
                                );
                            })
                        })
                    }
                </CardScroll>
                <Spacing size={2} />
            </Group>
        </Fragment>
    );
}