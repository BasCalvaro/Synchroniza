import React from "react";
import { useRef } from "react";
import LoadLocalIFC from "./components/LoadLocalIFC";
import MiniDrawer from "./components/Drawer";
import { DimensionProvider } from "./components/DimesionControl";

function App() {
	const viewerRef = useRef(null);

	return (
		<DimensionProvider viewerRef={viewerRef}>
			<div className="App">
				<LoadLocalIFC viewerRef={viewerRef} />
			</div>
		</DimensionProvider>
	);
}

export default App;
