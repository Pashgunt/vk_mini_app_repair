import { settingsStyles } from "./styles";
import { GlobalEnums } from "../enums/GlobalEnums";
import { Images } from "../enums/ImageConnect";
import { localStorage } from "@vkontakte/vkjs";
import * as API from "../server/main";
import validator from 'validator';

export const state = {
    styles: settingsStyles,
    panels: GlobalEnums,
    images: Images,
    validator: validator,
    schema: "bright_light",
    activePanel: GlobalEnums.panel_mainScreen,
    activeModal: null,
    problem: '',
    api: API,
    get problemText() {
        return this.problem || localStorage.getItem('problemText');
    },
    set problemText(newProblem) {
        this.problem = newProblem;
        localStorage.setItem('problemText', newProblem);
    },
    get activePanelState() {
        return this.activePanel || localStorage.getItem('activePanel');
    },
    get activeModalState() {
        return this.activeModal;
    },
    set activePanelState(newActivePanelState) {
        this.activePanel = newActivePanelState;
        localStorage.setItem("activePanel", newActivePanelState);
    },
    set activeModalState(newActiveModalState) {
        this.activeModal = newActiveModalState;
    },
    pick(source, ...props) {
        const obj = {};
        for (const prop of props) {
            obj[prop] = source[prop];
        }
        return obj;
    },
    throttle(func, ms) {
        let isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {
            if (isThrottled) {
                savedArgs = arguments;
                savedThis = this;
                return;
            }
            func.apply(this, arguments);
            isThrottled = true;
            setTimeout(function () {
                isThrottled = false;
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    },
    sizes: {
        'mac': {
            'sm': {
                'width': '68',
                'height': '40',
            },
            'md': {
                'width': '136',
                'height': '80',
            },
            'lg': {
                'width': '272',
                'height': '160',
            }
        },
        'ipad': {
            'sm': {
                'width': '36',
                'height': '40',
            },
            'md': {
                'width': '72',
                'height': '80',
            },
            'lg': {
                'width': '144',
                'height': '160',
            }
        },
        'iphone': {
            'sm': {
                'width': '36',
                'height': '40',
            },
            'md': {
                'width': '72',
                'height': '80',
            },
            'lg': {
                'width': '144',
                'height': '160',
            }
        },
        'watch': {
            'sm': {
                'width': '78',
                'height': '40',
            },
            'md': {
                'width': '156',
                'height': '80',
            },
            'lg': {
                'width': '312',
                'height': '160',
            }
        },
        'pods': {
            'sm': {
                'width': '36',
                'height': '40',
            },
            'md': {
                'width': '72',
                'height': '80',
            },
            'lg': {
                'width': '144',
                'height': '160',
            }
        }
    },
    components: {
        addDeviceHeader: {
            placeholder: 'Введите название устройства',
            deviceCards: {
                cardStyle: settingsStyles.cardStyle,
                cardHeaderStyle: settingsStyles.cardHeaderStyle,
                types: {
                    'Mac': {
                        'img': 'mac',
                        'width': '68',
                        'height': '40',
                    },
                    'iPad': {
                        'img': 'ipad',
                        'width': '36',
                        'height': '40',
                    },
                    'iPhone': {
                        'img': 'iphone',
                        'width': '36',
                        'height': '40',
                    },
                    'Watch': {
                        'img': 'watch',
                        'width': '78',
                        'height': '40',
                    },
                    'AirPods': {
                        'img': 'pods',
                        'width': '36',
                        'height': '40',
                    }
                }
            }
        },
        mainHeader: {
            title: 'Поддержка',
            placeholder: 'Расскажите нам о проблеме'
        },
        mainDevices: {
            title: 'Мои устройства',
            button: 'Добавить устройство',
            styleButton: settingsStyles.styleButtonAddDevice
        },
        mainSupportTools: {
            title: 'Инструменты поддержки',
            supportCard: {
                'Заказать ремонт': {
                    'img': 'repair',
                    'panel': GlobalEnums.panel_orderRepair,
                },
                'Ближайшие к Вам мастера': {
                    'img': 'map',
                    'panel': GlobalEnums.panel_nearestMasters,
                },
                'Чат со специалистом': {
                    'img': 'chat',
                    'panel': GlobalEnums.panel_chatWithSupport,
                },
            }
        },
        diagnostics: {
            title: "Диагностика",
            cardStyle: settingsStyles.cardStyle,
            cardHeaderStyle: settingsStyles.cardHeaderStyle,
            tools: {
                'Дисплей': {
                    'img': 'display',
                    'panel': GlobalEnums.panel_deiagnosticDisplay,
                },
                'Мультитач': {
                    'img': 'multiTouch',
                    'panel': GlobalEnums.panel_deiagnosticMultitouch,
                },
                'Линии': {
                    'img': 'lines',
                    'panel': GlobalEnums.panel_deiagnosticLines,
                },
                'Тачскрин': {
                    'img': 'touch',
                    'panel': GlobalEnums.panel_deiagnosticTochscreen,
                },
                'Пинг': {
                    'img': 'ping',
                    'panel': GlobalEnums.panel_deiagnosticPing,
                },
                'GPS': {
                    'img': 'gps',
                    'panel': GlobalEnums.panel_deiagnosticGPS,
                },
                'Динамики': {
                    'img': 'sound',
                    'panel': GlobalEnums.panel_deiagnosticSound,
                },
                'Микрофон': {
                    'img': 'micro',
                    'panel': GlobalEnums.panel_deiagnosticMicro,
                },
                'Камера': {
                    'img': 'camera',
                    'panel': GlobalEnums.panel_deiagnosticCamera,
                }
            }
        },
        mainAnotherProducts: {
            title: 'Другие продукты',
            cardStyle: settingsStyles.cardStyle,
            cardHeaderStyle: settingsStyles.cardHeaderStyle,
            productCards: {
                'Страховка': {
                    'img': 'insurance',
                    'panel': ''
                },
                'Подарки': {
                    'img': 'gifts',
                    'panel': ''
                },
                'Подписки': {
                    'img': 'subscription',
                    'panel': ''
                },
            }
        }
    },
    themesOfSupport: {
        'iphone': {
            'repair': 'Ремонт и физические повреждения',
            'perfomance': 'Производительность устройства',
            'security': 'Пароли и безопасность',
            'power': 'Питание, аккумулятор и зарядка',
            'recovery': 'Обновление, резервное копирование и восстановление',
            'another': 'Другие вопросы',
        },
        'ipad': {
            'repair': 'Ремонт и физические повреждения',
            'perfomance': 'Производительность устройства',
            'security': 'Пароли и безопасность',
            'power': 'Питание, аккумулятор и зарядка',
            'recovery': 'Обновление, резервное копирование и восстановление',
            'another': 'Другие вопросы',
        },
        'pods': {
            'audio': 'Аудио и звук',
            'power': 'Питание, аккумулятор и зарядка',
            'damage': 'Механические повреждения или повреждения из-за контакта с жидкостью',
            'another': 'Другие вопросы',
        },
        'mac': {
            'programs': 'Программы и ПО',
            'internet': 'Интернет',
            'power': 'Питание, аккумулятор и зарядка',
            'damage': 'Механические повреждения или повреждения из-за контакта с жидкостью',
            'another': 'Другие вопросы',
        },
        'watch': {
            'power': 'Питание, аккумулятор и зарядка',
            'damage': 'Механические повреждения или повреждения из-за контакта с жидкостью',
            'programs': 'Программы и ПО',
            'another': 'Другие вопросы',
        }
    },
    detailProblemList: {
        'detail': [
            'Обслуживание аккумулятора',
            'Треснутый экарн',
            'Задняя панель повреждена',
            'Устройство не включается',
            'Качество экрана или дисплея',
            'Камера работае некорректно',
        ]
    },
    modal: {
        searchProblem: {
            title: 'Расскажите нам о проблеме',
            button: 'Далее',
            quickSearch: [
                "Замена стекла",
                "Замена заднего стекла",
                "Замена АКБ",
                "Не заряжается",
                "Не вкл. / Перезагружается",
                "Попала вода",
                "Нет звука",
                "Не работает камера",
                "Замена стекла камеры",
                "Не ловит сеть",
                "Не работают кнопки",
                "Замена дисплейного модуля",
                "Замена контроллера питания",
                "Кнопка Home / Touch ID",
                "Замена виброматора",
                "Не работает Face ID",
                "Не работает Wi-Fi",
                "Память",
                "Защитное стекло",
                "Чистка / Греется",
                "Замена корпуса",
                "Программное обеспечение",
                "Замена платы",
            ]
        },
        chooseDevice: {
            cardProblemStyle: settingsStyles.problemContainerTextStyle,
            textProblemStyle: settingsStyles.problemTextStyle,
            carAddDeviceStyle: settingsStyles.styleButtonAddDeviceForModal,
            carAddDeviceText: "Добавить устройство",
            title: "Помощь в отношении какого продукта вы хотите получить?",
            subTitle: "ОБЩАЯ ПОМОЩЬ",
            subTitleDevice: "МОИ УСТРОЙСТВА",
            cardDevice: {
                style: settingsStyles.cardDeviceProblemStyle,
                images: {
                    'iPhone': {
                        image: 'iphone',
                        width: 36,
                        height: 40
                    },
                    'iPad': {
                        image: 'ipad',
                        width: 36,
                        height: 40
                    },
                    'Apple Watch': {
                        image: 'watch',
                        width: 56,
                        height: 30
                    },
                    'Mac': {
                        image: 'mac',
                        width: 48,
                        height: 36
                    },
                }
            }
        },
        createRequestRepair: {
            getTitle(textProblem) {
                return `Заявка на ремонт по проблеме "${textProblem}" успешно создана, с Вами свяжутся в ближайшее
                        время`;
            }
        }
    }
}