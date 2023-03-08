import { ModalPage, ModalRoot, ModalPageHeader} from "@vkontakte/vkui";
import ModalSearchProblemPage from "./ModalSearchProblemPage";
import ModalPageCreateRequestRepair from "./ModalPageCreateRequestRepair";
import ModalPageChooseDevice from "./ModalPageChooseDevice";
import ModalPageFeedBack from "./ModalPageFeedBack";
import ModalPageFormForCallback from "./ModalPageFormForCallback";
import ModalPageFeedBackForm from "./ModalPageFeedBackForm";
import ModalPageProfile from "./ModalPageProfile";

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
    ] = props.data;
    return (
        <ModalRoot activeModal={state.activeModal}>
            <ModalPage
                id={state.panels.modal_formForCallback}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader>
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
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_feedbackForm}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader>
                        Форма отзыва
                    </ModalPageHeader>
                }
            >
                <ModalPageFeedBackForm
                    state={state}
                    changeShowActiveModal={changeShowActiveModal}
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_feedback}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader>
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
                    <ModalPageHeader>
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
                id={state.panels.modal_searchProblem}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"l"}
                header={
                    <ModalPageHeader>
                        Проблема
                    </ModalPageHeader>
                }
            >
                <ModalSearchProblemPage
                    state={state}
                    changeShowActiveModal={changeShowActiveModal}
                    problem={problem}
                    setProblem={setProblem}
                />
            </ModalPage>
            <ModalPage
                id={state.panels.modal_chooseDevice}
                onClose={() => changeShowActiveModal(null, state)}
                settlingHeight={100}
                size={"m"}
                header={
                    <ModalPageHeader>
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
                    <ModalPageHeader>
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
        </ModalRoot>
    );
}