import React, { useState, useRef } from "react";

import { IconButton, Box } from "@mui/material";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

import { useDataContext } from "./context";
import NavBar from "./NavBar";
import LateralBar from "./LateralBar";

export default function LoadLocalIFC() {
	//---------------------------------------------------------------------------------------------
	//HANDLERS
	//---------------------------------------------------------------------------------------------

	const fileInputRef = useRef(null);
	const [setSelectedFile] = useState(null);
	const {
		viewerRef,
		treeData,
		sectionData,
		setSectionData,
		isDimensionActive,
		setDimensionActive,
	} = useDataContext();

	const handleDimensionClick = () => {
		const viewer = viewerRef.current;
		if (!isDimensionActive) {
			setDimensionActive(true);
		} else {
			viewer.dimensions.active = false;
			viewer.dimensions.previewActive = false;
			setDimensionActive(false);
		}
		console.log(isDimensionActive);
	};

	//-----------------------------------------------------------------------------------------------
	//JSX
	//-----------------------------------------------------------------------------------------------
	return (
		<Box>
			<NavBar viewerRef={viewerRef} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<LateralBar
					treeData={treeData}
					sectionData={sectionData}
					setSectionData={setSectionData}
					viewerRef={viewerRef}
				/>
				<Box
					sx={{
						display: "flex",
						flexGrow: 1,
						position: "relative",
						overflow: "hidden", // Para evitar desbordamientos
					}}
				>
					<Box>
						<div
							id="viewer-container"
							style={{
								width: "100%",
								height: "100%",
								position: "absolute",
							}}
						></div>
					</Box>

					<input
						type="file"
						ref={fileInputRef}
						onChange={(e) => setSelectedFile(e.target.files[0])}
						style={{ display: "none" }}
					/>
				</Box>
			</Box>
			<IconButton
				size="large"
				onClick={handleDimensionClick}
				sx={{
					position: "fixed",
					bottom: "5%",
					right: "4%",
					backgroundColor: isDimensionActive ? "green" : "Dodgerblue",
				}}
			>
				<SquareFootIcon fontSize="large" sx={{ color: "white" }} />
			</IconButton>
		
		</Box>

	);
}
