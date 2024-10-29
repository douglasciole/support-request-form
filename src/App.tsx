import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomForm from "./componenets/CustomForm";
import Confirmation from "./componenets/Confirmation";
import { Provider } from "react-redux";
import store from "./reducer";
import "./App.css";

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Router>
					<Routes>
						<Route path="/confirm" element={<Confirmation />} />
						<Route path="/*" element={<CustomForm />} />
					</Routes>
				</Router>
			</div>
		</Provider>
	);
}

export default App;
