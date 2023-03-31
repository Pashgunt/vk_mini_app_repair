import { Fragment, useState } from "react";
import { Group, Div, Spacing, Title, CustomSelect, FormItem, usePlatform, Headline, Card, CardGrid, Button, SimpleCell, Tabs, TabsItem } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon20ChevronRightOutline } from "@vkontakte/icons";

export default function RepairPageComponent(props) {
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

    const [selectedTab, setSelectedTab] = useState('now-repair')

    const chooseDetailPageForRepairRequest = function (item) {
        setChooseActiveRequestRepairItem(item);
        changeShowActivePanel(state.panels.panel_orderRepairRequest, state);
    }

    const platform = usePlatform();

    const back = () => {
        history.pop();
        let toPanel = history?.at(-1);
        setHistory([...history])
        changeShowActivePanel(toPanel, state)
    }

    return (<Fragment>
        <Group mode="plain" style={{
            minHeight: "100vh",
            background: state.setBgColor()
        }}>
            <Div style={{
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
                    Сервисное обслуживание
                </Title>
            </Div>
            <Tabs>
                <TabsItem
                    selected={selectedTab === 'now-repair'}
                    onClick={() => setSelectedTab('now-repair')}
                    id="tab-now-repair"
                    aria-controls="tab-now-repair"
                >
                    Текущий
                </TabsItem>
                <TabsItem
                    selected={selectedTab === 'all-repair'}
                    onClick={() => setSelectedTab('all-repair')}
                    id="tab-all-repair"
                    aria-controls="tab-all-repair"
                >
                    Все
                </TabsItem>
            </Tabs>
            <Spacing size={10} />
            <Div style={{
                paddingTop: 0,
                paddingBottom: 0
            }}>
                {
                    selectedTab === "now-repair" ?
                        (requestsForRepair?.current?.length ?
                            <>
                                <CardGrid size="l">
                                    {requestsForRepair?.current?.map((item, index) => {
                                        return (
                                            <Card key={index}>
                                                <Div style={{ padding: "0px" }} onClick={() => chooseDetailPageForRepairRequest(item)}>
                                                    <SimpleCell after={
                                                        <Icon20ChevronRightOutline />
                                                    }>
                                                        <Headline weight="regular" style={{
                                                            whiteSpace: "pre-wrap"
                                                        }}>
                                                            {item.device} {item.problem}
                                                        </Headline>
                                                    </SimpleCell>
                                                </Div>
                                            </Card>

                                        );
                                    })}
                                </CardGrid>
                            </>
                            :
                            <Div style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                color: "#999"
                            }}>
                                Отсутствуют
                            </Div>
                        )
                        :
                        (requestsForRepair?.all?.length ?
                            <>
                                <CardGrid size="l">
                                    {requestsForRepair?.all?.map((item, index) => {
                                        return (
                                            <Card key={index}>
                                                <Div style={{ padding: "0px" }} onClick={() => chooseDetailPageForRepairRequest(item)}>
                                                    <SimpleCell after={
                                                        <Icon20ChevronRightOutline />
                                                    }>
                                                        <Headline weight="regular" style={{
                                                            whiteSpace: "pre-wrap"
                                                        }}>
                                                            {item.device} {item.problem}
                                                        </Headline>
                                                    </SimpleCell>
                                                </Div>
                                            </Card>

                                        );
                                    })}
                                </CardGrid>
                            </>
                            :
                            <Div style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                color: "#999"
                            }}>
                                Отсутствуют
                            </Div>
                        )
                }
            </Div>
        </Group>
    </Fragment>);
}