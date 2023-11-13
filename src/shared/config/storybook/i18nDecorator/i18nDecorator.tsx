import { type FC, Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { Loader } from 'shared/ui';

i18n.on('languageChanged', (locale) => {
  document.dir = i18n.dir(locale);
});
export const I18nDecorator = (Story: FC, context: any) => {
  const { locale, } = context.globals;

  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [locale,]);

  return (
    <Suspense fallback={<Loader/>}>
      <I18nextProvider i18n={i18n}>
        <Story/>
      </I18nextProvider>
    </Suspense>
  );
};
