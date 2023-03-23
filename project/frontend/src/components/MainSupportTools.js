import React, { Fragment } from 'react';
import {
    Group,
    Header,
    Link,
    Spacing,
    Title,
    Div
} from "@vkontakte/vkui";
import MainCardSupportTools from "./MainCardSupportTools";

export default function MainSupportTools({ state, changeShowActivePanel, }) {
    const cards = state.components.mainSupportTools.supportCard;
    return (
        <Fragment>
            <Group mode="plain">
                <Header>
                    <Title level="2" weight="2" style={{
                        display: "flex",
                        alignItems: "end",
                        gap: "5px"
                    }}>
                        {state.components.mainSupportTools.title}
                    </Title>
                </Header>
                <Div style={{
                    paddingBottom: 0
                }}>
                    {
                        Object.keys(cards).map((title, index) => {
                            return (
                                <Fragment key={index}>
                                    <MainCardSupportTools
                                        state={state}
                                        title={title}
                                        image={state.images}
                                        imageName={cards[title]['img']}
                                        panelName={cards[title]['panel']}
                                        changeShowActivePanel={changeShowActivePanel}
                                    />
                                    {Object.keys(cards).length - 1 !== index && <Spacing size={10} />}
                                </Fragment>)
                        })
                    }
                </Div>
                <Spacing size={0} />
            </Group>
        </Fragment>
    );
}