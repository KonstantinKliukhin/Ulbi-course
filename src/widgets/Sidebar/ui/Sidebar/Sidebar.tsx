import {FC, useState} from 'react';
import cls from './Sidebar.module.scss';
import {classNames} from "shared/lib";
import {ThemeSwitcher} from "features/ThemeSwitcher";
import {LanguageSwitcher} from "features/LanguageSwitcher";


interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = props => {
    const [collapsed, setCollapsed] = useState(false);
    const onToggle = () => {
        setCollapsed(prev => !prev);
    }

    return (
        <div
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [props.className])}
        >
            <button onClick={onToggle}>toggle</button>

            <div className={cls.switchers}>
                <LanguageSwitcher/>
                <ThemeSwitcher className={cls.themeSwitcher}/>
            </div>
        </div>
    );
};
