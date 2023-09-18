import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {AsyncMainPage} from "./pages/MainPage/AsyncMainPage";
import {AsyncAboutPage} from "./pages/AboutPage/AsyncAboutPage";
import {Links} from "./components/links/Links";
import {Suspense} from "react";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Links/>}>
        <Route index element={<Suspense fallback={<div>Loading...</div>}><AsyncMainPage/></Suspense>}/>
        <Route path="about" element={<AsyncAboutPage/>}/>
    </Route>
));