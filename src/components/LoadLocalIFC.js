import React, { useState, useRef } from "react";

import { Container, Box } from "@mui/material";

import { useDataContext } from "./context";
import NavBar from "./NavBar";
import LateralBar from "./LateralBar";

export default function LoadLocalIFC({ viewerRef }) {
	//---------------------------------------------------------------------------------------------
	//HANDLERS - OBTENER DIMENSIONES
	//---------------------------------------------------------------------------------------------

	const { treeData, sectionData, setSectionData } = useDataContext();
	const fileInputRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);

	//-----------------------------------------------------------------------------------------------
	//JSX
	//-----------------------------------------------------------------------------------------------
	return (
		<>
			<NavBar viewerRef={viewerRef} />

			<div>
				<LateralBar
					treeData={treeData}
					sectionData={sectionData}
					setSectionData={setSectionData}
					viewerRef={viewerRef}
				/>
				<Container maxWidth="100%" sx={{ backgroundColor: "#EFEBEB" }}>
					<Box>
						<div id="viewer-container"></div>
					</Box>
				</Container>

				<input
					type="file"
					ref={fileInputRef}
					onChange={(e) => setSelectedFile(e.target.files[0])}
					style={{ display: "none" }}
				/>
			</div>
		</>
	);
}
