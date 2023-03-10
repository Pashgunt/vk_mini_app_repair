import React from "react";
import { CardScroll, Group, Header, Link, Spacing, Title } from "@vkontakte/vkui";
import { Icon20ChevronRightOutline } from "@vkontakte/icons";
import MainCardDiagnostic from "./MainCardDiagnostic";

export default function MainDiagnostic({ state, changeShowActivePanel }) {
    const cards = state.components.diagnostics.tools;
    return (
        <Group mode="plain">
            <Header>
                <Title level="2" weight="2" style={{
                    display: "flex",
                    alignItems: "end",
                    gap: "5px"
                }} onClick={() => changeShowActivePanel(state.panels.panel_diagnosticItems, state)}>
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
                        />
                    })
                }
            </CardScroll>
            <Spacing size={0} />
        </Group>
    );
}