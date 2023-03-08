import { Div, Group, Title, Spacing, Input, Subhead, Button } from "@vkontakte/vkui";
import React, { Fragment, useEffect, useState } from "react";

export default function ModalPageFormForCallback({ state, changeShowActiveModal, userData, userPhone, setUserPhone }) {
    const [correctPhone, setCorrectPhone] = useState(false);
    const [correctUsername, setCorrectUsername] = useState(false);

    useEffect(() => {
        userPhone ? setCorrectPhone(true) : setCorrectPhone(false);
        userData.first_name ? setCorrectUsername(true) : setCorrectUsername(false);
    }, [])

    const changePhoneNumberForUser = function (event) {
        let value = event.target.value;
        if (state.validator.isMobilePhone(value, ['ru-RU'])) {
            setCorrectPhone(true);
            setUserPhone(value)
        } else {
            setCorrectPhone(false);
        }
    }

    const changeUsername = function (event) {
        let value = event.target.value;
        state.validator.isAlpha(value, ['ru-RU']) || state.validator.isAlpha(value, ['en-US']) ? setCorrectUsername(true) : setCorrectUsername(false);
    }

    const clickForNextModalWithCorrectInput = () => {
        if (correctPhone && correctUsername) changeShowActiveModal(state.panels.modal_sendRequestForRepair, state);
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
                        style={{
                            border: !correctUsername ? "1px solid red" : ''
                        }}
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
                        style={{
                            border: !userPhone || !correctPhone ? "1px solid red" : ''
                        }}
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
                <Spacing size={5} />
                <div>
                    <Button style={{
                        marginRight: "10px"
                    }}
                        onClick={() => changeShowActiveModal(state.panels.modal_chooseDevice, state)}
                    >
                        Назад
                    </Button>
                    {correctPhone && correctUsername && <Button
                        onClick={clickForNextModalWithCorrectInput}
                    >
                        Далее
                    </Button>}
                </div>
            </Div>
        </Fragment>
    );
}