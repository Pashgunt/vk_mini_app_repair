import React from "react";
import { Card, Div, Headline } from "@vkontakte/vkui";

export default function MainCardAnotherProduct({
    state,
    title,
    image,
    imageName,
    panel
}) {
    return (
        <Card
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Div style={state.components.mainAnotherProducts.cardStyle}>
                <img src={image[imageName]} width={28} height={28} alt="insurance" />
                <Headline weight="regular" style={state.components.mainAnotherProducts.cardHeaderStyle}>
                    {title}
                </Headline>
            </Div>
        </Card>
    );
}