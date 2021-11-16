import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
String.prototype.trunc = function (n) {
	return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};
function App() {
	return <Home />;
}

export default App;
