import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to SmartFarm AI',
      tagline: 'Real-time insights for confident farming decisions.',
    },
  },
  local: {
    translation: {
      welcome: 'स्मार्टफार्म एआई में आपका स्वागत है',
      tagline: 'विश्वसनीय कृषि निर्णयों के लिए वास्तविक समय जानकारी।',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;


