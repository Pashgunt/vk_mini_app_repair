import { Group, Div,usePlatform} from '@vkontakte/vkui';
import { Icon28ChevronBack, Icon28ClearDataOutline } from "@vkontakte/icons";
import { Fragment, useEffect, useRef, useState } from 'react';

export default function DiagnosticDrawComponent(props) {
    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false)

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

    const startDrawing = function ({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
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

    return (
        <Fragment>
            <Group mode="plain" style={{
                height: "100vh",
                overflow: "hidden",
                position: "relative"
            }}>
                <Div style={{
                    position: "absolute",
                    top:  platform === 'ios' ? '50px' : '12px',
                    left: "0",
                    display: 'flex',
                    gap: "15px"
                }}>
                    <Icon28ChevronBack onClick={() => {
                        document.body.style.overflow = "auto";
                        changeShowActivePanel(state.panels.panel_mainScreen, state)
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