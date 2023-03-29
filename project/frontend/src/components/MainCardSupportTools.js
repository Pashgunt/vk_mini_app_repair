import { Card, Div, Headline, SimpleCell } from "@vkontakte/vkui";
import React from "react";

export default function MainCardSupportTools({ state, title, image, imageName, panelName, changeShowActivePanel, history, setHistory }) {
    return (
        <Card onClick={() => {
            setHistory([...history, panelName])
            changeShowActivePanel(panelName, state)
        }}>
            <Div style={{ padding: "0px" }}>
                <SimpleCell before={
                    <img src={image[imageName]}
                        width="32px"
                        height="32px"
                        style={{ marginRight: "10px" }}
                    />
                }>
                    <Headline weight="regular" style={{
                        whiteSpace: "pre-wrap"
                    }}>
                        {title}
                    </Headline>
                </SimpleCell>
            </Div>
        </Card>
    );
}