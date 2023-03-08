import { Fragment, useRef, useState } from "react";
import { Button, Div, FormItem, Group, Separator, Spacing, Textarea, Title } from "@vkontakte/vkui";
import { Icon20ChevronRightOutline } from "@vkontakte/icons";

export default function ModalSearchProblemPage({ state, changeShowActiveModal, problem, setProblem, setIsCorrectDataForProblem }) {

    const [matchWordsList, setMatchWords] = useState(false);
    const [isErrorInput, setIsErrorInput] = useState(true);
    const problemRef = useRef(null);

    const onChangeTextareaProblem = function (event) {
        let value = event.target.value?.toLowerCase(),
            searchItems = state.modal.searchProblem.quickSearch,
            matchWords = [];

        setProblem(event.target.value);

        if (value && value.length >= 3) {
            setIsCorrectDataForProblem(true);
            setIsErrorInput(false);
            matchWords = searchItems.filter(function (item) {
                try {
                    return item?.toLowerCase().includes(value);
                } catch (e) {
                    console.log(e);
                }
            });
        } else {
            setIsErrorInput(false);
            setIsCorrectDataForProblem(false);
        }
        setMatchWords(matchWords);
    }

    const clickByFastTypeButton = function (event) {
        let problem = event.target.textContent;
        setProblem(problem);
        changeShowActiveModal(state.panels.modal_chooseDevice, state);
    }

    const clickForNextModalWithCorrectInput = () => {
        setIsErrorInput(true);
        changeShowActiveModal(state.panels.modal_chooseDevice, state)
    }

    return (
        <Group>
            <Spacing size={0} />
            <Div>
                <Title level="2">
                    {state.modal.searchProblem.title}
                </Title>
            </Div>
            <Spacing size={0} />
            <FormItem>
                <Textarea
                    status={isErrorInput ? 'error' : 'valid'}
                    getRef={problemRef}
                    placeholder="Например: забыли пароль"
                    defaultValue={problem}
                    onKeyUp={state.throttle(onChangeTextareaProblem, 300)}
                />
                <Spacing size={12} />
                {matchWordsList && <Group mode={"card"}>
                    {
                        matchWordsList.map(function (match) {
                            return (<Fragment>
                                <Div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    color: "#aaa"
                                }}
                                    onClick={clickByFastTypeButton}>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: match.replace(problem, `<span style="color: black">${problem}</span>`) }}>
                                    </div>
                                    <Icon20ChevronRightOutline />
                                </Div>
                                <Separator />
                            </Fragment>)
                        })
                    }
                </Group>
                }
            </FormItem>
        </Group>
    );
}