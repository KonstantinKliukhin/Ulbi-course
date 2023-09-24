import {FC} from 'react';
// import cls from './LanguageSwitcher.module.scss';
import {classNames} from "shared/lib";
import {Button} from "shared/ui";
import {ThemeButton} from "shared/ui/Button/Button";
import {useTranslation} from "react-i18next";


interface LanguageSwitcherProps {
    className?: string;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = props => {
    const {t, i18n} = useTranslation();

    const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames('', {}, [props.className])}
            onClick={toggleLanguage}
        >
            {t('language')}
        </Button>
    );
};
