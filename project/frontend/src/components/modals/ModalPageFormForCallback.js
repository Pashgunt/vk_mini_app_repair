import { Div, Group, Title, Spacing, Input, Subhead, IconButton } from "@vkontakte/vkui";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Icon16Clear } from "@vkontakte/icons";

export default function ModalPageFormForCallback({ state, changeShowActiveModal, userData, userPhone, setUserPhone, setIsCorrectDataForConnect }) {
    const [correctPhone, setCorrectPhone] = useState(false);
    const [correctUsername, setCorrectUsername] = useState(false);

    useEffect(() => {
        if (userPhone) {
            setCorrectPhone(true)
        } else {
            setCorrectPhone(false);
            setIsCorrectDataForConnect(false);
        }
        if (userData.first_name) {
            setCorrectUsername(true)
        } else {
            setCorrectUsername(false);
            setIsCorrectDataForConnect(false);
        }
    }, [])

    const changePhoneNumberForUser = function (event) {
        let value = event.target.value;
        if (state.validator.isMobilePhone(value, ['ru-RU'])) {
            setCorrectPhone(true);
            setUserPhone(value)
            setIsCorrectDataForConnect(true);
        } else {
            setCorrectPhone(false);
            setIsCorrectDataForConnect(false);
        }
    }

    const changeUsername = function (event) {
        let value = event.target.value;
        if (state.validator.isAlpha(value, ['ru-RU']) || state.validator.isAlpha(value, ['en-US'])) {
            setCorrectUsername(true)
            setIsCorrectDataForConnect(true);
        } else {
            setCorrectUsername(false);
            setIsCorrectDataForConnect(false);
        }
    }

    const userNameRef = useRef(null);
    const phoneUserRef = useRef(null);

    const clear = (refItem) => (refItem.current.value = '');

    return (
        <Fragment>
            <Div>
                <Group>
                    <Title level="3" weight="2">
                        Имя
                    </Title>
                    <Spacing size={10} />
                    <Input
                        type="text"
                        defaultValue={userData.first_name}
                        getRef={userNameRef}
                        status={!correctUsername ? 'error' : 'valid'}
                        onKeyUp={changeUsername}
                        after={
                            <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={() => clear(userNameRef)}>
                                <Icon16Clear />
                            </IconButton>
                        }
                    />
                    {!correctUsername && <Fragment>
                        <Spacing size={5} />
                        <Subhead weight="3" style={{
                            color: "red",
                            fontSize: "12px"
                        }}>
                            Укажите Имя, по которму мы сможем к Вам обращаться
                        </Subhead>
                    </Fragment>}
                    <Spacing size={20} />
                    <Title level="3" weight="2">
                        Телефон
                    </Title>
                    <Spacing size={10} />
                    <Input
                        type="tel"
                        getRef={phoneUserRef}
                        pattern="[0-9]{3}-[0-09]{3}-[0-9]{2}-[0-9]{2}"
                        defaultValue={userPhone}
                        status={!userPhone || !correctPhone ? 'error' : 'valid'}
                        onKeyUp={changePhoneNumberForUser}
                        after={
                            <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={() => clear(phoneUserRef)}>
                                <Icon16Clear />
                            </IconButton>
                        }
                    />
                    <Spacing size={5} />
                    {!correctPhone ? <Subhead weight="3" style={{
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
                </Group>
            </Div>
        </Fragment>
    );
}