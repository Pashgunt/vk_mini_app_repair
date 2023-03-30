import { settingsStyles } from "./styles";
import { GlobalEnums } from "../enums/GlobalEnums";
import { Images } from "../enums/ImageConnect";
import { localStorage } from "@vkontakte/vkjs";
import * as API from "../server/main";
import validator from 'validator';

const insertballoonMarkup = (path, title, address) => {
    return (`<div id="balloon-markup">
    <div class="balloon">
        <div class="balloon__col">
            <img class="balloon__img" src=${path} alt="СЦ">
        </div>
        <div class="balloon__col">
            <h2 class="balloon__title balloon__title_desktop">
                ${title}
                <span class="text_accent line-break">${address}</span>
            </h2>
            <div>
                <button class="btn btn-lg btn-primary">
                    Оставить заявку
                </button>
            </div>
        </div>
    </div>
</div>`);
}

const insertBaloonHeaderForServices = (title) => {
    return (
        `<div class="fs-5">${title}</div>`
    );
}

const insertBaloonBodyForServices = (body, button) => {
    return (
        `<div class="fs-6 mt-2">${body}<div> <div class="btn btn-lg btn-primary mt-3">${button}</div>`
    );
}

const state = {
    styles: settingsStyles,
    panels: GlobalEnums,
    images: Images,
    validator: validator,
    schema: "light",
    activePanel: GlobalEnums.panel_mainScreen,
    activeModal: null,
    problem: '',
    api: API,
    isCrashedTests: 1,
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
    setBgColor() {
        return this.schema === "dark" ? '#19191A' : '#FFF';
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
    servicePlacemarks: [
        {
            coords: [59.935243, 30.327481],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices("Центральный сервисный центр"),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку',)
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.956586392534284, 30.32652402687611],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Горьковская'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.900201477457585, 30.272335358149004],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Нарвская'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.88052047756017, 30.262888617998716],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Кировский завод'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.842907805171436, 30.247683175093606],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Просп. Ветеранов'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.99010084249568, 30.25691533852327],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Старая деревня'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.98695090127238, 30.203989990241528],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('<div class="fs-5">СЦ на м. Беговая</div>'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.84935771686988, 30.320491959922677],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Московская'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.931524766221344, 30.3597000833899],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Площадь Восстания'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.961532929704504, 30.292204801349516],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Чкаловская'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.92139268421546, 30.329778948356914],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Пушкинская'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.92139268421546, 30.329778948356914],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Международная'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.884170, 30.369374],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Бухарестская'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.852367, 30.398301],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Проспект Славы'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.892969, 30.318437],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Московские ворота'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.825368, 30.380875],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Купчино'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.999030, 30.366009],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Площадь Мужества'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [60.011783, 30.398035],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Академическая'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.918572, 30.469614],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Просп. Большевиков'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
        {
            coords: [59.932708, 30.437390],
            properties: {
                balloonContentHeader: insertBaloonHeaderForServices('СЦ на м. Ладожская'),
                balloonContentBody: insertBaloonBodyForServices('Для записи на ремонт оставьте заявку:', 'Оставить заявку')
            },
            options: {
                iconLayout: 'default#image',
                iconImageHref: Images.placeholderForEng,
                iconImageSize: [40, 40]
            }
        },
    ],
    engineerPlacemarks: [
        {
            coords: [59.848935286473356, 30.14567876625752],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng1, 'Сервис-инженер на', 'Петергофском ш.')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.867300, 30.319490],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng2, 'Сервис-инженер у', 'м. Парк Победы')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.91114645698265, 30.317654942875347],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng3, 'Сервис-инженер у', 'м. Фрунзенская')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.875333, 30.394455],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng4, 'Сервис-инженер у', 'м. Международная')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.925530, 30.380857],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng5, 'Сервис-инженер у', 'м. Международная')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.949352, 30.381090],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng6, 'Сервис-инженер на', 'Шпалерной ул.')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.938885, 30.283712],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng7, 'Сервис-инженер у', 'м. Василеостровская')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.937840, 30.240944],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng8, 'Сервис-инженер на', 'ул. Беринга')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.986597, 30.354759],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng9, 'Сервис-инженер у', 'м. Лесная')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.959756, 30.352992],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng10, 'Сервис-инженер у', 'м. Лесная')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.880745, 30.481268],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng11, 'Сервис-инженер на', 'пр. Большевиков')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.942186, 30.480932],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng12, 'Сервис-инженер на', 'Индустриальном пр.')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [59.984218, 30.421080],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng13, 'Сервис-инженер на', 'Пискаревском пр.')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
        {
            coords: [60.051799, 30.332212],
            properties: {
                balloonContentBody: insertballoonMarkup(Images.eng14, 'Сервис-инженер у', 'м. пр. Просвещения')
            },
            options: {
                preset: "islands#blueCircleDotIcon",
                hasBalloon: true
            }
        },
    ],
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
                // 'Мультитач': {
                //     'img': 'multiTouch',
                //     'panel': GlobalEnums.panel_deiagnosticMultitouch,
                // },
                'Линии': {
                    'img': 'lines',
                    'panel': GlobalEnums.panel_deiagnosticLines,
                },
                // 'Тачскрин': {
                //     'img': 'touch',
                //     'panel': GlobalEnums.panel_deiagnosticTochscreen,
                // },
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
                'Подарки': {
                    'img': 'gifts',
                    'panel': GlobalEnums.modal_gifts
                },
                'Страховка': {
                    'img': 'insurance',
                    'panel': ''
                },
                'Подписки': {
                    'img': 'subscription',
                    'panel': ''
                },
            }
        }
    },
    gifts: [
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
        {
            'title': 'Подарок 1',
            'img': 'gifts',
            'access': false
        },
    ],
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

export { state };