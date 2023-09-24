import {App} from "app/App";
import ReactDOM from "react-dom/client";
import {ThemeProvider} from "app/providers/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ThemeProvider><App/></ThemeProvider>);

