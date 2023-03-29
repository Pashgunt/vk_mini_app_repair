import { Group, Div, Spacing, Title, Subhead, Search, Separator, usePlatform } from "@vkontakte/vkui";
import React, { Fragment, useEffect, useState } from "react";
import { Icon28ChevronBack, Icon20ChevronRightOutline } from "@vkontakte/icons";

export default function DevicePageComponent(props) {

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
    ] = props.data

    const [resultSearch, setResualSearch] = useState([]);

    useEffect(() => {
        let topicThemesOfSupport = Object.keys(state.themesOfSupport);
        topicThemesOfSupport?.forEach(theme => {
            if (chooseDevice.toLowerCase().includes(theme)) {
                setResualSearch(state.themesOfSupport[theme])
            }
        })
    }, []);

    const searchProblem = function (event) {
        let searchThemeOfSupport = state.themesOfSupport[chooseDeviceType];
        setResualSearch(state.themesOfSupport[chooseDeviceType])
        let value = event.target.value;
        if (!value) return;
        value = value.toLowerCase();
        let result = {};
        Object?.keys(searchThemeOfSupport).forEach((key) => {
            if (searchThemeOfSupport[key].toLowerCase().includes(value)) {
                result[key] = searchThemeOfSupport[key];
            }
        });
        setResualSearch(result);
    }

    const clickByProblemType = function (type, text) {
        setChooseProblemType(type);
        setChooseProblemText(text);
        changeShowActivePanel(state.panels.panel_deviceDetailPage, state)
    }

    const platform = usePlatform();

    const back = () => {
        
        let toPanel = history?.at(-2);
        setHistory([...history, toPanel])
        changeShowActivePanel(toPanel, state)
    }

    return (
        <Fragment>
            <Group mode="plain" style={{
                minHeight: "100vh"
            }}>
                <Group mode="plain" separator="hide">
                    <Div style={{
                        paddingTop: platform === 'ios' ? '50px' : '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: "15px"
                    }}>
                        <Icon28ChevronBack onClick={back} />
                        <Title>
                            {chooseDevice}
                        </Title>
                    </Div>
                </Group>
                <Group mode="plain" separator="hide">
                    <Div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <img src={state.images[chooseDeviceType]} alt="device" width={state.sizes[chooseDeviceType].lg.width} height={state.sizes[chooseDeviceType].lg.height} />
                        <Spacing size={20} />
                        <Title level="3">
                            {chooseDevice}
                        </Title>
                        <Spacing size={5} />
                        <Subhead style={{
                            color: "#999"
                        }}>
                            Ограниченная гарантия
                        </Subhead>
                    </Div>
                </Group>
                <Group mode="plain" separator="hide">
                    <Div style={{
                        paddingBottom: '5px'
                    }}>
                        <Title level="3">
                            Темы подержки
                        </Title>
                    </Div>
                    <Search style={{
                        paddingBottom: "0"
                    }}
                        onKeyUp={searchProblem}
                        before=""
                        placeholder="Расскажите нам о проблеме"
                    />
                </Group>
                <Div>
                    <Group mode="card">
                        {Object.entries(resultSearch).map(([index, theme]) => {
                            return (<>
                                <Div
                                    onClick={() => clickByProblemType(index, theme)}
                                    key={index.toString()}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                    <div>
                                        {theme}
                                    </div>
                                    <Icon20ChevronRightOutline />
                                </Div>
                                {resultSearch[Object.keys(resultSearch)[Object.keys(resultSearch).length - 1]] !== theme && <Separator />}
                            </>
                            )
                        })}
                    </Group>
                </Div>
            </Group>
        </Fragment>
    );
}