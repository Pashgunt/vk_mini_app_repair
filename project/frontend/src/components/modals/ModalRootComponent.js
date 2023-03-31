import { ModalPage, ModalRoot, ModalPageHeader, PanelHeaderButton, ModalCard, Button } from "@vkontakte/vkui";
import ModalSearchProblemPage from "./ModalSearchProblemPage";
import ModalPageCreateRequestRepair from "./ModalPageCreateRequestRepair";
import ModalPageChooseDevice from "./ModalPageChooseDevice";
import ModalPageFeedBack from "./ModalPageFeedBack";
import ModalPageFormForCallback from "./ModalPageFormForCallback";
import ModalPageFeedBackForm from "./ModalPageFeedBackForm";
import ModalPageProfile from "./ModalPageProfile";
import ModalPageGifts from "./ModalPageGifts";
import { useState } from "react";
import { Icon56SlidersOutline, Icon56CommentsOutline } from "@vkontakte/icons";
export default function ModalRootComponent(props) {
    const [
        state,
        chooseDevice,
        userData,
        userPhone,
        problem,
        setProblem,
        changeShowActiveModal,
        changeShowActivePanel,
        setChooseDevice,
        setUserPhone,
        requestsForRepair,
        history,
        setHistory,
        activeModal
    ] = props.data;

    const [isCorrectDataForConnect, setIsCorrectDataForConnect] = useState(true);
    const [isCorrectDataForSendFeedback, setIsCorrectDataForSendFeedback] = useState(false);
    const [isCorrectDataForProblem, setIsCorrectDataForProblem] = useState(false);

    console.log(state.activeModal);

    return (
        <ModalRoot
            activeModal={activeModal}
            onClose={() => changeShowActiveModal(null, state)}
        >
            <ModalPage
                id={state.panels.modal_formForCallback}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader before={<PanelHeaderButton onClick={() => changeShowActiveModal(state.panels.modal_chooseDevice, state)}>
                        Назад
                    </PanelHeaderButton>}
                        after={<PanelHeaderButton onClick={() => {
                            isCorrectDataForConnect && changeShowActiveModal(state.panels.modal_sendRequestForRepair, state)
                        }}>
                            Далее
                        </PanelHeaderButton>}
                    >
                        Данные для связи
                    </ModalPageHeader>
                }
            >
                <ModalPageFormForCallback
                    state={state}
                    changeShowActiveModal={changeShowActiveModal}
                    userData={userData}
                    userPhone={userPhone}
                    setUserPhone={setUserPhone}
                    setIsCorrectDataForConnect={setIsCorrectDataForConnect}
                />
            </ModalPage >
            <ModalCard
                id={state.panels.modal_orderRepairShow}
                onClose={() => changeShowActiveModal(null, state)}
                icon={<Icon56CommentsOutline />}
                size={"m"}
                header="Проверьте своё устройство по всем направлениям"
                subheader="Для тестирования устройства желательно пройти каждый тест минимум 5 раз, если в течении какого-то теста обнаружится проблемы, то приложение автоматически предложит варианты исправления"
                actions={
                    <Button
                        size="l"
                        mode="primary"
                        stretched
                        onClick={() => {
                            changeShowActiveModal(null, state)
                            changeShowActivePanel(state.panels.panel_orderRepair, state)
                        }}
                    >
                        Перейти
                    </Button>
                }
            ></ModalCard>
            <ModalCard
                id={state.panels.modal_diagnosticShow}
                onClose={() => changeShowActiveModal(null, state)}
                icon={<Icon56SlidersOutline />}
                size={"m"}
                header="Проверьте своё устройство по всем направлениям"
                subheader="Для тестирования устройства желательно пройти каждый тест минимум 5 раз, если в течении какого-то теста обнаружится проблемы, то приложение автоматически предложит варианты исправления"
                actions={
                    <Button
                        size="l"
                        mode="primary"
                        stretched
                        onClick={() => changeShowActiveModal(null, state)}
                    >
                        Проверить
                    </Button>
                }
            ></ModalCard>
            <ModalPage
                id={state.panels.modal_feedbackForm}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader
                        before={
                            <PanelHeaderButton onClick={() => changeShowActiveModal(state.panels.modal_feedback, state)}>
                                Назад
                            </PanelHeaderButton>
                        }
                        after={
                            <PanelHeaderButton onClick={() => {
                                isCorrectDataForSendFeedback && changeShowActiveModal(null, state)
                            }}>
                                Отправить
                            </PanelHeaderButton>
                        }
                    >
                        Форма отзыва
                    </ModalPageHeader>
                }
            >
                <ModalPageFeedBackForm
                    state={state}
                    changeShowActiveModal={changeShowActiveModal}
                    setIsCorrectDataForSendFeedback={setIsCorrectDataForSendFeedback}
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_searchProblem}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"l"}
                header={
                    <ModalPageHeader
                        before={
                            <PanelHeaderButton onClick={() => changeShowActiveModal(null, state)}>
                                Назад
                            </PanelHeaderButton>
                        }
                        after={<PanelHeaderButton onClick={() => {
                            isCorrectDataForProblem && changeShowActiveModal(state.panels.modal_chooseDevice, state)
                        }}>
                            Далее
                        </PanelHeaderButton>}
                    >
                        Проблема
                    </ModalPageHeader>
                }
            >
                <ModalSearchProblemPage
                    state={state}
                    changeShowActiveModal={changeShowActiveModal}
                    problem={problem}
                    setProblem={setProblem}
                    setIsCorrectDataForProblem={setIsCorrectDataForProblem}
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_feedback}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader
                        before={<PanelHeaderButton onClick={() => changeShowActiveModal(state.panels.modal_profile, state)}>
                            Назад
                        </PanelHeaderButton>}
                    >
                        Отзыв о приложении
                    </ModalPageHeader>
                }
            >
                <ModalPageFeedBack
                    state={state}
                    changeShowActiveModal={changeShowActiveModal}
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_profile}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader
                        before={<PanelHeaderButton onClick={() => changeShowActiveModal(null, state)}>
                            Назад
                        </PanelHeaderButton>}
                    >
                        Профиль
                    </ModalPageHeader>
                }
            >
                <ModalPageProfile
                    state={state}
                    changeShowActiveModal={changeShowActiveModal}
                    userData={userData}
                    userPhone={userPhone}
                    setUserPhone={setUserPhone}
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_chooseDevice}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader before={
                        <PanelHeaderButton onClick={() => changeShowActiveModal(state.panels.modal_searchProblem, state)}>
                            Назад
                        </PanelHeaderButton>
                    }>
                        Устройство
                    </ModalPageHeader>
                }
            >
                <ModalPageChooseDevice
                    state={state}
                    problem={problem}
                    changeShowActiveModal={changeShowActiveModal}
                    changeShowActivePanel={changeShowActivePanel}
                    userData={userData}
                    setChooseDevice={setChooseDevice}
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_sendRequestForRepair}
                onClose={() => {
                    setProblem('')
                    changeShowActiveModal(null, state)
                }}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader
                        before={<PanelHeaderButton onClick={() => changeShowActiveModal(null, state)}>
                            Назад
                        </PanelHeaderButton>}
                    >
                        Помощь
                    </ModalPageHeader>
                }
            >
                <ModalPageCreateRequestRepair
                    state={state}
                    problem={problem}
                    chooseDevice={chooseDevice}
                    changeShowActiveModal={changeShowActiveModal}
                    changeShowActivePanel={changeShowActivePanel}
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_gifts}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"l"}
                header={
                    <ModalPageHeader
                        before={<PanelHeaderButton onClick={() => changeShowActiveModal(null, state)}>
                            Назад
                        </PanelHeaderButton>}
                    >
                        Подарки
                    </ModalPageHeader>
                }
            >
                <ModalPageGifts
                    state={state}
                    requestsForRepair={requestsForRepair}
                />
            </ModalPage>
        </ModalRoot >
    );
}