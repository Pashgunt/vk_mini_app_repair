import { Fragment } from "react";
import { Group, Div, usePlatform, Title, CardGrid, Spacing } from "@vkontakte/vkui";
import MainCardAnotherProduct from "../MainCardAnotherProduct";
import { Icon28ChevronBack } from "@vkontakte/icons";

export default function AnotherProductsItemsComponents(props) {
    const [
        state, , , , , changeShowActiveModal, changeShowActivePanel
    ] = props.data;

    const cards = state.components.mainAnotherProducts.productCards;
    const platform = usePlatform();

    return (<Fragment>
        <Group mode="plain" separator="hide" style={{
            minHeight: "100vh",
            background: state.setBgColor()
        }}>
            <Div style={{
                paddingTop:  platform === 'ios' ? '50px' : '12px',
                display: 'flex',
                alignItems: 'center',
                gap: "15px"
            }}>
                <Icon28ChevronBack onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                <Title>
                    Другие продукты
                </Title>
            </Div>
            <Spacing size={15}/>
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