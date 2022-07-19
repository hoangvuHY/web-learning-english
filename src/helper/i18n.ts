import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from 'locales/en.json';
import translationJA from 'locales/ja.json';
import translationKO from 'locales/ko.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJA,
  },
  ko: {
    translation: translationKO,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'ko',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// i18n.changeLanguage('en'); Cái này dùng để thay đổi ngôn ngữ. 1 project chọn 1 ngôn ngữ

export default i18n;
