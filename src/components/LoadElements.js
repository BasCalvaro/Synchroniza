import React, { useEffect, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Button, Box, Typography, Divider } from "@mui/material";
import { Color } from "three";

import IfcTreeItem from "./IfctreeItem";

import OpenModal from "../components/OpenModal";

const LoadElements = ({ type }) => {
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
			{type === "Tree" ? (
				<>
					<Typography sx={{ fontSize: 18 }}>SPACIAL TREE</Typography>
					<div
						style={{
							height: "500px",
							width: "250px",
							overflowY: "scroll",
							marginLeft: "10px",
						}}
					>
						{treeData && (
							<IfcTreeItem
								node={treeData}
								sx={{ fontSize: 15, marginRight: 10 }}
							/>
						)}
					</div>
				</>
			) : type === "Properties" ? (
				<>
					{sectionData && (
						<div>
							<Typography
								sx={{ fontSize: 14, color: "blue", fontStyle: "italic" }}
							>
								Name: {sectionData.name}
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: 14 }}>
								IFC Category: {sectionData.IfcCategory}
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: 14 }}>
								ExpressId: {sectionData.ExpressID}
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: 14 }}>
								ObjectType: {sectionData.ObjectType}
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: 14 }}>
								Tag: {sectionData.Tag}
							</Typography>
						</div>
					)}
				</>
			) : (
				""
			)}
			<OpenModal
				isOpen={modalOpen}
				handleClose={() => setModalOpen(false)}
				sectionData={sectionData}
			/>
		</Box>
	);
};

export default LoadElements;
