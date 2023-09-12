import React, { useEffect } from "react";

import { Button, Box } from "@mui/material";

import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";

import { useDataContext } from "./context";
import OpenFloor from "./openFloor";

const LoadButtons = () => {
	const {
		viewerRef,
		fileInputRef,
		selectedLevel,
		setSelectedLevel,
		selectedFileName,
		setSelectedFileName,
		model,
		setModel,
		treeData,
		setTreeData,
		sectionData,
		setSectionData,
	} = useDataContext();

	useEffect(() => {
		const canvasContainer = document.getElementById("viewer-container");

		const viewer = new IfcViewerAPI({
			container: canvasContainer,
			backgroundColor: new Color(0xffffff),
		});

		viewer.axes.setAxes();
		viewer.grid.setGrid();
		//-------------------------------------------------------------------------------------------
		// Wasm Files Path
		//-------------------------------------------------------------------------------------------
		viewer.IFC.setWasmPath("../../");
		viewerRef.current = viewer;

		//-------------------------------------------------------------------------------------------
		// Onclick event method
		//-------------------------------------------------------------------------------------------
		window.onmouseover = viewer.IFC.selector.highlightIfcItem(true);

		window.ondblclick = async () => {
			viewer.IFC.selector.pickIfcItem();

			window.ondblclick = async () => {
				const found = await viewer.IFC.selector.pickIfcItem();

				//-------------------------------------------------------------------------------------------
				//Get Properties from IFC model
				//-------------------------------------------------------------------------------------------

				if (found) {
					const result = await viewer.IFC.loader.ifcManager.getItemProperties(
						found.modelID,
						found.id
					);
					const result1 = await viewer.IFC.loader.ifcManager.getIfcType(
						found.modelID,
						found.id
					);

					console.log(result);
					console.log(result1);

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

	
	}, [setSectionData]);

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
				setModel(model);
				setSelectedFileName(selectedFile);
				setTreeData(spatialStructure);
				console.log(spatialStructure);
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
		<Box sx={{ display: "flex" }}>
			<OpenFloor
				model={model}
				viewerRef={viewerRef}
				setSelectedLevel={setSelectedLevel}
			/>

			<Box sx={{ px: 1 }}>
				<Button onClick={handleFileUpload} variant="contained">
					Load File
				</Button>
			</Box>

			<input
				type="file"
				id="file-input"
				style={{ display: "none" }}
				ref={fileInputRef}
				onChange={handleFileChange}
				accept=".ifc, .ifcXML, .ifcZIP,*.*"
			/>
		</Box>
	);
};

export default LoadButtons;
