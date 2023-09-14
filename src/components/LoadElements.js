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

					const result2 = await viewer.IFC.loader.ifcManager.getPropertySets(found.modelID,
						found.id,true
					  );
			
					//   setModalOpen(true);
			
					  console.log("GetItemsProperties",result);
					  console.log("GetIFcType",result1);
					  console.log("GetPropertySets",result2);  

		 //-------------------------------------------------------------------------------------------
          //Get Quantities
          //-------------------------------------------------------------------------------------------
        
		  const extractValue = (quantitiesArray, key, name) => {
			// Busca en el arreglo por la clave especificada y devuelve el valor si lo encuentra
			const item = quantitiesArray.find(quantity => quantity[key] && quantity.Name.value === name);
			return item ? item[key].value : null;
		  };

			//   Usamos el método find para buscar el objeto IfcElementQuantity dentro de result2
			const elementQuantity = result2.find(item => item.Quantities);

			let data = {
			name: result.Name.value,
			ExpressID: result.expressID,
			ObjectType: result.ObjectType.value,
			Tag: result.Tag.value,
			IfcCategory: result1
			}
						
			if (elementQuantity) {
				// Usamos la función extractValue para obtener los valores de interés
				const volumenValue = extractValue(elementQuantity.Quantities, 'VolumeValue', "NetVolume");
				const areaValue = extractValue(elementQuantity.Quantities, 'AreaValue', 'NetSideArea');
				const heightValue = extractValue(elementQuantity.Quantities, 'LengthValue', 'Height');
				const lengthValue = extractValue(elementQuantity.Quantities, 'LengthValue', 'Length');
				const widthValue = extractValue(elementQuantity.Quantities, 'LengthValue', 'Width');
			  
				data = {
				  ...data,
				  Height: heightValue,
				  Length: lengthValue,
				  Width: widthValue,
				  Volumen: volumenValue,
				  Area: areaValue,
				}
			  }
			  setSectionData(data);
					
				}
			};
		};
	}, [viewerRef,setSectionData]);

	useEffect(() => {
		initializeViewer();
	}, [initializeViewer]);

















	
	//-----------------------------------------------------------------------------------------------
	//JSX
	//-----------------------------------------------------------------------------------------------
	return (
		<Box>
			{console.log(treeData)}
			{console.log(setTreeData)}
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
