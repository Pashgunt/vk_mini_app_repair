import { Fragment, useRef, useState, useEffect } from "react";
import { Group, Div, Spacing, Title, CustomSelect, FormItem, Textarea, Input, IconButton, usePlatform, Button, Separator, Headline } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon20ChevronRightOutline } from "@vkontakte/icons";
import MainFixedHeader from "../MainFixedHeader";
import ClipLoader from "react-spinners/ClipLoader";
import { Icon16Clear } from "@vkontakte/icons";

export default function OrderRepairComponent(props) {
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

    console.log(problem);
    const headerRef = useRef(null);

    const problemRef = useRef(null);
    const problemRefDescription = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    const [isScroll, setIsScroll] = useState(false);
    const [devices, setDevices] = useState(false);
    const [matchWordsList, setMatchWords] = useState(false);
    const [deviceValue, setDeviceValue] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    const [isCorrectProblem, setIsCorrectProblem] = useState(true);
    const [isCorrectName, setIsCorrectName] = useState(
        state.validator.isAlpha(userData.first_name, ['ru-RU']) || state.validator.isAlpha(userData.first_name, ['en-US'])
    );
    const [isCorrectPhone, setIsCorrectPhone] = useState(
        state.validator.isMobilePhone(userPhone, ['ru-RU'])
    );

    useEffect(() => {
        const startAsyncFunc = async () => {
            const res = await state.api.getAllDeviceListForUser(userData.id);
            setDevices(res.data);
        }
        startAsyncFunc();
    }, [])

    const onChangeDevice = (event) => {
        setDeviceValue(event.target.options[event.target.selectedIndex].value);
    }

    const cards = state.modal.chooseDevice.cardDevice,
        options = [
            {
                label: 'МОИ УСТРОЙСТВА',
                disabled: true,
                value: '',
                key: 'default_my_devices'
            },
        ];

    if (devices) {
        Object.keys(devices).forEach(deviceType => {
            devices[deviceType].forEach(deviceName => {
                let dataForPush = {
                    label: `${deviceName} (${userData.first_name})`,
                    value: deviceName,
                    key: deviceName
                };
                options.push(dataForPush);
            })
        })
    } else {
        options.push({
            label: '–',
            value: 0
        });
    }

    if (cards) {
        options.push({
            label: 'ОБЩАЯ ПОМОЩЬ',
            disabled: true,
            value: '',
            key: 'default_devices'
        });
        Object.keys(cards.images).forEach(label => {
            let dataForPush = {
                label: label,
                value: label,
                key: label
            };
            options.push(dataForPush);
        })
    } else {
        options.push({
            label: '–',
            value: 0
        });
    }

    const onChangeTextareaProblem = function (event) {
        let value = event.target.value?.toLowerCase(),
            searchItems = state.modal.searchProblem.quickSearch,
            matchWords = [];

        setProblem(event.target.value);

        if (value && value.length >= 3) {
            setIsCorrectProblem(true);

            matchWords = searchItems.filter(function (item) {
                try {
                    return item?.toLowerCase().includes(value);
                } catch (e) {
                }
            });

        }
        setMatchWords(matchWords);
    }

    const clickByFastSearch = function (event) {
        let propblemQuickSearch = event.target.textContent;
        setProblem(propblemQuickSearch);
        problemRef.current.value = propblemQuickSearch;
    }

    const sendOrderRepairRequest = async () => {
        const deviceRefValue = deviceValue,
            problemRefValue = problemRef.current.value,
            problemRefDescriptionValue = problemRefDescription.current.value,
            nameRefValue = nameRef.current.value,
            phoneRefValue = phoneRef.current.value,
            resultCheckProblemRefValue = !!problemRef.current.value?.trim(),
            resultCheckNameRefValue = true,
            resultCheckPhoneRefValue = true;

        setIsCorrectProblem(resultCheckProblemRefValue);
        setIsCorrectName(resultCheckNameRefValue);
        setIsCorrectPhone(resultCheckPhoneRefValue);

        if (
            resultCheckProblemRefValue &&
            resultCheckNameRefValue &&
            resultCheckPhoneRefValue
        ) {
            document.body.style.overflow = "hidden";
            setShowLoader(true);
            let result = await state.api.createRequestForRepairDevice(
                deviceRefValue,
                problemRefValue,
                problemRefDescriptionValue,
                "–",
                nameRefValue,
                phoneRefValue,
                userData.id
            );
            if (result.data === "success") {
                addActionLogItem("");
                try {
                    await state.api.updateCrashedTestsForUser(userData.id);
                } catch (e) { }
                let repairData = {
                    'device': deviceRefValue,
                    'problem': problemRefValue,
                    'probelm_description': problemRefDescriptionValue,
                    'adress': "–",
                    'name': nameRefValue,
                    'phone': phoneRefValue
                };
                if (!Array.isArray(requestsForRepair)) {
                    let copyRequestsForRepair = Object.assign({}, requestsForRepair);
                    copyRequestsForRepair.current.push(repairData);
                    copyRequestsForRepair.all.push(repairData);
                    setRequestsForRepair(copyRequestsForRepair)
                } else {
                    setRequestsForRepair([...requestsForRepair, repairData])
                }
                setChooseActiveRequestRepairItem(repairData);
                changeShowActivePanel(state.panels.panel_orderRepairRequest, state);
            } else {
                setShowLoader(false);
                document.body.style.overflow = "auto";
                addActionLogItem('При создании заказа на ремонт произошла ошибка! Попробуйте ещё раз');
            }
        } else {
            addActionLogItem('При создании заказа на ремонт произошла ошибка! Попробуйте ещё раз');
        }
    }

    const onChangeNameRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectName(true);
    }
    const onChangePhoneRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectPhone(true);
    }

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY,
            headerHeight = +headerRef.current?.offsetHeight;
        if (scrollTop > headerHeight) {
            setIsScroll(true);
        }
        if (scrollTop < 10) {
            setIsScroll(false);
        }
    })

    const platform = usePlatform();

    const back = () => {
        history.pop();
        let toPanel = history?.at(-1);
        setHistory([...history])
        changeShowActivePanel(toPanel, state)
    }

    const clear = (refItem) => (refItem.current.value = '');

    return (<Fragment>
        <div style={{
            position: "relative"
        }}>
            {showLoader && <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.75)",
                zIndex: '100',
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center"
            }}>
                <ClipLoader
                    color={"#FFF"}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>}
            {isScroll && <MainFixedHeader
                state={state}
                title={"Заказать ремонт"}
                changeShowActiveModal={changeShowActiveModal}
                showProfile={false}
            />}
            <Div>
                <Group mode="plain" style={{
                    position: "relative"
                }}>
                    <div style={{
                        paddingTop: platform === 'ios' ? '50px' : '12px',
                        left: "0",
                        display: 'flex',
                        alignItems: 'center',
                        gap: "15px"
                    }} ref={headerRef}>
                        <div>
                            <Icon28ChevronBack onClick={() => {
                                addActionLogItem("");
                                back();
                            }} />
                        </div>
                        <Title>
                            Заказать ремонт
                        </Title>
                    </div>
                    <Spacing size={40} />

                    <Group mode="card" separator={"hide"} style={{
                        position: "relative"
                    }}>
                        <Title level="2" style={{
                            background: state.schema === 'dark' ? '#19191A' : '#fff',
                            position: "absolute",
                            padding: "0 10px",
                            top: "-12px",
                            left: "20px",
                            zIndex: "1"
                        }}>Устройство</Title>
                        <Div>
                            <FormItem top="Выберите устройство" bottom="Поиск по устройствам">
                                <CustomSelect
                                    placeholder="Введите название устройства"
                                    options={options}
                                    onChange={onChangeDevice}
                                />
                            </FormItem>
                        </Div>
                    </Group>

                    <Spacing size={20} />

                    <Group mode="card" separator={"hide"} style={{
                        position: "relative"
                    }}>
                        <Title level="2" style={{
                            background: state.setBgColor(),
                            position: "absolute",
                            padding: "0 10px",
                            top: "-12px",
                            left: "20px",
                            zIndex: "1"
                        }}>Проблема</Title>
                        <Div>
                            <FormItem top="Укажите проблему">
                                <Input
                                    required
                                    type="text"
                                    placeholder="Укажите проблему"
                                    onKeyUp={state.throttle(onChangeTextareaProblem, 300)}
                                    getRef={problemRef}
                                    defaultValue={problem}
                                    status={!isCorrectProblem ? 'error' : 'valid'}
                                    after={
                                        <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={() => clear(problemRef)}>
                                            <Icon16Clear />
                                        </IconButton>
                                    }
                                />
                                {matchWordsList && <><Spacing size={12} /><Group mode={"card"}>
                                    {
                                        matchWordsList.map(function (match, index) {
                                            return (<Fragment>
                                                <Div
                                                    key={index}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        color: "#aaa"
                                                    }}
                                                    onClick={clickByFastSearch}
                                                >
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: match.replace(problem, `<span style="color: black">${problem}</span>`) }}>
                                                    </div>
                                                    <Icon20ChevronRightOutline />
                                                </Div>
                                                <Separator />
                                            </Fragment>)
                                        })
                                    }
                                </Group></>
                                }
                            </FormItem>
                            <FormItem top="Опишите проблему детальнее (необязательно)">
                                <Textarea
                                    placeholder="Опишите проблему"
                                    rows={3}
                                    getRef={problemRefDescription}
                                />
                            </FormItem>
                        </Div>
                    </Group>

                    <Spacing size={20} />

                    <Group mode="card" separator={"hide"} style={{
                        position: "relative"
                    }}>
                        <Title level="2" style={{
                            background: state.setBgColor(),
                            position: "absolute",
                            padding: "0 10px",
                            top: "-12px",
                            left: "20px",
                            zIndex: "1"
                        }}>Контактные данные</Title>
                        <Div>
                            <FormItem top="Укажите имя">
                                <Input
                                    getRef={nameRef}
                                    type="text"
                                    placeholder="Имя"
                                    onKeyUp={onChangeNameRefValue}
                                    defaultValue={userData.first_name ?? ''}
                                    status={!isCorrectName ? 'error' : 'valid'}
                                    after={
                                        <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={() => clear(nameRef)}>
                                            <Icon16Clear />
                                        </IconButton>
                                    }
                                />
                            </FormItem>
                            <FormItem top="Укажите номер телефона">
                                <Input
                                    getRef={phoneRef}
                                    type="text"
                                    placeholder="Номер телефона"
                                    onKeyUp={onChangePhoneRefValue}
                                    defaultValue={userPhone ?? ''}
                                    status={!isCorrectPhone ? 'error' : 'valid'}
                                    after={
                                        <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={() => clear(phoneRef)}>
                                            <Icon16Clear />
                                        </IconButton>
                                    }
                                />
                            </FormItem>
                        </Div>
                    </Group>
                </Group>

                <Spacing size={20} />
                {
                    actionsLog.length ? <>
                        <Headline style={{
                            fontSize: '14px',
                            color: "red"
                        }}>
                            {actionsLog}
                        </Headline>
                        <Spacing size={10} />
                    </> : ''
                }
                <Button onClick={sendOrderRepairRequest}>
                    Отправить заявку
                </Button>
                <Spacing size={20} />
            </Div>
        </div>
    </Fragment>);
}