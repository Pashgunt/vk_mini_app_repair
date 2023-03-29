import React from "react";
import { CardScroll, Group, Header, Spacing, Title } from "@vkontakte/vkui";
import { Icon20ChevronRightOutline } from "@vkontakte/icons";
import MainCardDiagnostic from "./MainCardDiagnostic";

export default function MainDiagnostic({ state, changeShowActivePanel, history, setHistory }) {
    const cards = state.components.diagnostics.tools;
    return (
        <Group mode="plain">
            <Header>
                <Title level="2" weight="2" style={{
                    display: "flex",
                    alignItems: "end",
                    gap: "5px"
                }} onClick={() => {
                    setHistory([...history, state.panels.panel_diagnosticItems])
                    changeShowActivePanel(state.panels.panel_diagnosticItems, state)
                }}>
                    {state.components.diagnostics.title} <Icon20ChevronRightOutline />
                </Title>
            </Header>
            <Spacing size={10} />
            <CardScroll size={false}>
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
            </CardScroll>
            <Spacing size={0} />
        </Group>
    );
}