import React, { useEffect, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Button, Box } from "@mui/material";
import { Color } from "three";

import OpenModal from "../components/OpenModal";

const LoadLocalIFC = () => {
	const viewerRef = useRef();
	const [sectionData, setSectionData] = useState();
	const [treeData, setTreeData] = useState(null);
	const fileInputRef = useRef(null);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		const canvasContainer = document.getElementById("viewer-container");

		const viewer = new IfcViewerAPI({
			container: canvasContainer,
			backgroundColor: new Color(0xffffff),
		});
		viewer.axes.setAxes();
		viewer.grid.setGrid();

		// Wasm Files Path
		//-------------------------------------------------------------------------------------------------
		viewer.IFC.setWasmPath("../../");
		viewerRef.current = viewer;

		//---------------------------------------------------------------------------------------------
		// Onclick event method
		//---------------------------------------------------------------------------------------------
		window.ondblclick = async () => {
			viewer.IFC.selector.pickIfcItem();

			window.ondblclick = async () => {
				const found = await viewer.IFC.selector.pickIfcItem();

				if (found) {
					const result = await viewer.IFC.loader.ifcManager.getItemProperties(
						found.modelID,
						found.id
					);
					const result1 = await viewer.IFC.loader.ifcManager.getIfcType(
						found.modelID,
						found.id
					);
					setModalOpen(true);

					console.log(result);
					console.log(result1);

					//-------------------------------------------------------------------------------------------
					//Get Properties from IFC model
					//-------------------------------------------------------------------------------------------
					if (result && result.Name && result.ObjectType && result.Tag) {
						setSectionData({
							ExpressID: result.expressID,
							name: result.Name.value,
							ObjectType: result.ObjectType.value,
							Tag: result.Tag.value,
							IfcCategory: result1,
						});
					}
				}
			};
		};
	}, []);

	//---------------------------------------------------------------------------------------------
	//HANDLERS - CARGA DEL MODELO - CARGA DE SPACIALSTRUCTURE
	//---------------------------------------------------------------------------------------------

	const handleFileChange = async (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			// Realiza la carga del archivo
			try {
				const model = await viewerRef.current.IFC.loadIfc(selectedFile, true);
				console.log("Model loaded:", model);
				console.log("Model name:", selectedFile.name);

				// Obtener la estructura espacial
				const spatialStructure =
					await viewerRef.current.IFC.getSpatialStructure(model.modelID);
				setTreeData(spatialStructure);
				// console.log(spatialStructure);
			} catch (error) {
				console.log("Error loading model:", error);
			}
		}
	};

	const handleFileUpload = () => {
		fileInputRef.current.click();
	};
	//-----------------------------------------------------------------------------------------------
	//JSX
	//-----------------------------------------------------------------------------------------------
	return (
		<Box>
			<Button onClick={handleFileUpload} variant="contained">
				Load File
			</Button>
			<input
				type="file"
				id="file-input"
				style={{ display: "none" }}
				ref={fileInputRef}
				onChange={handleFileChange}
				accept=".ifc, .ifcXML, .ifcZIP,*.*"
			/>
			<OpenModal
				isOpen={modalOpen}
				handleClose={() => setModalOpen(false)}
				sectionData={sectionData}
			/>
		</Box>
	);
};

export default LoadLocalIFC;
