import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { store, persister } from "./utils/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
)

reportWebVitals()
