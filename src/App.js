import React from "react";
import { useRef } from "react";
import LoadLocalIFC from "./components/LoadLocalIFC";
import { DataProvider } from "./components/context";

function App() {
	const viewerRef = useRef(null);

	return (
		<DataProvider>
			<div className="App">
				<LoadLocalIFC viewerRef={viewerRef} />
			</div>
		</DataProvider>
	);
}

export default App;
