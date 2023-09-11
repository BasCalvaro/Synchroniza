import React, { useState } from "react";
import { Container, Box, IconButton } from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";

import Drawer from "./Drawer";

export default function LoadLocalIFC({ viewerRef, sectionData }) {
	const [isDimensionActive, setDimensionActive] = useState(false);

	//---------------------------------------------------------------------------------------------
	//HANDLERS - OBTENER DIMENSIONES 
	//---------------------------------------------------------------------------------------------

	const handleDimensionClick = () => {
		const viewer = viewerRef.current;
		if (!isDimensionActive) {
			viewer.dimensions.active = true;
			viewer.dimensions.previewActive = true;
		} else {
			viewer.dimensions.active = false;
			viewer.dimensions.previewActive = false;
		}
		setDimensionActive(!isDimensionActive);
	};
	//-----------------------------------------------------------------------------------------------
	//JSX
	//-----------------------------------------------------------------------------------------------
	return (
		<>
			<Drawer viewerRef={viewerRef}/>
			
			<IconButton onClick={handleDimensionClick}>
				<StraightenIcon />
			</IconButton>

			<Container maxWidth="100%" sx={{ backgroundColor: "#EFEBEB" }}>
				<Box>
					<div id="viewer-container"></div>
				</Box>
			</Container>
		</>
	);
}
