import { useState, Fragment } from 'react';
import MainHeader from "./MainHeader";
import MainDevices from "./MainDevices";
import MainSupportTools from "./MainSupportTools";
import MainAnotherProducts from "./MainAnotherProducts";
import MainDiagnostic from "./MainDiagnostic";
import MainFixedHeader from "./MainFixedHeader";
import MainRepairComponent from "./MainRepairComponent";

export default function MainPanel(props) {
    const [isScroll, setIsScroll] = useState(false);

    const [
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
        setHistory,
    ] = props.data;

    return (
        <Fragment>
            {isScroll && <MainFixedHeader
                state={state}
                title={state.components.mainHeader.title}
                changeShowActiveModal={changeShowActiveModal}
            />}
            <MainHeader
                state={state}
                setIsScroll={setIsScroll}
                changeShowActiveModal={changeShowActiveModal} />
            <MainDevices
                state={state}
                userData={userData}
                myDeviceList={myDeviceList}
                changeShowActivePanel={changeShowActivePanel}
                setChooseDevice={setChooseDevice}
                setChooseDeviceType={setChooseDeviceType}
                history={history}
                setHistory={setHistory}
            />
            <MainSupportTools
                state={state}
                changeShowActivePanel={changeShowActivePanel}
                history={history}
                setHistory={setHistory}
            />
            <MainRepairComponent
                state={state}
                changeShowActivePanel={changeShowActivePanel}
                requestsForRepair={requestsForRepair}
                setChooseActiveRequestRepairItem={setChooseActiveRequestRepairItem}
                history={history}
                setHistory={setHistory}
            />
            <MainDiagnostic
                state={state}
                changeShowActivePanel={changeShowActivePanel}
                history={history}
                setHistory={setHistory}
            />
            <MainAnotherProducts
                state={state}
                changeShowActivePanel={changeShowActivePanel}
                changeShowActiveModal={changeShowActiveModal}
                history={history}
                setHistory={setHistory}
            />
        </Fragment>
    );
}