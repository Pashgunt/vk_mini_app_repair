import { Group, Div, CardGrid, Card, Headline, Spacing } from "@vkontakte/vkui";
import { Fragment } from "react";
import { Icon28BlockOutline } from "@vkontakte/icons";

export default function ModalPageGifts({ state, requestsForRepair }) {
    return (
        <Fragment>
            <Group mode="plain">
                <Div>
                    <CardGrid size="s">
                        {
                            state.gifts.map(item => {
                                return (
                                    <Card
                                        style={{
                                            position: "relative"
                                        }}
                                    >
                                        {!item['access'] && <div style={{
                                            position: "absolute",
                                            top: "0",
                                            left: "0",
                                            width: "100%",
                                            height: "100%",
                                            zIndex: "100",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            background: "rgba(0,0,0,.8)",
                                            color: "white",
                                            borderRadius: "15px"
                                        }}>
                                            <div style={{
                                                width: "50%",
                                                margin: "0 auto",
                                                textAlign: "center",
                                                display:"flex",
                                                justifyContent:"center"
                                            }}>
                                                <Icon28BlockOutline fill="white" width={34} height={34} />
                                            </div>
                                        </div>}
                                        <Div style={{
                                            textAlign: "center"
                                        }}>
                                            <img alt="gift" src={state.images[item['img']]} width={50} height={50} />
                                            <Spacing size={15} />
                                            <Headline weight="regular">
                                                {item['title']}
                                            </Headline>
                                        </Div>
                                    </Card>
                                );
                            })
                        }
                    </CardGrid>
                </Div>
            </Group>
        </Fragment>
    );
}