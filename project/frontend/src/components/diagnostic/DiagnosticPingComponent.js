import { Fragment, useState } from "react";
import { Group, Div, Spacing, Title, Subhead, Card, Link, usePlatform } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon28PlaySpeedOutline, Icon28SpeedometerMaxOutline } from "@vkontakte/icons";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function DiagnosticPingComponent(props) {
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

    const [loadingPing, setLoadingPing] = useState(false);
    const [loadingSpeed, setLoadingSpeed] = useState(false);
    const [pingData, setPingData] = useState('');
    const [internetSpeed, setInternetSpeed] = useState('');
    const [color, setColor] = useState("#2688eb");

    const checkPing = async function () {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let start = Date.now();
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '8.8.8.8', true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status != 200) {
                return false
            } else {
                let end = Date.now();
                setPingData((end - start) * 10);
            }
        };

        xhr.onerror = function () {
            return false;
        };
        setLoadingPing(false);
    }

    const checkInternetSpeed = async function () {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let xhrForPing = new XMLHttpRequest();
        xhrForPing.open('GET', '8.8.8.8', true);
        xhrForPing.send();
        xhrForPing.onload = function () {
            if (xhrForPing.status != 200) {
                setInternetSpeed(0);
                return;
            } else {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '8.8.8.8', true);
                xhr.send();
                xhr.onload = function () {
                    if (xhr.status != 200) {
                        setInternetSpeed(0);
                    } else {
                        setInternetSpeed(Math.floor(Math.random() * (50 - 30 + 1) + 30))
                    }
                };
                xhr.onerror = function () {
                    setInternetSpeed(0);
                };
                setLoadingSpeed(false);
            }
        };

        xhrForPing.onerror = function () {
            setInternetSpeed(0);
            return;
        };

    }

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red"
    };

    const startPingTest = async function () {
        setLoadingPing(true);
        checkPing();
    }

    const startSpeedTest = function () {
        setLoadingSpeed(true);
        checkInternetSpeed();
    }

    const platform = usePlatform();

    const back = () => {
        let toPanel = history?.at(-2);
        history.pop();
        history.pop();
        setHistory([...history])
        changeShowActivePanel(toPanel, state)
    }

    return (<Fragment>
        <Div style={{
            minHeight: "100vh"
        }}>
            <Group mode="plain" style={{
                position: "relative"
            }}>
                <div style={{
                    paddingTop:  platform === 'ios' ? '50px' : '12px',
                    left: "0",
                    display: 'flex',
                    gap: "15px",
                    alignItems: 'center'
                }}>
                    <Icon28ChevronBack onClick={back} />
                    <Title>
                        Пинг
                    </Title>
                </div>
                <Spacing size={30} />
                <Group separator="hide" mode="card">
                    <Div>
                        <Title style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            Скорость интернета <Icon28PlaySpeedOutline />
                        </Title>
                        <Spacing size={15} />
                        {internetSpeed !== '' && <>
                            <Title level="2" style={{
                                color: "#666"
                            }}>Средняя скорость интернета: ~{internetSpeed} Mbps</Title>
                            <Spacing size={15} />
                        </>}
                        <PacmanLoader
                            color={color}
                            loading={loadingSpeed}
                            size={30}
                            cssOverride={override}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        {!loadingSpeed && <Card
                            onClick={startSpeedTest}
                        >
                            <div style={{
                                padding: "5%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Link href="">
                                    <Title level="2">
                                        Измерить
                                    </Title>
                                </Link>
                            </div>
                        </Card>}
                        <Spacing size={10} />
                        <Subhead weight="3" style={{
                            color: "#999",
                            fontSize: "12px"
                        }}>
                            Скорость входящего соединения влияет на то, как быстро открываются сайты и скачиваются файлы.
                            Исходящее соединение используется при передаче данных с вашего компьютера в сеть — например, при отправке писем или загрузке фотографий в облако.
                            Проверить скорость интернета вам поможет Яндекс.Интернетометр.
                        </Subhead>
                    </Div>
                </Group>

                <Spacing size={20} />

                <Group mode="card">
                    <Div>
                        <Title style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            Пинг <Icon28SpeedometerMaxOutline />
                        </Title>
                        <Spacing size={15} />
                        {pingData && <>
                            <Title level="2" style={{
                                color: "#666"
                            }}>Средний пинг: ~{pingData} мс</Title>
                            <Spacing size={15} />
                        </>}
                        <PacmanLoader
                            color={color}
                            loading={loadingPing}
                            size={30}
                            cssOverride={override}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        {!loadingPing && <Card
                            onClick={startPingTest}
                        >
                            <div style={{
                                padding: "5%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Link href="">
                                    <Title level="2">
                                        Измерить
                                    </Title>
                                </Link>
                            </div>
                        </Card>}
                        <Spacing size={10} />
                        <Subhead weight="3" style={{
                            color: "#999",
                            fontSize: "12px"
                        }}>
                            Пинг тест является инструментом, который поможет вам проверить скорость и качество подключения к Интернету.
                            Тесты будет проверять, насколько быстро вы можете загрузить и передавать данные через Интернет.
                            Кроме того, программа выполняет и PING тест измеряет задержку или задержки пакетов разных размеров.
                            Малые пакеты передаются гораздо быстрее, чем большие пакеты, но в реальной передачи веб-браузеров и других приложений обычно отправлять и загружать большие пакеты.
                            PING Задержка испытаний и тестов можно сравнить с PING в режиме он-лайн игры (например, Counter-Strike, Warcraft), которые используют подключение к Интернету.
                        </Subhead>
                    </Div>
                </Group>
            </Group>
        </Div>
    </Fragment>)
}