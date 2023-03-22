import { Div, Group, Title, Spacing, Input, Subhead, Button } from "@vkontakte/vkui";
import React, { Fragment, useEffect, useState } from "react";

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
        } else {
            setCorrectPhone(false);
            setIsCorrectDataForConnect(false);
        }
    }

    const changeUsername = function (event) {
        let value = event.target.value;
        if (state.validator.isAlpha(value, ['ru-RU']) || state.validator.isAlpha(value, ['en-US'])) {
            setCorrectUsername(true)
        } else {
            setCorrectUsername(false);
            setIsCorrectDataForConnect(false);
        }
    }

    const clickForNextModalWithCorrectInput = () => {
        if (correctPhone && correctUsername) {
            changeShowActiveModal(state.panels.modal_sendRequestForRepair, state);
            setIsCorrectDataForConnect(true);
        }
    }

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
                        status={!correctUsername ? 'error' : 'valid'}
                        onKeyUp={changeUsername}
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
                        pattern="[0-9]{3}-[0-09]{3}-[0-9]{2}-[0-9]{2}"
                        defaultValue={userPhone}
                        status={!userPhone || !correctPhone ? 'error' : 'valid'}
                        onKeyUp={changePhoneNumberForUser}
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