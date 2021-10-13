import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import en from "./assets/locales/en.json";
import zh_HK from "./assets/locales/zh_Hant_TW.json";

import de from "./assets/locales/de.json";
import es from "./assets/locales/es.json";
import fr from "./assets/locales/fr.json";
import id from "./assets/locales/id.json";
import it from "./assets/locales/it.json";
import ja from "./assets/locales/ja.json";
import ko from "./assets/locales/ko.json";
import pl from "./assets/locales/pl.json";
import pt from "./assets/locales/pt.json";
import ro from "./assets/locales/ro.json";
import ru from "./assets/locales/ru.json";
import tr from "./assets/locales/tr.json";

import {
    initReactI18next
} from 'react-i18next';
i18n.use(LanguageDetector) //嗅探当前浏览器语言
    .use(initReactI18next) //init i18next
    .init({
        //引入资源文件
        resources: {
            de: {
                translation: de,
            },
            en: {
                translation: en,
            },
            es: {
                translation: es,
            },
            fr: {
                translation: fr,
            },
            id: {
                translation: id,
            },
            it: {
                translation: it,
            },
            ja: {
                translation: ja,
            },
            ko: {
                translation: ko,
            },
            pl: {
                translation: pl,
            },
            pt: {
                translation: pt,
            },
            ro: {
                translation: ro,
            },
            ru: {
                translation: ru,
            },
            zh_HK: {
                translation: zh_HK,
            },
            tr: {
                translation: tr,
            }

        },

        //选择默认语言，选择内容为上述配置中的key，即en/zh
        fallbackLng: localStorage.getItem('I18N') || 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    })

export default i18n;