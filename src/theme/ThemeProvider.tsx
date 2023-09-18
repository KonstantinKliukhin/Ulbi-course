import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from "./ThemeContext";
import {FC, PropsWithChildren, useEffect, useMemo, useState} from "react";

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT
export const ThemeProvider: FC<PropsWithChildren> = props => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        if (!theme) return;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    const themeProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider
            value={themeProps}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}