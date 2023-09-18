import {lazy} from "react";

export const AsyncMainPage = lazy(() => new Promise((resolve) => {
    //@ts-ignore
    setTimeout(() => resolve(import('./MainPage')), 1500)
}));