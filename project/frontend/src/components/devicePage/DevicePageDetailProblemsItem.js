import React, { Fragment } from "react";
import { Group, Div, Spacing, Title, Link, usePlatform, Separator } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon20ChevronRightOutline } from "@vkontakte/icons";

export default function DevicePageDetailProblemsItem(props) {
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

    const platform = usePlatform();

    const back = () => {

        let toPanel = history?.at(-2);
        setHistory([...history, toPanel])
        changeShowActivePanel(toPanel, state)
    }

    return (
        <Fragment>

            <Group mode="plain" separator="hide" style={{
                minHeight: "100vh",
            }}>
                <Div style={{
                    paddingTop: platform === 'ios' ? '50px' : '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <div>
                        <Icon28ChevronBack onClick={back} />
                    </div>
                    <Title>
                        {chooseProblemText}
                    </Title>
                </Div>

                <Div>
                    <Group mode="card">
                        {state.detailProblemList['detail'].map((value, index) => {
                            return (<>
                                <Div
                                    onClick={() => {
                                        setProblem(value);
                                        changeShowActiveModal(state.panels.modal_sendRequestForRepair, state);
                                        changeShowActivePanel(state.panels.panel_mainScreen, state);
                                    }}
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                    <div>
                                        {value}
                                    </div>
                                    <Icon20ChevronRightOutline />
                                </Div>
                                {index !== state.detailProblemList['detail'].length - 1 && <Separator />}
                            </>
                            )
                        })}
                    </Group>
                </Div>

                <Div>
                    <Group mode="card">
                        <Div>
                            <Link onClick={() => changeShowActiveModal(state.panels.modal_searchProblem, state)}>
                                Расскажите нам о проблеме
                            </Link>
                        </Div>
                    </Group>
                </Div>
            </Group>
        </Fragment>
    )
}