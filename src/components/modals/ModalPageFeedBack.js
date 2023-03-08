import { Fragment } from "react";
import { Div, Group, Separator, Button, Spacing } from "@vkontakte/vkui";
import { Icon20ChevronRightOutline } from "@vkontakte/icons";

export default function ModalPageFeedBack({ state, changeShowActiveModal }) {
    return (
        <Fragment>
            <Div>
                <Group mode="card">
                    <Div
                        onClick={() => changeShowActiveModal(state.panels.modal_feedbackForm, state)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: '7px',
                            paddingBottom: '7px',
                        }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <span style={{
                                fontWeight: "600"
                            }}>
                                Отчёт о неполадках
                            </span>
                            <span style={{
                                fontWeight: "initial",
                                fontSize: "10px",
                                color: "#999"
                            }}>
                                Что-то не сработало
                            </span>
                        </div>
                        <Icon20ChevronRightOutline />
                    </Div>
                    <Separator />
                    <Div
                        onClick={() => changeShowActiveModal(state.panels.modal_feedbackForm, state)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: '7px',
                            paddingBottom: '7px',
                        }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <span style={{
                                fontWeight: "600"
                            }}>
                                Дизайн или простота использования
                            </span>
                            <span style={{
                                fontWeight: "initial",
                                fontSize: "10px",
                                color: "#999"
                            }}>
                                Проблемы с удобством использования
                            </span>
                        </div>
                        <Icon20ChevronRightOutline />
                    </Div>
                    <Separator />
                    <Div
                        onClick={() => changeShowActiveModal(state.panels.modal_feedbackForm, state)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: '7px',
                            paddingBottom: '7px',
                        }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <span style={{
                                fontWeight: "600"
                            }}>
                                Запрос функции
                            </span>
                            <span style={{
                                fontWeight: "initial",
                                fontSize: "10px",
                                color: "#999"
                            }}>
                                Идеи по улучшению приложения
                            </span>
                        </div>
                        <Icon20ChevronRightOutline />
                    </Div>
                </Group>
                <Spacing size={10} />
                <Button style={{
                    marginRight: "10px"
                }}
                    onClick={() => changeShowActiveModal(state.panels.modal_profile, state)}
                >
                    Назад
                </Button>
            </Div>
        </Fragment>
    );
}