import React, { Fragment, useEffect } from 'react';
import { Group, Search, Title, Div, Spacing } from "@vkontakte/vkui";
import { Icon28Profile } from '@vkontakte/icons';

export default function MainHeader({ state, setIsScroll, changeShowActiveModal }) {

    const ref = React.createRef();

    useEffect(() => {
        window.addEventListener("scroll", function () {
            let scrollTop = window.scrollY,
                headerHeight = +ref.current?.offsetHeight;
            if (scrollTop > headerHeight) {
                setIsScroll(true);
            }
            if (scrollTop < 10) {
                setIsScroll(false);
            }
        })
    })

    return (
        <Fragment>
            {!navigator.appVersion.toLowerCase().includes('windows') ? <Spacing size={35} /> : ''}
            <Group mode="plain" getRootRef={ref}>
                <Div separator="false">
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Title level="1" style={{
                            textAlign: "left"
                        }}>
                            {state.components.mainHeader.title}
                        </Title>
                        <Icon28Profile
                            fill='#2688eb'
                            onClick={() => changeShowActiveModal(state.panels.modal_profile, state)}
                        />
                    </div>
                </Div>
                <Search style={{
                    paddingBottom: "0"
                }}
                    before=""
                    placeholder={state.components.mainHeader.placeholder}
                    onClick={() => changeShowActiveModal(state.panels.modal_searchProblem, state)}
                />
            </Group>
        </Fragment>
    );
}