import React, { Fragment } from 'react';
import { CardScroll, Group, Header, Link, Spacing, Title } from "@vkontakte/vkui";
import { Icon20ChevronRightOutline } from "@vkontakte/icons";
import MainCardAnotherProduct from "./MainCardAnotherProduct";
export default function MainAnotherProducts({ state, changeShowActivePanel }) {
    const cards = state.components.mainAnotherProducts.productCards;
    return (
        <Group mode="plain">
            <Header>
                <Title level="2" weight="2">
                    <Link href="" style={{ color: "black" }} onClick={() => changeShowActivePanel(state.panels.panel_anotherProductItems, state)}>
                        {state.components.mainAnotherProducts.title} <Icon20ChevronRightOutline />
                    </Link>
                </Title>
            </Header>
            <Spacing size={10} />
            <CardScroll size={false}>
                {
                    Object.keys(cards).map((title, index) => {
                        return (
                        <Fragment key={index}><MainCardAnotherProduct
                            state={state}
                            title={title}
                            image={state.images}
                            imageName={cards[title]['img']}
                            panel={cards[title]['panel']}
                        /></Fragment>)
                    })
                }
            </CardScroll>
            <Spacing size={16} />
        </Group>
    );
}