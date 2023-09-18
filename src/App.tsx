import {RouterProvider,} from "react-router-dom";
import {router} from "./router";
import './styles/index.scss'
import {Theme, ThemeContext} from "./theme/ThemeContext";
import {useContext} from "react";
import {classNames} from "./classNames/classNames";


export const App = () => {
    const {theme, setTheme} = useContext(ThemeContext);
    const toggleTheme = () => setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Theme</button>
            <RouterProvider router={router}/>
        </div>
    );
};
