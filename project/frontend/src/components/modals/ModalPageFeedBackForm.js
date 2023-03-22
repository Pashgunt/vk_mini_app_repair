import { Fragment, useRef, useState } from "react";
import { Group, Div, Textarea, Spacing, Subhead, Title, Button } from "@vkontakte/vkui";

export default function ModalPageFeedBackForm({ state, changeShowActiveModal, setIsCorrectDataForSendFeedback }) {

    const [correctInput, setCorrectInput] = useState(false);

    const feedbackInput = useRef();

    const sendFeedBackData = () => {
        let value = feedbackInput.current.value;
        if (
            !state.validator.isAlphanumeric(value, ['ru-RU']) &&
            !state.validator.isAlphanumeric(value, ['en-US'])
        ) {
            setCorrectInput(false);
            setIsCorrectDataForSendFeedback(false);
            return;
        }
        setCorrectInput(true);
        changeShowActiveModal(null, state)
    }

    const changeFeedbackField = (event) => {
        let value = event.target.value;
        if (
            !state.validator.isAlphanumeric(value, ['ru-RU']) &&
            !state.validator.isAlphanumeric(value, ['en-US'])
        ) {
            setCorrectInput(false);
            setIsCorrectDataForSendFeedback(false);
            return;
        }
        setCorrectInput(true);
        setIsCorrectDataForSendFeedback(true);
    }

    return (
        <Fragment>
            <Div>
                <Group>
                    <Title level="3" weight="2">
                        Сведения
                    </Title>
                    <Spacing size={10} />
                    <Textarea
                        getRef={feedbackInput}
                        placeholder="Опишите свою проблему или желание, включая сведения о том, как воспроизвести её"
                        rows={5}
                        onKeyUp={changeFeedbackField}
                        status={!correctInput ? 'error' : 'valid'}
                    />
                    <Spacing size={5} />
                    <Subhead weight="3" style={{
                        color: "#999",
                        fontSize: "12px"
                    }}>
                        Когда Вы отправялеете отзыв, компания Apple собирает некоторые основные сведения о Вашем устройстве и версии приложения, чтобы улучшить качество работы службы поддержки Apple. Специалисты Apple не отвечают на комментарии, но читают все отызвы.
                    </Subhead>
                </Group>
            </Div>
        </Fragment>
    );
}