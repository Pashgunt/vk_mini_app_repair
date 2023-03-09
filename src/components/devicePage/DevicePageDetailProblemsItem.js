import React, { Fragment } from "react";
import { Group, Div, Spacing, Title, Link, Card, Separator } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon20ChevronRightOutline } from "@vkontakte/icons";

export default function DevicePageDetailProblemsItem(props) {
    const [
        state, , , , , changeShowActiveModal, changeShowActivePanel, , , , setProblem, , chooseProblemText,
    ] = props.data;

    return (
        <Fragment>

            <Group mode="plain" separator="hide" style={{
                minHeight: "100vh",
            }}>
                <Div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <Icon28ChevronBack onClick={() => changeShowActivePanel(state.panels.panel_deviceInnerPage, state)} />
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