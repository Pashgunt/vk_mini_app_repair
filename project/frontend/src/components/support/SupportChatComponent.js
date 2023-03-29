import { Div, Group, Spacing, Subhead, Title, Input, usePlatform, IconButton } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon24Help, Icon48WritebarSend } from "@vkontakte/icons";
import { Fragment, useEffect, useRef, useState } from "react";
export default function SupportChatComponent(props) {
    const [
        state,
        userData,
        myDeviceList,
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
        userPhone,
        problem,
        setMyDeviceList,
        addActionLogItem,
        requestsForRepair,
        setRequestsForRepair,
        chooseActiveRequestRepairItem,
        setChooseActiveRequestRepairItem,
        history,
        setHistory
    ] = props.data;

    const [messages, setMessages] = useState([]);

    const messageRef = useRef(null);
    const platform = usePlatform();
    const sendMessage = async function () {
        let messageValue = messageRef.current.value;
        messageRef.current.value = "";
        let result = await state.api.sendMessageToChat(userData.id, messageValue, userData.first_name, userPhone);
        if (result.data === "success") {
            setMessages([...messages, {
                "type": "OUT",
                "text": messageValue,
            }])
        }
    }

    useEffect(() => {
        const startAsyncFunc = async () => {
            let messagesForUserID = await state.api.getMessagesForUser(userData.id);
            if (messagesForUserID.data) {
                setMessages([...messages, ...messagesForUserID.data])
            }
        }
        startAsyncFunc();
    }, [setMessages])

    const back = () => {
        
        let toPanel = history?.at(-2);
        setHistory([...history, toPanel])
        changeShowActivePanel(toPanel, state)
    }

    return (<Fragment>
        <div style={{
            position: "relative",
            height: "100vh"
        }}>
            <Group mode="plain" separator="hide">
                <Div style={{
                    paddingTop:  platform === 'ios' ? '50px' : '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: "15px"
                }}>
                    <Icon28ChevronBack onClick={back} />
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
                    height: "calc(100vh - 250px)"
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
                background: state.setBgColor(),
                position: "absolute",
                left: "0",
                bottom: "25px",
                width: "100%"
            }}>
                <Div style={{
                    display: "grid",
                    gridTemplateColumns: "auto 48px"
                }}>
                    <Input
                        type="text"
                        placeholder="Сообщение"
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