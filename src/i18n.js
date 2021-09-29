import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import enUsTrans from "./assets/locales/en.json";
import zhCnTrans from "./assets/locales/zh_Hant_TW.json";
import {
    initReactI18next
} from 'react-i18next';
console.log('--------------', LanguageDetector);
i18n.use(LanguageDetector) //嗅探当前浏览器语言
    .use(initReactI18next) //init i18next
    .init({
        //引入资源文件
        resources: {
            en: {
                translation: enUsTrans,
            },
            zh_HK: {
                translation: zhCnTrans,
            },
        },

        //选择默认语言，选择内容为上述配置中的key，即en/zh
        fallbackLng: localStorage.getItem('I18N') || 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    })

export default i18n;