import React from "react";
import { Card, Div, Headline } from "@vkontakte/vkui";
import { Icon28BlockOutline } from '@vkontakte/icons';

export default function MainCardAnotherProduct({
    state,
    title,
    image,
    imageName,
    panel,
    changeShowActiveModal
}) {
    return (
        <Card
            style={{
                position: 'relative',
            }}
            onClick={() => panel && changeShowActiveModal(panel, state)}
        >
            {!panel && <div style={{
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
                <Icon28BlockOutline fill="white" width={34} height={34} />
            </div>}
            <Div style={state.components.mainAnotherProducts.cardStyle}>
                <img src={image[imageName]} width={28} height={28} alt="insurance" />
                <Headline weight="regular" style={state.components.mainAnotherProducts.cardHeaderStyle}>
                    {title}
                </Headline>
            </Div>
        </Card>
    );
}