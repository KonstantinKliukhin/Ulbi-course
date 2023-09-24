import {FC} from 'react';
import {AppRoutes, RoutePath} from "shared/config";
import cls from './Navbar.module.scss';
import {classNames} from "shared/lib";
import {AppLink} from "shared/ui";
import {AppLinkTheme} from "shared/ui/AppLink/AppLink";

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = props => {
    return (
        <div className={classNames(cls.navbar, {}, [props.className])}>
            <div className={cls.links}>
                <AppLink
                    to={RoutePath[AppRoutes.MAIN]}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.mainLink}
                >
                    Home
                </AppLink>
                <AppLink to={RoutePath[AppRoutes.ABOUT]} theme={AppLinkTheme.SECONDARY}>About</AppLink>
            </div>
        </div>
    );
};