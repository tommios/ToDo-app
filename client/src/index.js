import React from "react";
import ReactDOM from "react-dom";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./theme";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Provider} from "react-redux";
import {configureStore} from "./store";

const store = configureStore();

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>
    ,
    document.getElementById("root")
);

serviceWorker.unregister();
