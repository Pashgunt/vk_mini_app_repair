import { ModalPage, ModalRoot, ModalPageHeader, PanelHeaderButton, PanelHeaderClose } from "@vkontakte/vkui";
import ModalSearchProblemPage from "./ModalSearchProblemPage";
import ModalPageCreateRequestRepair from "./ModalPageCreateRequestRepair";
import ModalPageChooseDevice from "./ModalPageChooseDevice";
import ModalPageFeedBack from "./ModalPageFeedBack";
import ModalPageFormForCallback from "./ModalPageFormForCallback";
import ModalPageFeedBackForm from "./ModalPageFeedBackForm";
import ModalPageProfile from "./ModalPageProfile";
import ModalPageGifts from "./ModalPageGifts";
import { useState } from "react";

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
        setHistory
    ] = props.data;

    const [isCorrectDataForConnect, setIsCorrectDataForConnect] = useState(true);
    const [isCorrectDataForSendFeedback, setIsCorrectDataForSendFeedback] = useState(false);
    const [isCorrectDataForProblem, setIsCorrectDataForProblem] = useState(false);

    return (
        <ModalRoot activeModal={state.activeModal}>
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