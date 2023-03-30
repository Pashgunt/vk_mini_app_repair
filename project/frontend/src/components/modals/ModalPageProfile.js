import { Div, Group, Spacing, Title, Input, Link, Subhead, IconButton } from "@vkontakte/vkui";
import { Fragment, useEffect, useRef, useState } from "react";
import {Icon16Clear} from "@vkontakte/icons";

export default function ModalPageProfile({ state, changeShowActiveModal, userData, userPhone, setUserPhone }) {

    const [correctPhone, setCorrectPhone] = useState(false);

    useEffect(() => {
        userPhone ? setCorrectPhone(true) : setCorrectPhone(false);
    })

    const changePhoneNumberForUser = function (event) {
        let value = event.target.value;
        if (state.validator.isMobilePhone(value, ['ru-RU'])) {
            setCorrectPhone(true);
            setUserPhone(value)
        } else {
            setCorrectPhone(false);
        }
    }

    const phoneUserRef = useRef(null);

    const clear = (refItem) => (refItem.current.value = '');

    return (
        <Fragment>
            <Group>
                <Spacing size={40} />
                <Div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <img src={userData.photo_100} alt="profile" style={{
                            borderRadius: "50%"
                        }} />
                        <Spacing size={10} />
                        <Title>
                            {userData.first_name} {userData.last_name}
                        </Title>
                    </div>
                    <Spacing size={30} />
                    <Title level="3" weight="2">
                        Телефон
                    </Title>
                    <Spacing size={10} />
                    <Input
                        type="tel"
                        pattern="[0-9]{3}-[0-09]{3}-[0-9]{2}-[0-9]{2}"
                        defaultValue={userPhone}
                        status={!userPhone ? 'error' : 'valid'}
                        onKeyUp={changePhoneNumberForUser}
                        getRef={phoneUserRef}
                        after={
                            <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={() => clear(phoneUserRef)}>
                                <Icon16Clear />
                            </IconButton>
                        }
                    />
                    <Spacing size={5} />
                    {!userPhone || !correctPhone ? <Subhead weight="3" style={{
                        color: "red",
                        fontSize: "12px"
                    }}>
                        Укажите номер телефона, по которому с Вами можно связаться
                    </Subhead> :
                        <Subhead weight="3" style={{
                            color: "#999",
                            fontSize: "12px"
                        }}>
                            Служба поддержки Apple свяжется в Вами по этому номеру
                        </Subhead>
                    }
                    <Spacing size={20} />
                    <Group mode="card">
                        <Div style={{
                            paddingTop: "10px",
                            paddingBottom: "10px"
                        }}>
                            <Link onClick={() => changeShowActiveModal(state.panels.modal_feedback, state)}>
                                Отправить отзыв о приложении
                            </Link>
                        </Div>
                    </Group>
                </Div>
            </Group>
        </Fragment>
    );
}