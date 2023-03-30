import { Fragment, useState } from "react";
import { Group, Header, Title, Link, Spacing, Tabs, TabsItem, Card, Div, SimpleCell, Headline } from "@vkontakte/vkui";
import { Icon20ChevronRightOutline } from "@vkontakte/icons";

export default function MainRepairComponent({
    state,
    changeShowActivePanel,
    requestsForRepair,
    setChooseActiveRequestRepairItem,
    history,
    setHistory
}) {

    const [selectedTab, setSelectedTab] = useState('now-repair')

    const chooseDetailPageForRepairRequest = function (item) {
        setChooseActiveRequestRepairItem(item);
        setHistory([...history, state.panels.panel_orderRepairRequest])
        changeShowActivePanel(state.panels.panel_orderRepairRequest, state);
    }

    return (<Fragment>
        <Group mode="plain">
            <Header>
                <Title level="2" weight="2" onClick={() => {
                    setHistory([...history, state.panels.panel_diagnosticItems])
                    changeShowActivePanel(state.panels.panel_diagnosticItems, state)
                }}>
                    Сервисное обслуживание
                </Title>
            </Header>
            <Spacing size={0} />
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
            <Div style={{
                paddingBottom: 0
            }}>
                {
                    selectedTab === "now-repair" ?
                        (requestsForRepair?.current?.length ?
                            <>
                                {requestsForRepair?.current?.slice(0, 3)?.map((item, index) => {
                                    return (<div key={item + index}>
                                        <Card>
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
                                        {requestsForRepair?.current?.slice(0, 3).length - 1 !== index && <Spacing size={10} />}
                                    </div>
                                    );
                                })}
                                {
                                    requestsForRepair?.current?.length > 3 &&
                                    <>
                                        <Spacing size={10} />
                                        <Link onClick={() => {
                                            setHistory([...history, state.panels.panel_orderRepairCurrentAndAll])
                                            changeShowActivePanel(state.panels.panel_orderRepairCurrentAndAll, state)
                                        }}>Ещё <Icon20ChevronRightOutline width={16} height={16} /></Link>
                                    </>
                                }
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
                                {requestsForRepair?.all?.slice(0, 3)?.map((item, index) => {
                                    return (<div key={item + index}>
                                        <Card>
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
                                        {requestsForRepair?.current?.slice(0, 3).length - 1 !== index && <Spacing size={10} />}
                                    </div>
                                    );
                                })}
                                {
                                    requestsForRepair?.all?.length > 3 &&
                                    <>
                                        <Spacing size={10} />
                                        <Link onClick={() => {
                                            setHistory([...history, state.panels.panel_orderRepairCurrentAndAll])
                                            changeShowActivePanel(state.panels.panel_orderRepairCurrentAndAll, state)
                                        }}>Ещё <Icon20ChevronRightOutline width={16} height={16} /></Link>
                                    </>
                                }
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