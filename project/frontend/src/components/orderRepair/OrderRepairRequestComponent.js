import { Fragment } from "react";
import { Group, Div, Spacing, Title, InfoRow, Header, Textarea, Headline, Card, usePlatform, Button, SimpleCell, Tabs, TabsItem } from "@vkontakte/vkui";
import { Icon28CancelAltOutline } from "@vkontakte/icons";

export default function OrderRepairRequestComponent(props) {
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

    const platform = usePlatform();

    const back = () => {

        let toPanel = history?.at(-2);
        setHistory([...history, toPanel])
        changeShowActivePanel(toPanel, state)
    }

    return (<Fragment>
        <Group mode="plain" style={{
            minHeight: "100vh",
            background: state.setBgColor()
        }}>
            <Div style={{
                paddingTop: platform === 'ios' ? '50px' : '12px',
                left: "0",
                display: 'flex',
                alignItems: 'center',
                gap: "15px"
            }}>
                <div>
                    <Icon28CancelAltOutline onClick={back} />
                </div>
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