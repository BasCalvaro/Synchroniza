import React, { useEffect, useCallback } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Box, Typography, Divider } from "@mui/material";
import { Color } from "three";

import IfcTreeItem from "./IfctreeItem";

const LoadElements = ({
	type,
	treeData,
	setTreeData,
	sectionData,
	setSectionData,
	viewerRef,
}) => {
	const initializeViewer = useCallback(async () => {
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
	}, [viewerRef, setSectionData]);

	useEffect(() => {
		initializeViewer();
	}, [initializeViewer]);

	//-----------------------------------------------------------------------------------------------
	//JSX
	//-----------------------------------------------------------------------------------------------
	return (
		<Box>
			{type === "Tree" ? (
				<>
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
		</Box>
	);
};

export default LoadElements;
