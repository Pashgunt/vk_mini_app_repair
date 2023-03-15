import React from "react";
import { FixedLayout, Group, Headline, Spacing, Title } from "@vkontakte/vkui";
import { Icon28Profile } from '@vkontakte/icons';

export default function MainFixedHeader({ state, title, changeShowActiveModal, showProfile = true }) {
    return (
        <FixedLayout vertical="top" style={{
            background: state.setBgColor(),
            borderBottom: state.setBgColor()
        }}>
            <Group mode="plain"
                style={{
                    background: state.setBgColor()
                }}>
                <div style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {showProfile && <Icon28Profile
                        fill='#2688eb'
                        style={{
                            position: "absolute",
                            left: "20px"
                        }}
                        onClick={() => changeShowActiveModal(state.panels.modal_profile, state)}
                    />}
                    <Headline level="2" style={{
                        textAlign: "center"
                    }} weight="3">
                        <Spacing size={5} />
                        <Title level="3">
                            {title}
                        </Title>
                        <Spacing size={5} />
                    </Headline>
                </div>
            </Group>
        </FixedLayout>
    );
}