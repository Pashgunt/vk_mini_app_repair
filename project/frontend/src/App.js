import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    View,
    AdaptivityProvider,
    AppRoot,
    ConfigProvider,
    Panel,
    SplitLayout,
    Alert,
    WebviewType,
    PopoutWrapper,
    Button,
    Spacing,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainPanel from "./components/MainPanel";
import ModalRootComponent from "./components/modals/ModalRootComponent";
import MyDevicesComponents from './components/myDevices/MyDevicesComponent';
import DevicePageComponent from './components/devicePage/DevicePageComponent';
import DevicePageDetailProblemsItem from "./components/devicePage/DevicePageDetailProblemsItem";
import DiagnosticItemsComponents from "./components/diagnostic/DiagnosticItemsComponents";
import DiagnosticDisplayComponent from "./components/diagnostic/DiagnosticDisplayComponent";
import DiagnosticMultitouchComponents from './components/diagnostic/DiagnosticMultitouchComponents';
import DiagnosticDrawComponent from './components/diagnostic/DiagnosticDrawComponent';
import DiagnosticGPSComponent from './components/diagnostic/DiagnosticGPSComponent';
import DiagnosticCameraComponent from './components/diagnostic/DiagnosticCameraComponent';
import DiagnosticSoundComponent from './components/diagnostic/DiagnosticSoundComponent';
import DiagnosticMicroComponent from './components/diagnostic/DiagnosticMicroComponent';
import DiagnosticTouchScreenComponent from './components/diagnostic/DiagnosticTouchScreenComponent';
import DiagnosticPingComponent from './components/diagnostic/DiagnosticPingComponent';
import SupportChatComponent from './components/support/SupportChatComponent';
import SupportNearestMastersComponent from './components/support/SupportNearestMastersComponent';
import OrderRepairComponent from './components/orderRepair/OrderRepairComponent';
import RepairPageComponent from './components/orderRepair/RepairPageComponent';
import OrderRepairRequestComponent from './components/orderRepair/OrderRepairRequestComponent';
import AnotherProductsItemsComponents from './components/anotherProducts/AnotherProductsItemsComponents';
import { state } from "./redux/state";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
    const [activePanelView, setActivePanelVew] = useState(state.activePanelState);
    const [userData, setUserData] = useState({});
    const [userPhone, setUserPhone] = useState('');
    const [chooseDevice, setChooseDevice] = useState('');
    const [chooseDeviceType, setChooseDeviceType] = useState('');
    const [activeModal, setActiveModal] = useState(state.activeModalState);
    const [popout, setPopout] = useState(null);
    const [actionsLog, setActionsLog] = useState([]);
    const [chooseProblemType, setChooseProblemType] = useState(null);
    const [chooseProblemText, setChooseProblemText] = useState(null);
    const [problem, setProblem] = useState('');
    const [myDeviceList, setMyDeviceList] = useState({});
    const [requestsForRepair, setRequestsForRepair] = useState([]);
    const [chooseActiveRequestRepairItem, setChooseActiveRequestRepairItem] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [history, setHistory] = useState([state.panels.panel_mainScreen]);
    const [showPageDiagnostic, setShowPageDiagnostic] = useState(false);

    const changeShowActiveModal = function (newModal, state) {
        setActiveModal(newModal);
        state.activeModalState = newModal;
    }

    const changeShowActivePanel = function (newPanel, state) {
        setActivePanelVew(newPanel);
        state.activePanelState = newPanel;
    }

    const addActionLogItem = (value) => {
        setActionsLog([value]);
        setPopout(null);
    };

    const closePopout = () => {
        setPopout(null);
    };

    const setShowSuccessAddedDevice = (deviceType, device) => {
        setPopout(<PopoutWrapper>
            <div style={{
                backgroundColor: '#FFF',
                borderRadius: 8,
                position: 'relative',
                padding: '24px',
                width: "90%",
                textAlign: "center"
            }}>
                <h5>Вы успешно добавили своё первое устройство !</h5>
                <Spacing size={20} />
                <img src={state.images[deviceType]} alt='device' width={state.sizes[deviceType]?.lg?.width} height={state.sizes[deviceType]?.lg?.height} />
                <Spacing size={20} />
                <div style={{
                    fontSize: "24px",
                }}>
                    {device}
                </div>
                <Spacing size={20} />
                <Button size="l" appearance="positive" stretched onClick={() => {
                    setPopout(null);
                    changeShowActivePanel(state.panels.panel_diagnosticItems, state);
                    setShowPageDiagnostic(true);
                }}>
                    Продолжить
                </Button>
            </div>
        </PopoutWrapper>);
    }

    const confirmAdd = function (userID, device, deviceType) {
        setPopout(
            <Alert
                actions={[
                    {
                        title: 'Отмена',
                        autoClose: true,
                        mode: 'cancel',
                        action: () => closePopout()
                    },
                    {
                        title: 'Добавить устройство',
                        mode: 'destructive',
                        autoClose: true,
                        action: async () => {
                            setShowLoader(true)
                            let result = await state.api.addDeviceForUser(userID, device);
                            if (result.data === "success") {
                                setShowSuccessAddedDevice(deviceType, device);
                                let copyOfMyDeviceList = Object.assign({}, myDeviceList);
                                if (deviceType in copyOfMyDeviceList) {
                                    copyOfMyDeviceList[deviceType].push(device);
                                } else {
                                    copyOfMyDeviceList[deviceType] = [device];
                                }
                                setMyDeviceList(copyOfMyDeviceList);
                                setHistory([...history, state.panels.panel_mainScreen]);
                                changeShowActivePanel(state.panels.panel_mainScreen, state);
                                setShowLoader(false)
                            } else {
                                addActionLogItem(`При добавлении устройства ${device} в Ваш список произошла ошибка`);
                                setShowLoader(false)
                            }
                        },
                    },
                ]}
                actionsLayout="horizontal"
                onClose={closePopout}
                header="Добавление устройства"
                text='Вы уверены, что хотите добавить устройство в список Ваших устройств?'
            />,
        );
    }

    const confirmDelete = function (userID, device, deviceType) {
        setPopout(
            <Alert
                actions={[
                    {
                        title: 'Отмена',
                        autoClose: true,
                        mode: 'cancel',
                        action: () => closePopout()
                    },
                    {
                        title: 'Удалить',
                        autoClose: true,
                        mode: 'destructive',
                        action: async () => {
                            setShowLoader(true)
                            let result = await state.api.removeDeviceForUser(userID, device);
                            if (result.data === "success") {
                                let copyOfMyDeviceList = Object.assign({}, myDeviceList);
                                copyOfMyDeviceList[deviceType] = copyOfMyDeviceList[deviceType].filter(myDeviceItem => myDeviceItem !== device)
                                setMyDeviceList(copyOfMyDeviceList);
                                setHistory([...history, state.panels.panel_mainScreen]);
                                changeShowActivePanel(state.panels.panel_mainScreen, state);
                                setShowLoader(false)
                            } else {
                                addActionLogItem(`При удалении устройства ${device} из Вашего списка произошла ошибка`);
                                setShowLoader(false)
                            }
                        },
                    },
                ]}
                actionsLayout="horizontal"
                onClose={closePopout}
                header="Удаление устройства"
                text="Вы уверены, что хотите удалить это устройство из списка Ваших устройств?"
            />,
        );
    }

    useEffect(async () => {
        const resMyDevice = await state.api.getAllDeviceListForUser(161450796);
        if (Array.isArray(resMyDevice.data)) {
            setHistory([...history, state.panels.panel_deviceScreen]);
            changeShowActivePanel(state.panels.panel_deviceScreen, state)
        }
        setMyDeviceList(resMyDevice.data);
        const resMyRequestsRepair = await state.api.getRequestsForRepairDevice(161450796);
        setRequestsForRepair(resMyRequestsRepair.data);
        setUserData({
            id: 161450796,
            first_name: "Pavel"
        });

        bridge.send('VKWebAppGetUserInfo')
            .then(async response => {
                const resMyDevice = await state.api.getAllDeviceListForUser(response.id);
                if (Array.isArray(resMyDevice.data)) {
                    setHistory([...history, state.panels.panel_mainScreen]);
                    changeShowActivePanel(state.panels.panel_deviceScreen, state)
                }
                setMyDeviceList(resMyDevice.data);
                const resMyRequestsRepair = await state.api.getRequestsForRepairDevice(response.id);
                setRequestsForRepair(resMyRequestsRepair.data);
                setUserData(response);
            })
            .catch(error => error)

        bridge.send('VKWebAppGetPhoneNumber')
            .then((data) => {
                if (data.phone_number) {
                    setUserPhone(data.phone_number);
                }
            })
            .catch((error) => {
                if (error.error_type === 'client_error') {
                    changeShowActiveModal(state.panels.modal_profile, state);
                }
            });
    }, [])

    const propsForModal = [
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
    ];

    const propsForPanel = [
        state,
        userData,
        myDeviceList,
        setChooseDevice,
        setChooseDeviceType,
        changeShowActiveModal,
        changeShowActivePanel,
        confirmAdd,
        confirmDelete,
        actionsLog,
        setProblem,
        chooseProblemType,
        chooseProblemText,
        chooseDevice,
        chooseDeviceType,
        setChooseProblemType,
        setChooseProblemText,
        userPhone,
        problem,
        setMyDeviceList,
        addActionLogItem,
        requestsForRepair,
        setRequestsForRepair,
        chooseActiveRequestRepairItem,
        setChooseActiveRequestRepairItem,
        history,
        setHistory
    ];

    if (showPageDiagnostic) {
        changeShowActiveModal("TEST", state);
        setShowPageDiagnostic(false);
    }

    return (
        <ConfigProvider
            appearance={state.schema}
            transitionMotionEnabled={WebviewType.VKAPPS}>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout
                        popout={popout}
                        modal={<ModalRootComponent data={propsForModal} />}
                        style={{
                            background: state.setBgColor(),
                            height: "max-content"
                        }}>
                        {showLoader && <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            background: "rgba(0,0,0,.75)",
                            zIndex: '100',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center"
                        }}>
                            <ClipLoader
                                color={"#FFF"}
                                size={60}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>}
                        <View activePanel={activePanelView} style={{
                            background: state.setBgColor(),
                            height: "max-content"
                        }}>
                            <Panel id={state.panels.panel_mainScreen}>
                                <MainPanel data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deviceScreen}>
                                <MyDevicesComponents data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deviceInnerPage}>
                                <DevicePageComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deviceDetailPage}>
                                <DevicePageDetailProblemsItem data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_diagnosticItems}>
                                <DiagnosticItemsComponents data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticDisplay}>
                                <DiagnosticDisplayComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticMultitouch}>
                                <DiagnosticMultitouchComponents data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticLines}>
                                <DiagnosticDrawComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticTochscreen}>
                                <DiagnosticTouchScreenComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticPing}>
                                <DiagnosticPingComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_chatWithSupport}>
                                <SupportChatComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_nearestMasters}>
                                <SupportNearestMastersComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticGPS}>
                                <DiagnosticGPSComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticSound}>
                                <DiagnosticSoundComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticMicro}>
                                <DiagnosticMicroComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_deiagnosticCamera}>
                                <DiagnosticCameraComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_orderRepair}>
                                <OrderRepairComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_orderRepairCurrentAndAll}>
                                <RepairPageComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_orderRepairRequest}>
                                <OrderRepairRequestComponent data={propsForPanel} />
                            </Panel>
                            <Panel id={state.panels.panel_anotherProductItems}>
                                <AnotherProductsItemsComponents data={propsForPanel} />
                            </Panel>
                        </View>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
