import React, { Fragment } from "react";
import { Group, Div, usePlatform, Title, CardGrid, Spacing } from "@vkontakte/vkui";
import MainCardDiagnostic from "../MainCardDiagnostic";
import { Icon28ChevronBack } from "@vkontakte/icons";

export default function DiagnosticItemsComponents(props) {

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

    const cards = state.components.diagnostics.tools;

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
                background: state.setBgColor()
            }}>
                <Div style={{
                    paddingTop: platform === 'ios' ? '50px' : '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: "15px"
                }}>
                    <div>
                        <Icon28ChevronBack onClick={back} />
                    </div>
                    <Title>
                        Диагностика
                    </Title>
                </Div>
                <Spacing size={15} />
                <Div style={{
                    paddingTop: 0,
                    paddingBottom: 0
                }}>
                    <CardGrid size="m">
                        {
                            Object.keys(cards).map((title, index) => {
                                return <MainCardDiagnostic
                                    title={title}
                                    key={index}
                                    state={state}
                                    image={state.images}
                                    imageName={cards[title]['img']}
                                    panel={cards[title]['panel']}
                                    changeShowActivePanel={changeShowActivePanel}
                                    history={history}
                                    setHistory={setHistory}
                                />
                            })
                        }
                    </CardGrid>
                </Div>
            </Group>
        </Fragment>
    );
}