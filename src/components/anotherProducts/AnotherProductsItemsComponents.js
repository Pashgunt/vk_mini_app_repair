import { Fragment } from "react";
import { Group, Div, Spacing, Title, CardGrid } from "@vkontakte/vkui";
import MainCardAnotherProduct from "../MainCardAnotherProduct";
import { Icon28ChevronBack } from "@vkontakte/icons";

export default function AnotherProductsItemsComponents(props) {
    const [
        state, , , , , changeShowActiveModal, changeShowActivePanel
    ] = props.data;

    const cards = state.components.mainAnotherProducts.productCards;

    return (<Fragment>
        <Group mode="plain" separator="hide" style={{
            minHeight: "100vh",
            background: "#fff"
        }}>
            <Div style={{
                display: 'flex',
                alignItems: 'center',
                gap: "15px"
            }}>
                <Icon28ChevronBack onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                <Title>
                    Другие продукты
                </Title>
            </Div>
            <Div style={{
                paddingTop: 0,
                paddingBottom: 0
            }}>
                <CardGrid size="m">
                    {
                        Object.keys(cards).map((title, index) => {
                            return (<Fragment key={index}><MainCardAnotherProduct
                                state={state}
                                title={title}
                                image={state.images}
                                imageName={cards[title]['img']}
                                panel={cards[title]['panel']}
                                changeShowActiveModal={changeShowActiveModal}
                            /></Fragment>);
                        })
                    }
                </CardGrid>
            </Div>
        </Group>
    </Fragment>);
}