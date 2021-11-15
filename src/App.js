import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

function App() {
	return (
		<>
			{/* <Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/:module/:id" element={<Home />} />
				<Route path="/categoty/:id" />
			</Routes> */}
      <Home />
		</>
	);
}

export default App;
