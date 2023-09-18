import {App} from "./App";
import ReactDOM from "react-dom/client";
import {ThemeProvider} from "./theme/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ThemeProvider><App/></ThemeProvider>);

