import React, { useEffect, useState } from "react";
import { Div, Group, Header, Link, Spacing, Text, Title, Card, Separator } from "@vkontakte/vkui";
import { Icon16Pen, Icon36Add } from "@vkontakte/icons";
import ModalPageCardDevice from "./ModalPageCardDevice";

export default function ModalPageChooseDevice({
    state,
    problem,
    changeShowActiveModal,
    changeShowActivePanel,
    userData,
    setChooseDevice
}) {

    const [devices, setDevices] = useState({});

    useEffect(() => {
        const startAsyncFunc = async () => {
            const res = await state.api.getAllDeviceListForUser(userData.id);
            setDevices(res.data);
        }
        startAsyncFunc();
    }, [])

    const cards = state.modal.chooseDevice.cardDevice;

    return (
        <Group>
            <Header>
                <div style={state.modal.chooseDevice.cardProblemStyle}>
                    <Text weight="3" size="3" style={state.modal.chooseDevice.textProblemStyle}
                        onClick={() => changeShowActiveModal(state.panels.modal_searchProblem, state)}
                    >
                        {problem}
                        <Icon16Pen fill="#2688eb" />
                    </Text>
                </div>
            </Header>
            <Spacing size={12} />
            <Div>
                <Title level="2">
                    {state.modal.chooseDevice.title}
                </Title>
            </Div>
            <Spacing size={0} />

            <Div style={{ paddingBottom: "0" }}>
                <Text weight="1" style={{ color: "#999", fontWeight: "500" }}>
                    {state.modal.chooseDevice.subTitleDevice}
                </Text>
            </Div>
            {
                Object.keys(devices).length ? <Div><Group mode="card">
                    {
                        Object.keys(devices).map(deviceType => {
                            return devices[deviceType].map((deviceName, index) => {
                                return <>
                                    <ModalPageCardDevice
                                        key={index}
                                        style={cards.style}
                                        title={deviceName}
                                        imageName={deviceType}
                                        image={state.images}
                                        width={state.sizes[deviceType].sm.width}
                                        height={state.sizes[deviceType].sm.height}
                                        changeShowActiveModal={changeShowActiveModal}
                                        props={state}
                                        userData={userData}
                                        setChooseDevice={setChooseDevice}
                                    />
                                    {Object.keys(devices).length - 1 !== index && <Separator />}
                                </>
                            })
                        })
                    }
                </Group></Div> :
                    <Group>
                        <Div>
                            <Card
                                onClick={() => {
                                    changeShowActivePanel(state.panels.panel_deviceScreen, state)
                                    changeShowActiveModal(null, state)
                                }}
                            >
                                <div style={state.modal.chooseDevice.carAddDeviceStyle}>
                                    <Link href="">
                                        <Icon36Add /><br />
                                        {state.modal.chooseDevice.carAddDeviceText}
                                    </Link>
                                </div>
                            </Card>
                        </Div>
                    </Group>
            }
            <Spacing size={0} />
            <Div style={{ paddingBottom: "0" }}>
                <Text weight="1" style={{ color: "#999", fontWeight: "500" }}>
                    {state.modal.chooseDevice.subTitle}
                </Text>
            </Div>
            <Div>
                <Group mode="card">
                    {
                        Object.keys(cards.images).map((title, index) => {
                            return <>
                                <ModalPageCardDevice
                                    key={index}
                                    style={cards.style}
                                    title={title}
                                    imageName={cards.images[title].image}
                                    image={state.images}
                                    width={cards.images[title].width}
                                    height={cards.images[title].height}
                                    changeShowActiveModal={changeShowActiveModal}
                                    props={state}
                                    userData=''
                                    setChooseDevice={setChooseDevice}
                                />
                                {Object.keys(cards.images).length - 1 !== index && <Separator />}
                            </>
                        })
                    }
                </Group>
            </Div>
        </Group>
    );
}