import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'local' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
    >
      {i18n.language === 'en' ? 'EN' : 'LOCAL'}
    </button>
  );
};

export default LanguageSwitcher;


