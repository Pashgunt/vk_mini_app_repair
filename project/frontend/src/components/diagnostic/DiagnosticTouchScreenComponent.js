import { Fragment, useEffect, useState } from "react";
import { usePlatform, Div } from "@vkontakte/vkui";
import { Icon28ChevronBack } from "@vkontakte/icons";

export default function DiagnosticTouchScreenComponent(props) {

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
        setHistory
    ] = props.data;

    const [isDrawing, setIsDrawing] = useState(false);
    const [countOfCell, setCountOfCell] = useState(0);

    const blockForDraw = function (key) {
        return (
            <div
                className={classElem}
                onMouseOver={mouseOver}
                onClick={mouseClick}
                onTouchStart={touchStart}
                onTouchEnd={finishDrawing}
                onTouchMove={touchMove}
                key={key}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "3px",
                    background: state.setBgColor(),
                }}></div>
        );
    }

    useEffect(() => {
        const height = document.body.offsetHeight,
            elems = document.body.offsetWidth >= 768 ? parseInt(((height / 20)) * 30) : parseInt(((height / 30)) * 30);
        setCountOfCell(elems);
        document.body.style.overflow = "hidden";
    }, []);

    const startDrawing = function () {
        setIsDrawing(true);
    }

    const finishDrawing = function () {
        setIsDrawing(false);
    }

    const mouseOver = function (event) {
        if (!isDrawing) return;
        let elem = event.target;
        elem.style.background = "orange";
    }

    const mouseClick = function (event) {
        let elem = event.target;
        elem.style.background = "orange";
    }

    const touchStart = function (event) {
        setIsDrawing(true);
        let elem = event.target;
        elem.style.background = "orange";
    }

    const touchMove = function ({ nativeEvent }) {
        let touch = nativeEvent.touches[0],
            mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        if (!isDrawing) return;
        let elem = document.elementFromPoint(mouseEvent.clientX, mouseEvent.clientY);
        if (elem && elem?.classList.contains('block')) {
            elem.style.background = "orange";
        }
    }

    const platform = usePlatform();

    const back = () => {
        let toPanel = history?.at(-2);
        history.pop();
        history.pop();
        setHistory([...history])
        changeShowActivePanel(toPanel, state)
    }

    return (
        <Fragment>
            {document.body.offsetWidth > 768 ?

                <div style={{
                    height: "100vh",
                    overflow: "hidden",
                    background: "#666",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: platform === 'ios' ? '50px' : '12px',
                            left: "12px"
                        }}
                    >
                        <Icon28ChevronBack onClick={() => {
                            document.body.style.overflow = "auto";
                            back()
                        }} />
                    </div>

                    <Div
                        style={{
                            fontSize: "20px",
                            textAlign: "center"
                        }}
                    >
                        Данный тест не доступен для Вашего экрана
                    </Div>
                </div>

                : <div style={{
                    height: "100vh",
                    overflow: "hidden",
                    background: "#666",
                    display: "grid",
                    gap: "2px",
                    gridTemplateColumns: document.body.offsetWidth <= 768 && "repeat(15 ,auto)",
                    gridAutoRows: document.body.offsetWidth <= 768 && "20px",
                    position: "relative"
                }}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onTouchStart={startDrawing}
                    onTouchEnd={finishDrawing}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: platform === 'ios' ? '50px' : '12px',
                            left: "10px",
                        }}
                    >
                        <Icon28ChevronBack onClick={() => {
                            document.body.style.overflow = "auto";
                            changeShowActivePanel(state.panels.panel_mainScreen, state)
                        }} />
                    </div>
                    {countOfCell ? [...Array(countOfCell).keys()].map(item => blockForDraw(item)) : ''}
                </div>}
        </Fragment>
    );
}