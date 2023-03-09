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
        changeShowActivePanel,,,,,,,,,,,,,,,
        requestsForRepair,,,
        setChooseActiveRequestRepairItem
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
            />
            <MainSupportTools
                state={state}
                changeShowActivePanel={changeShowActivePanel}
            />
            <MainRepairComponent
                state={state}
                changeShowActivePanel={changeShowActivePanel}
                requestsForRepair={requestsForRepair}
                setChooseActiveRequestRepairItem={setChooseActiveRequestRepairItem}
            />
            <MainDiagnostic
                state={state}
                changeShowActivePanel={changeShowActivePanel}
            />
            <MainAnotherProducts
                state={state}
                changeShowActivePanel={changeShowActivePanel}
                changeShowActiveModal={changeShowActiveModal}
            />
        </Fragment>
    );
}