import React from "react";
import { Div, Group, Headline, Link, Spacing, Title } from "@vkontakte/vkui";
import { Icon16Pen, Icon36Phone, Icon24Chats, Icon24RobotOutline } from "@vkontakte/icons";

export default function ModalPageCreateRequestRepair({ state, problem, chooseDevice, changeShowActiveModal, changeShowActivePanel }) {
    return (
        <Group>
            <Div>
                <Headline>{chooseDevice}</Headline>
                <Spacing size={15} />
                <div style={state.modal.chooseDevice.cardProblemStyle}>
                    <Title level="3"
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        {problem}
                        <Icon16Pen fill="#2688eb" onClick={() => changeShowActiveModal(state.panels.modal_searchProblem, state)} />
                    </Title>
                </div>
                <Spacing size={30} />
                <Div style={{
                    background: "rgba(0,0,0,.05)",
                    borderRadius: "10px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <img src={state.images.repair} alt="repair" width={48} height={48} />
                    <Spacing size={10} />
                    <Title level="3">
                        Сдача в ремонт
                    </Title>
                    <Spacing size={10} />
                    <Headline level="1" style={{
                        textAlign: "center"
                    }}>
                        Вы можете связаться с нами по этой проблеме или оставить заявку при помощи инструментов, представленных ниже
                    </Headline>
                </Div>
                <Spacing size={20} />
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "6fr 6fr",
                    gap: "10px",
                }}>
                    <Div style={{
                        background: "rgba(0,0,0,.075)",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}>
                        <Link href="tel:78122141753">
                            <Icon36Phone />
                            Звонок
                        </Link>
                    </Div>
                    <Div style={{
                        background: "rgba(0,0,0,.075)",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}>
                        <Link href="#" onClick={() => {
                            changeShowActiveModal(null, state)
                            changeShowActivePanel(state.panels.panel_chatWithSupport, state)
                        }}>
                            <Icon24Chats width={36} height={36} />
                            Чат
                        </Link>
                    </Div>
                </div>
                <Spacing size={10} />
                <Div style={{
                    background: "rgba(0,0,0,.075)",
                    borderRadius: "10px",
                    textAlign: "center"
                }}>
                    <Link href="#" onClick={() => {
                        changeShowActiveModal(null, state)
                        changeShowActivePanel(state.panels.panel_orderRepair, state)
                    }}>
                        <Icon24RobotOutline width={36} height={36} />
                        Заказать ремонт
                    </Link>
                </Div>
            </Div>
        </Group>
    );
}