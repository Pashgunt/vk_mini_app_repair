import { Fragment } from "react";
import { Group, Div, Spacing, Title, InfoRow, Header, Textarea, Headline, Card, CardGrid, Button, SimpleCell, Tabs, TabsItem } from "@vkontakte/vkui";
import { Icon28ChevronBack, Icon28CancelAltOutline } from "@vkontakte/icons";

export default function OrderRepairRequestComponent(props) {
    const [
        state,
        userData,,
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

    return (<Fragment>
        <Group mode="plain" style={{
            minHeight: "100vh",
            background: state.schema == 'dark' ? '#19191A' : '#fff'
        }}>
            <Div style={{
                top: "0",
                left: "0",
                display: 'flex',
                alignItems: 'center',
                gap:"15px"
            }}>
                <Icon28CancelAltOutline onClick={() => changeShowActivePanel(state.panels.panel_mainScreen, state)} />
                <Title>
                    Заказ на ремонт {chooseActiveRequestRepairItem.device} {chooseActiveRequestRepairItem.problem}
                </Title>
            </Div>
            <Div style={{
                padding: "0"
            }}>
                <Header mode="secondary">Устройство</Header>
                <SimpleCell multiline>
                    <InfoRow header="Указанное устройство">{chooseActiveRequestRepairItem.device}</InfoRow>
                </SimpleCell>
            </Div>
            <Div style={{
                padding: "0"
            }}>
                <Header mode="secondary">Проблема</Header>
                <SimpleCell multiline>
                    <InfoRow header="Указанная проблема">{chooseActiveRequestRepairItem.problem}</InfoRow>
                </SimpleCell>
                <SimpleCell multiline>
                    <InfoRow header="Описание проблемы">{chooseActiveRequestRepairItem.probelm_description ?? '–'}</InfoRow>
                </SimpleCell>
            </Div>
            <Div style={{
                padding: "0"
            }}>
                <Header mode="secondary">Адрес</Header>
                <SimpleCell multiline>
                    <InfoRow header="Полный адрес">{chooseActiveRequestRepairItem.adress}</InfoRow>
                </SimpleCell>
            </Div>
            <Div style={{
                padding: "0"
            }}>
                <Header mode="secondary">Контактные данные</Header>
                <SimpleCell multiline>
                    <InfoRow header="Имя">{chooseActiveRequestRepairItem.name}</InfoRow>
                </SimpleCell>
                <SimpleCell multiline>
                    <InfoRow header="Номер телефона">{chooseActiveRequestRepairItem.phone}</InfoRow>
                </SimpleCell>
            </Div>
        </Group>
    </Fragment>);
}