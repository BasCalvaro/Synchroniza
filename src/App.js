import React from "react";
import { useRef } from "react";
import LoadLocalIFC from "./components/LoadLocalIFC";
import { DimensionProvider } from "./components/DimesionControl";
import { DataProvider } from "./components/context";

function App() {
	const viewerRef = useRef(null);

	return (
		<DataProvider>
			<DimensionProvider viewerRef={viewerRef}>
				<div className="App">
					<LoadLocalIFC viewerRef={viewerRef} />
				</div>
			</DimensionProvider>
		</DataProvider>
	);
}

export default App;
