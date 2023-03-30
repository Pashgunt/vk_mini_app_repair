import { Group, Div, usePlatform } from '@vkontakte/vkui';
import { Icon28ChevronBack, Icon28ClearDataOutline } from "@vkontakte/icons";
import { Fragment, useEffect, useRef, useState } from 'react';

export default function DiagnosticDrawComponent(props) {
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

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false)
    const [isCrashed, setIsCrashed] = useState(false);
    const [isCancel, setIsCancel] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = document.body.offsetWidth * 2;
        canvas.style.width = `${document.body.offsetWidth}px`;
        canvas.height = document.body.offsetHeight * 2;
        canvas.style.height = `${document.body.offsetHeight}px`;

        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = state.schema == 'dark' ? "white" : "black";
        context.lineWidth = 1;
        contextRef.current = context;
        document.body.style.overflow = "hidden";
    }, [])

    function later(delay) {
        return new Promise(function (resolve) {
            setTimeout(resolve, delay);
        });
    }

    const startDrawing = function ({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        if (state.isCrashedTests && Math.random() > 0.8) {
            setIsCrashed(true);
            setInterval(function () {
                later(2000).then(data => {
                    contextRef.current.closePath();
                    setIsDrawing(false);
                    return later(500)
                }).then(result => {
                    contextRef.current.beginPath();
                    contextRef.current.moveTo(offsetX, offsetY);
                    setIsDrawing(true);
                })
            }, 4000)
        }
    }

    const finishDrawing = function () {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = function ({ nativeEvent }) {
        if (!isDrawing) return
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    const drawTouch = function ({ nativeEvent }) {
        var touch = nativeEvent.touches[0],
            mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        if (!isDrawing) return
        contextRef.current.lineTo(mouseEvent.clientX, mouseEvent.clientY);
        contextRef.current.stroke();
    }

    const clearDraw = function () {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    const platform = usePlatform();

    const back = () => {
        if (isCrashed && !isCancel) {
            changeShowActiveModal("TEST", state);
            setIsCancel(true);
        } else {
            if (isCancel || !isCrashed) {
                let toPanel = history?.at(-2);
                history.pop();
                history.pop();
                setHistory([...history])
                changeShowActivePanel(toPanel, state)
            }
        }
    }

    return (
        <Fragment>
            <Group mode="plain" style={{
                height: "100vh",
                overflow: "hidden",
                position: "relative"
            }}>
                <Div style={{
                    position: "absolute",
                    top: platform === 'ios' ? '50px' : '12px',
                    left: "0",
                    display: 'flex',
                    gap: "15px"
                }}>
                    <Icon28ChevronBack onClick={() => {
                        document.body.style.overflow = "auto";
                        back()
                    }} />
                    <Icon28ClearDataOutline onClick={clearDraw} />
                </Div>

                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    onTouchStart={startDrawing}
                    onTouchEnd={finishDrawing}
                    onTouchMove={drawTouch}
                    ref={canvasRef}
                />
            </Group>
        </Fragment>
    );
}