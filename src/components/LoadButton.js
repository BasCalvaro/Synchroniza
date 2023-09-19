import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";
import { useDataContext } from "./context";
import OpenFloor from "./openFloor";

const LoadButtons = () => {
	const [isClippingPaneSelected, setClippingPaneSelected] = useState(false);
	const {
		viewerRef,
		fileInputRef,
		setSelectedLevel,
		setSelectedFileName,
		model,
		setModel,
		setTreeData,
		setSectionData,
		isDimensionActive,
	} = useDataContext();

	useEffect(() => {
		const canvasContainer = document.getElementById("viewer-container");

		const viewer = new IfcViewerAPI({
			container: canvasContainer,
			// backgroundColor: new Color(0xffffff),
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
		window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();

		window.onclick = async () => {
			viewer.IFC.selector.pickIfcItem();

			window.onclick = async () => {
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

					const result2 = await viewer.IFC.loader.ifcManager.getPropertySets(
						found.modelID,
						found.id,
						true
					);

					// console.log("GetItemsProperties", result);
					// console.log("GetIFcType", result1);
					// console.log("GetPropertySets", result2);

					const extractValue = (quantitiesArray, key, name) => {
						// Busca en el arreglo por la clave especificada y devuelve el valor si lo encuentra
						const item = quantitiesArray.find(
							(quantity) => quantity[key] && quantity.Name.value === name
						);
						return item ? item[key].value : null;
					};

					// Usamos el método find para buscar el objeto IfcElementQuantity dentro de result2
					const elementQuantity = result2.find((item) => item.Quantities);

					let data = {
						name: result.Name.value,
						ExpressID: result.expressID,
						ObjectType: result.ObjectType.value,
						Tag: result.Tag.value,
						IfcCategory: result1,
					};

					if (elementQuantity) {
						// Usamos la función extractValue para obtener los valores de interés
						const volumenValue = extractValue(
							elementQuantity.Quantities,
							"VolumeValue",
							"NetVolume"
						);
						const areaValue = extractValue(
							elementQuantity.Quantities,
							"AreaValue",
							"NetSideArea"
						);
						const heightValue = extractValue(
							elementQuantity.Quantities,
							"LengthValue",
							"Height"
						);
						const lengthValue = extractValue(
							elementQuantity.Quantities,
							"LengthValue",
							"Length"
						);
						const widthValue = extractValue(
							elementQuantity.Quantities,
							"LengthValue",
							"Width"
						);

						data = {
							...data,
							Height: heightValue,
							Length: lengthValue,
							Width: widthValue,
							Volumen: volumenValue,
							Area: areaValue,
						};
					}
					setSectionData(data);
				}
			};
		};
	}, [setSectionData]);

	// /---------------------------------------------------------------------------------------------
	// CLIPING PLANES
	//---------------------------------------------------------------------------------------------

	const toggleClippingPlanes = () => {
		const viewer = viewerRef.current;
		// console.log("que muestra viewer", viewer);
		// const createPlane = viewer.clipper.createPlane();
		// console.log("Creacion de Plano", createPlane);
		if (viewer) {
			viewer.toggleClippingPlanes();
			if (viewer.clipper.active) {
				setClippingPaneSelected(true);
			} else {
				setClippingPaneSelected(false);
			}
		}
	};

	// const handleKeyDown = (event) => {
	// 	const viewer = viewerRef.current;

	// 	if (!viewer) return;

	// 	switch (event.code) {
	// 		case "KeyP":
	// 			viewer.clipper.createPlane();
	// 			break;
	// 		case "KeyO":
	// 			viewer.clipper.deletePlane();
	// 			break;
	// 		default:
	// 			break;
	// 	}

	// 	window.addEventListener("keydown", handleKeyDown);

	// 	// Limpia el event listener cuando el componente se desmonte
	// 	return () => {
	// 		window.removeEventListener("keydown", handleKeyDown);
	// 	};
	// };

	window.ondblclick = (e) => {
		const viewer = viewerRef.current;
		if (isClippingPaneSelected) {
			viewer.clipper.createPlane();
		}
		if (isDimensionActive) {
			setClippingPaneSelected(false);
			viewer.dimensions.active = true;
			viewer.dimensions.previewActive = true;
			const newDimension = viewer.dimensions.create();
			if (newDimension) {
				newDimension.style.backgroundColor = "red";
			}
		} else if (!isDimensionActive) {
			viewer.dimensions.active = false;
			viewer.dimensions.previewActive = false;
		}
		console.log(isDimensionActive);
	};

	// window.onkeydown = (e) => {
	// 	const viewer = viewerRef.current;
	// 	if (e.code === "KeyO") {
	// 		viewer.clipper.deletePlane();
	// 	}
	// };

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
			<Box>
				<Button
					sx={{
						fontFamily: "monospace",
					}}
					onClick={handleFileUpload}
					variant="contained"
				>
					Load File
				</Button>
			</Box>

			<OpenFloor
				model={model}
				viewerRef={viewerRef}
				setSelectedLevel={setSelectedLevel}
			/>
			<Box sx={{ px: 1 }}>
				<Button
					sx={{
						fontFamily: "monospace",
						backgroundColor: isClippingPaneSelected ? "green" : "",
						color: isClippingPaneSelected ? "white" : "",
					}}
					variant="contained"
					key={"showPlane"}
					onClick={() => toggleClippingPlanes()}
					selected={isClippingPaneSelected}
				>
					Clipping Planes
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
