import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ConfigProvider } from "antd";
import en from "antd/locale/en_US";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement,);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider locale={en}>
				<App />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);

