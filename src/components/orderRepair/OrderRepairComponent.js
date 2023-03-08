import { Fragment, useRef, useState, useEffect } from "react";
import { Group, Div, Spacing, Title, CustomSelect, FormItem, Textarea, Input, Card, CardGrid, Button, Separator, Headline } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon20ChevronRightOutline } from "@vkontakte/icons";
import MainFixedHeader from "../MainFixedHeader";

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
        setChooseActiveRequestRepairItem
    ] = props.data;

    const headerRef = useRef(null);

    const deviceRef = useRef(null);
    const problemRef = useRef(null);
    const problemRefDescription = useRef(null);
    const fullAdressRef = useRef(null);
    const flatRef = useRef(null);
    const floorRef = useRef(null);
    const entranceRef = useRef(null);
    const intercomRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    const [isScroll, setIsScroll] = useState(false);
    const [devices, setDevices] = useState(false);
    const [matchWordsList, setMatchWords] = useState(false);

    const [isCorrectProblem, setIsCorrectProblem] = useState(
        state.validator.isAlphanumeric(problem, ['ru-RU']) || state.validator.isAlphanumeric(problem, ['en-US'])
    );
    const [isCorrectFullAdress, setIsCorrectFullAdress] = useState(false);
    const [isCorrectFlat, setIsCorrectFlat] = useState(false);
    const [isCorrectFloor, setIsCorrectFloor] = useState(false);
    const [isCorrectEnterance, setIsCorrectEnterance] = useState(false);
    const [isCorrectIntercome, setIsCorrectIntercome] = useState(false);
    const [isCorrectName, setIsCorrectName] = useState(
        state.validator.isAlpha(userData.first_name, ['ru-RU']) || state.validator.isAlpha(userData.first_name, ['en-US'])
    );
    const [isCorrectPhone, setIsCorrectPhone] = useState(
        state.validator.isMobilePhone(userPhone, ['ru-RU'])
    );

    useEffect(async () => {
        const res = await state.api.getAllDeviceListForUser(userData.id);
        setDevices(res.data);
    }, [])

    const cards = state.modal.chooseDevice.cardDevice,
        options = [
            {
                label: 'МОИ УСТРОЙСТВА',
                disabled: true,
                value: '',
            },
        ];

    if (devices) {
        Object.keys(devices).forEach(deviceType => {
            devices[deviceType].forEach(deviceName => {
                let dataForPush = {
                    label: `${deviceName} (${userData.first_name})`,
                    value: deviceName
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
        });
        Object.keys(cards.images).forEach(label => {
            let dataForPush = {
                label: label,
                value: label
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
            setIsCorrectProblem(state.validator.isAlphanumeric(value, ['ru-RU']) || state.validator.isAlphanumeric(value, ['en-US']));

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
        const deviceRefValue = deviceRef.current.value,
            problemRefValue = problemRef.current.value,
            problemRefDescriptionValue = problemRefDescription.current.value,
            fullAdressRefValue = fullAdressRef.current.value,
            flatRefValue = flatRef.current.value,
            floorRefValue = floorRef.current.value,
            entranceRefValue = entranceRef.current.value,
            intercomRefValue = intercomRef.current.value,
            nameRefValue = nameRef.current.value,
            phoneRefValue = phoneRef.current.value,
            resultCheckProblemRefValue = state.validator.isAlphanumeric(problemRefValue, ['ru-RU']) || state.validator.isAlphanumeric(problemRefValue, ['en-US']),
            resultCheckFullAdressRefValue = state.validator.isAlphanumeric(fullAdressRefValue, ['ru-RU']) || state.validator.isAlphanumeric(fullAdressRefValue, ['en-US']),
            resultCheckFlatRefValue = state.validator.isAlphanumeric(flatRefValue, ['ru-RU']) || state.validator.isAlphanumeric(flatRefValue, ['en-US']),
            resultCheckFloorRefValue = state.validator.isAlphanumeric(floorRefValue, ['ru-RU']) || state.validator.isAlphanumeric(floorRefValue, ['en-US']),
            resultCheckEntranceRefValue = state.validator.isAlphanumeric(entranceRefValue, ['ru-RU']) || state.validator.isAlphanumeric(entranceRefValue, ['en-US']),
            resultCheckIntercomRefValue = state.validator.isAlphanumeric(intercomRefValue, ['ru-RU']) || state.validator.isAlphanumeric(intercomRefValue, ['en-US']),
            resultCheckNameRefValue = state.validator.isAlpha(nameRefValue, ['ru-RU']) || state.validator.isAlpha(nameRefValue, ['en-US']),
            resultCheckPhoneRefValue = state.validator.isMobilePhone(phoneRefValue, ['ru-RU']);

        setIsCorrectProblem(resultCheckProblemRefValue);
        setIsCorrectFullAdress(resultCheckFullAdressRefValue);
        setIsCorrectFlat(resultCheckFlatRefValue);
        setIsCorrectFloor(resultCheckFloorRefValue);
        setIsCorrectEnterance(resultCheckEntranceRefValue);
        setIsCorrectIntercome(resultCheckIntercomRefValue);
        setIsCorrectName(resultCheckNameRefValue);
        setIsCorrectPhone(resultCheckPhoneRefValue);

        if (
            resultCheckProblemRefValue &&
            resultCheckFullAdressRefValue &&
            resultCheckFlatRefValue &&
            resultCheckFloorRefValue &&
            resultCheckEntranceRefValue &&
            resultCheckIntercomRefValue &&
            resultCheckNameRefValue &&
            resultCheckPhoneRefValue
        ) {
            let aderss = `${fullAdressRefValue} кв. ${flatRefValue} этаж ${floorRefValue} под. ${entranceRefValue} домофон ${intercomRefValue}`;
            let result = await state.api.createRequestForRepairDevice(
                deviceRefValue,
                problemRefValue,
                problemRefDescriptionValue,
                aderss,
                nameRefValue,
                phoneRefValue,
                userData.id
            );

            if (result.data.data === "success" && (result.status >= 200 || result.status < 400)) {
                let repairData = {
                    'device': deviceRefValue,
                    'problem': problemRefValue,
                    'probelm_description': problemRefDescriptionValue,
                    'probelm_description': aderss,
                    'name': nameRefValue,
                    'phone': phoneRefValue
                };
                if (!Array.isArray(requestsForRepair)) {
                    let copyRequestsForRepair = Object.assign({}, requestsForRepair);
                    copyRequestsForRepair.current.push(repairData);
                    setRequestsForRepair(copyRequestsForRepair)
                } else {
                    setRequestsForRepair([...requestsForRepair, repairData])
                }
                setChooseActiveRequestRepairItem(repairData);
                changeShowActivePanel(state.panels.panel_orderRepairRequest, state);
            } else {
                addActionLogItem('При создании заказа на ремонт произошла ошибка! Попробуйте ещё раз');
            }
        }
    }

    const onChangeFullAdressRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectFullAdress(state.validator.isAlphanumeric(value, ['ru-RU']) || state.validator.isAlphanumeric(value, ['en-US']));
    }
    const onChangeFlatRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectFlat(state.validator.isAlphanumeric(value, ['ru-RU']) || state.validator.isAlphanumeric(value, ['en-US']));
    }
    const onChangeFloorRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectFloor(state.validator.isAlphanumeric(value, ['ru-RU']) || state.validator.isAlphanumeric(value, ['en-US']));
    }
    const onChangeEntranceRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectEnterance(state.validator.isAlphanumeric(value, ['ru-RU']) || state.validator.isAlphanumeric(value, ['en-US']));
    }
    const onChangeIntercomRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectIntercome(state.validator.isAlphanumeric(value, ['ru-RU']) || state.validator.isAlphanumeric(value, ['en-US']));
    }
    const onChangeNameRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectName(state.validator.isAlpha(value, ['ru-RU']) || state.validator.isAlpha(value, ['en-US']));
    }
    const onChangePhoneRefValue = (event) => {
        let value = event.target.value;
        setIsCorrectPhone(state.validator.isMobilePhone(value, ['ru-RU']));
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

    return (<Fragment>
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
                    top: "0",
                    left: "0",
                    display: 'flex',
                    alignItems: 'center'
                }} ref={headerRef}>
                    <Icon28ChevronBack onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                    <Spacing size={10} />
                    <Title>
                        Заказать ремонт
                    </Title>
                </div>
                <Spacing size={40} />

                <Group mode="card" separator={false} style={{
                    position: "relative"
                }}>
                    <Title level="2" style={{
                        background: "white",
                        position: "absolute",
                        padding: "0 10px",
                        top: "-12px",
                        left: "20px"
                    }}>Устройство</Title>
                    <Div>
                        <FormItem top="Выберите устройство" bottom="Поиск по устройствам">
                            <CustomSelect placeholder="Введите название устройства" options={options} getRef={deviceRef} />
                        </FormItem>
                    </Div>
                </Group>

                <Spacing size={20} />

                <Group mode="card" separator={false} style={{
                    position: "relative"
                }}>
                    <Title level="2" style={{
                        background: "white",
                        position: "absolute",
                        padding: "0 10px",
                        top: "-12px",
                        left: "20px"
                    }}>Проблема</Title>
                    <Div>
                        <FormItem top="Укажите проблему">
                            <Input
                                type="text"
                                placeholder="Укажите проблему"
                                onKeyUp={state.throttle(onChangeTextareaProblem, 300)}
                                getRef={problemRef}
                                defaultValue={problem}
                                style={{
                                    border: !isCorrectProblem ? "1px solid red" : ''
                                }}
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

                <Group mode="card" separator={false} style={{
                    position: "relative"
                }}>
                    <Title level="2" style={{
                        background: "white",
                        position: "absolute",
                        padding: "0 10px",
                        top: "-12px",
                        left: "20px"
                    }}>Адрес</Title>
                    <Div>
                        <FormItem top="Укажите адрес">
                            <Input
                                type="text"
                                placeholder="Укажите адрес"
                                getRef={fullAdressRef}
                                onKeyUp={onChangeFullAdressRefValue}
                                style={{
                                    border: !isCorrectFullAdress ? "1px solid red" : ''
                                }}
                            />
                        </FormItem>
                        <Spacing size={10} />
                        <CardGrid size="m" style={{
                            paddingLeft: "12px",
                            paddingRight: "12px",
                        }}>
                            <Card>
                                <Input
                                    type="text"
                                    placeholder="Квартира"
                                    onKeyUp={onChangeFlatRefValue}
                                    getRef={flatRef}
                                    style={{
                                        border: !isCorrectFlat ? "1px solid red" : ''
                                    }}
                                />
                            </Card>
                            <Card>
                                <Input
                                    type="text"
                                    placeholder="Подъезд"
                                    onKeyUp={onChangeEntranceRefValue}
                                    getRef={intercomRef}
                                    style={{
                                        border: !isCorrectEnterance ? "1px solid red" : ''
                                    }}
                                />
                            </Card>
                            <Card>
                                <Input
                                    type="text"
                                    placeholder="Этаж"
                                    onKeyUp={onChangeFloorRefValue}
                                    getRef={floorRef}
                                    style={{
                                        border: !isCorrectFloor ? "1px solid red" : ''
                                    }}
                                />
                            </Card>
                            <Card>
                                <Input
                                    type="text"
                                    placeholder="Домофон"
                                    onKeyUp={onChangeIntercomRefValue}
                                    getRef={entranceRef}
                                    style={{
                                        border: !isCorrectIntercome ? "1px solid red" : ''
                                    }}
                                />
                            </Card>
                        </CardGrid>
                    </Div>
                </Group>
                <Spacing size={20} />

                <Group mode="card" separator={false} style={{
                    position: "relative"
                }}>
                    <Title level="2" style={{
                        background: "white",
                        position: "absolute",
                        padding: "0 10px",
                        top: "-12px",
                        left: "20px"
                    }}>Контактные данные</Title>
                    <Div>
                        <FormItem top="Укажите имя">
                            <Input
                                getRef={nameRef}
                                type="text"
                                placeholder="Имя"
                                onKeyUp={onChangeNameRefValue}
                                defaultValue={userData.first_name ?? ''}
                                style={{
                                    border: !isCorrectName ? "1px solid red" : ''
                                }}
                            />
                        </FormItem>
                        <FormItem top="Укажите номер телефона">
                            <Input
                                getRef={phoneRef}
                                type="text"
                                placeholder="Номер телефона"
                                onKeyUp={onChangePhoneRefValue}
                                defaultValue={userPhone ?? ''}
                                style={{
                                    border: !isCorrectPhone ? "1px solid red" : ''
                                }}
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
    </Fragment>);
}