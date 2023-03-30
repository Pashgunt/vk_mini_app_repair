import { Div, Group, Spacing, Title, Search, CardScroll, Card, Headline, usePlatform } from "@vkontakte/vkui";
import { Icon28ChevronBack } from '@vkontakte/icons';
import { Fragment, useEffect, useRef, useState } from "react";
import { Icon20AddSquareOutline, Icon20DeleteOutline, Icon16SearchOutline } from '@vkontakte/icons';
import MainFixedHeader from "../MainFixedHeader";

export default function MyDevicesComponents(props) {
    const [deviceList, setDeviceList] = useState([]);
    const [searchDeviceList, setSearchDeviceList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [isScroll, setIsScroll] = useState(false);

    const headerRef = useRef(null);
    let [
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

    useEffect(() => {
        if (navigator.userAgent.match(/iPad/i)) setSearchCategory('ipad')

        if (navigator.userAgent.match(/iPhone/i)) setSearchCategory('iphone')

        const startAsyncFunc = async () => {
            const res = await state.api.getDeviceList();
            setDeviceList(res.data);
            setSearchDeviceList(res.data);
        }
        startAsyncFunc();
    }, []);


    const searchDevice = function (event) {
        setSearchDeviceList(deviceList);
        let value = event.target.value;
        setSearchValue(value);
        if (!value) return;
        value = value.toLowerCase();
        if (searchCategory) {
            let data = {};
            data[searchCategory] = deviceList[searchCategory].filter(device => device.toLowerCase().includes(value));
            setSearchDeviceList(data)
        } else {
            setSearchDeviceList(Object.values(deviceList).map(deviceItems => {
                return deviceItems.filter(device => device.toLowerCase().includes(value))
            }));
        }
    }

    const chooseCategory = function (_, key) {
        if (key) {
            setSearchCategory(key);
        }
        if (key === searchCategory) {
            setSearchCategory('')
        }
    }

    const deciderForAddOrRemove = (device, deviceType) => {
        return myDeviceList[deviceType]?.includes(device) ? confirmDelete(userData.id, device, deviceType) : confirmAdd(userData.id, device, deviceType);
    }

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY,
            headerHeight = +headerRef.current?.offsetHeight;
        if (scrollTop > headerHeight) {
            setIsScroll(true);
        }
        if (scrollTop < 10) {
            setIsScroll(false);
        }
    })

    const platform = usePlatform();

    return (
        <Fragment>
            <Group mode="plain" style={{
                minHeight: "100vh"
            }}>
                {isScroll && <MainFixedHeader
                    state={state}
                    title={"Добавить устройство"}
                    changeShowActiveModal={null}
                    showProfile={false}
                />}
                <Group mode="plain" separator="hide" >
                    <Div>
                        <div style={{
                            paddingTop: platform === 'ios' ? '50px' : '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: "15px"
                        }}
                            ref={headerRef}
                        >
                            <div>
                                <Icon28ChevronBack onClick={() => {
                                    addActionLogItem("");
                                    changeShowActivePanel(state.panels.panel_mainScreen, state)
                                }} />
                            </div>
                            <Title>
                                Добавить устройство
                            </Title>
                        </div>
                    </Div>
                </Group>
                <Search style={{
                    paddingBottom: "0"
                }}
                    before={<Icon16SearchOutline />}
                    placeholder={state.components.addDeviceHeader.placeholder}
                    onKeyUp={searchDevice}
                />
                <Spacing size={15} />
                <CardScroll size={false}>
                    {
                        Object.keys(state.components.addDeviceHeader.deviceCards.types).map((title) => {
                            return (
                                <Card onClick={event => chooseCategory(event, state.components.addDeviceHeader.deviceCards.types[title]['img'])} key={state.components.addDeviceHeader.deviceCards.types[title]['img']}
                                    style={state.components.addDeviceHeader.deviceCards.types[title]['img'] === searchCategory ? {
                                        background: '#666',
                                        color: "white"
                                    } : {}}
                                >
                                    <Div style={state.components.addDeviceHeader.deviceCards.cardStyle}>
                                        <img src={state.images[state.components.addDeviceHeader.deviceCards.types[title]['img']]} width={state.components.addDeviceHeader.deviceCards.types[title]['width']} height={state.components.addDeviceHeader.deviceCards.types[title]['height']} alt="image" />
                                        <Headline weight="regular" style={state.components.addDeviceHeader.deviceCards.cardHeaderStyle}>
                                            {title}
                                        </Headline>
                                    </Div>
                                </Card>
                            );
                        })
                    }
                </CardScroll>
                <Spacing size={10} />
                {
                    actionsLog.length ?
                        <Fragment>
                            <Div>
                                <Headline weight="regular" style={{
                                    color: "#666"
                                }}>
                                    {actionsLog}
                                </Headline>
                            </Div>
                        </Fragment> : ''
                }
                <Div>
                    <Title level="3">
                        Список устройств:
                    </Title>
                </Div>
                <Div>
                    {searchDeviceList ?
                        searchCategory ?
                            searchDeviceList[searchCategory]?.map((device, index) => {
                                return (<>
                                    <Card key={index} onClick={() => deciderForAddOrRemove(device, searchCategory)}>
                                        <Div style={!myDeviceList[searchCategory]?.includes(device) ? {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            color: "#888",
                                        } : {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            color: "white",
                                            background: "#666",
                                            borderRadius: "8px"
                                        }}>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: device.replace(searchValue, `<span style="color: black">${searchValue}</span>`) }}>
                                            </div>
                                            {myDeviceList[searchCategory]?.includes(device) ? <Icon20DeleteOutline onClick={() => deciderForAddOrRemove(device, searchCategory)} /> : <Icon20AddSquareOutline onClick={() => deciderForAddOrRemove(device, searchCategory)} />}
                                        </Div>
                                    </Card>
                                    <Spacing size={10} />
                                </>
                                );
                            })
                            : <Headline style={{
                                color: "#999"
                            }}>
                                Для получения списка, выберите группу, интересующих устройств
                            </Headline>
                        : ""}
                </Div>
                <Spacing size={40} />
            </Group>
        </Fragment>
    );
}