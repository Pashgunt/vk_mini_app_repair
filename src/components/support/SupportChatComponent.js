import { Div, Group, Spacing, Subhead, Title, Input, FormItem, IconButton } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon24Help, Icon48WritebarSend } from "@vkontakte/icons";
import { Fragment, useEffect, useRef, useState } from "react";
export default function SupportChatComponent(props) {
    const [
        state,
        userData, ,
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
    ] = props.data;

    const [messages, setMessages] = useState([]);

    const messageRef = useRef(null);

    const sendMessage = async function () {
        let messageValue = messageRef.current.value;
        let result = await state.api.sendMessageToChat(userData.id, messageValue);
        if (result.data.data === "success") {
            setMessages([...messages, {
                "type": "OUT",
                "text": messageValue,
            }])
        }
    }

    useEffect(() => {
        const startAsyncFunc = async () => {
            let messagesForUserID = await state.api.getMessagesForUser(userData.id);
            setMessages([...messages, ...messagesForUserID.data])
        }
        startAsyncFunc();
    }, [setMessages])

    return (<Fragment>
        <div style={{
            position: "relative",
            height: "100vh"
        }}>
            <Group mode="plain" separator="hide">
                <Div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: "15px"
                }}>
                    <Icon28ChevronBack onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                    <Icon24Help fill="#2688eb" width={36} height={36} />
                    <Title style={{
                        marginLeft: "10px"
                    }}>
                        Поддержка
                    </Title>
                </Div>
            </Group>
            <Group mode="plain" separator="hide">
                <Div style={{
                    overflowY: "scroll",
                    height: "calc(100vh - 200px)"
                }}>
                    {messages?.length ?
                        messages?.map((message, index) => {
                            if (message.type === "OUT") {
                                return (<div key={index} style={{
                                    padding: "10px",
                                    borderRadius: "15px",
                                    width: "max-content",
                                    marginLeft: "auto",
                                    background: state.schema == 'dark' ? '#454648' : "#ECF6FD",
                                    marginBottom: "5px"
                                }}>
                                    {message.text}
                                </div>);
                            }
                            return (<div key={index} style={{
                                padding: "10px",
                                borderRadius: "15px",
                                width: "max-content",
                                marginRight: "auto",
                                background: state.schema == 'dark' ? '#2C2D2F' : "#eee",
                                marginBottom: "5px"
                            }}>
                                {message.text}
                            </div>);
                        })
                        : <Subhead style={{
                            fontSize: "12px",
                            color: "#999",
                            textAlign: "center"
                        }}>
                            У Вас пока нет сообщений в чате с нашим специалистом
                        </Subhead>
                    }
                </Div>
            </Group>
            <Group mode="plain" style={{
                background: state.schema == 'dark' ? '#19191A' : '#fff',
                position: "absolute",
                left: "0",
                bottom: "0",
                width: "100%"
            }}>
                <Div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Input
                        type="text"
                        placeholder="Сообщение"
                        style={{
                            width: "80vw"
                        }}
                        getRef={messageRef}
                    />
                    <IconButton onClick={sendMessage}>
                        <Icon48WritebarSend fill="#2688eb" />
                    </IconButton>
                </Div >
            </Group>
        </div>
    </Fragment>);
}