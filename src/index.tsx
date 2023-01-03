import "./assets/styles/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { RepositoryWidgetContextProvider } from "./sections/dashboard/repositoryWidget/RepositoryWidgetContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<RepositoryWidgetContextProvider>
		<App />
	</RepositoryWidgetContextProvider>
);
