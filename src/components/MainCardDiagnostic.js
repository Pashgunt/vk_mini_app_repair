import { Card, Div, Headline } from "@vkontakte/vkui";
import React from "react";

export default function MainCardDiagnostic(props) {
    return (
        <Card style={{
            display: "flex",
            justifyContent: "center",
        }}
            onClick={() => props.changeShowActivePanel(props.panel, props.state)}
        >
            <Div style={props.state.components.diagnostics.cardStyle}>
                <img src={props.image[props.imageName]} width={28} height={28} alt="insurance" />
                <Headline weight="regular" style={props.state.components.diagnostics.cardHeaderStyle}>
                    {props.title}
                </Headline>
            </Div>
        </Card>
    );
}