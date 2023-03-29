import { Fragment } from "react";
import { Group, Div, usePlatform, Title, CardGrid, Spacing } from "@vkontakte/vkui";
import MainCardAnotherProduct from "../MainCardAnotherProduct";
import { Icon28ChevronBack } from "@vkontakte/icons";

export default function AnotherProductsItemsComponents(props) {
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

    const cards = state.components.mainAnotherProducts.productCards;
    const platform = usePlatform();

    const back = () => {

        let toPanel = history?.at(-2);
        setHistory([...history, toPanel])
        changeShowActivePanel(toPanel, state)
    }

    return (<Fragment>
        <Group mode="plain" separator="hide" style={{
            minHeight: "100vh",
            background: state.setBgColor()
        }}>
            <Div style={{
                paddingTop: platform === 'ios' ? '50px' : '12px',
                display: 'flex',
                alignItems: 'center',
                gap: "15px"
            }}>
                <div>
                    <Icon28ChevronBack onClick={back} />
                </div>
                <Title>
                    Другие продукты
                </Title>
            </Div>
            <Spacing size={15} />
            <Div style={{
                paddingTop: 0,
                paddingBottom: 0
            }}>
                <CardGrid size="m">
                    {
                        Object.keys(cards).map((title, index) => {
                            return (<Fragment key={index}><MainCardAnotherProduct
                                state={state}
                                title={title}
                                image={state.images}
                                imageName={cards[title]['img']}
                                panel={cards[title]['panel']}
                                changeShowActiveModal={changeShowActiveModal}
                            /></Fragment>);
                        })
                    }
                </CardGrid>
            </Div>
        </Group>
    </Fragment>);
}