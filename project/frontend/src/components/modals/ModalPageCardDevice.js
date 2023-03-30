import { Fragment } from "react";
import { Div } from "@vkontakte/vkui";
import { Icon20ChevronRightOutline } from "@vkontakte/icons";

export default function ModalPageCardDevice({
    style,
    title,
    imageName,
    image,
    width,
    height,
    changeShowActiveModal,
    props,
    userData = '',
    setChooseDevice
}) {
    return (
        <Fragment key={title}>
            <Div style={style}
                onClick={() => {
                    let device = `${title}  ${userData ? `(${userData?.first_name})` : ''}`;
                    setChooseDevice(device)
                    changeShowActiveModal(props.panels.modal_formForCallback, props)
                }}
            >
                <div style={{
                    textAlign: "center",
                }}>
                    <img alt="iPhone" src={image[imageName]} width={width} height={height} />
                </div>
                {title} {userData ? `(${userData?.first_name})` : ''}
                <Icon20ChevronRightOutline style={{
                    marginLeft: "auto"
                }} />
            </Div>
        </Fragment >
    );
}