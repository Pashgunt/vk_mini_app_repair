import { Fragment, useEffect, useState } from "react";
import { Icon48ArrowLeftOutline } from "@vkontakte/icons";

export default function DiagnosticTouchScreenComponent(props) {

    const [
        state, , , , , , changeShowActivePanel
    ] = props.data;

    const [isDrawing, setIsDrawing] = useState(false);
    const [countOfCell, setCountOfCell] = useState(0);

    const blockForDraw = function (key) {
        return (
            <div
                className="block"
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
                    background: "white"
                }}></div>
        );
    }

    useEffect(() => {
        const height = document.body.offsetHeight,
            elems = document.body.offsetWidth >= 768 ? parseInt(((height / 20)) * 100) : parseInt(((height / 20)) * 80);
        setCountOfCell(elems);
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

    return (
        <Fragment>
            <div style={{
                height: "100vh",
                overflow: "hidden",
                background: "#666",
                display: "grid",
                gap: "2px",
                gridTemplateColumns: document.body.offsetWidth >= 768 ? "repeat(50 ,auto)" : "repeat(30 ,auto)",
                gridAutoRows: "10px",
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
                        top: "10px",
                        left: "10px",
                        borderRadius: "50%",
                        background: "#999"
                    }}
                >
                    <Icon48ArrowLeftOutline onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} fill="white" />
                </div>
                {countOfCell ? [...Array(countOfCell).keys()].map(item => blockForDraw(item)) : ''}
            </div>
        </Fragment>
    );
}