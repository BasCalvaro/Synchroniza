import React, { useEffect, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Button, Box } from "@mui/material";
import { Color, LineBasicMaterial, MeshBasicMaterial } from "three";

import OpenModal from "../components/OpenModal";

const LoadLocalIFC = () => {
	const viewerRef = useRef();
	const [sectionData, setSectionData] = useState();
	const [treeData, setTreeData] = useState(null);
	const fileInputRef = useRef(null);
	const [model, setModel] = useState();
	const [modalOpen, setModalOpen] = useState(false);
	const [allPlans, setAllPlans] = useState([]);
	const [selectedLevel, setSelectedLevel] = useState(null);

	useEffect(async () => {
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
		window.onmouseover = viewer.IFC.selector.highlightIfcItem(true)
		
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
					setModalOpen(true);

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
	}, []);

	//-------------------------------------------------------------------------
	// FLOOR PLANTS
	//-------------------------------------------------------------------------
	
	const showFloorPlans = async () => {
		
        const viewer = viewerRef.current;
        const modelID = model.modelID;
    
        const viewerPlans= await viewer.plans.computeAllPlanViews(modelID);
        console.log("vista de planos ",viewerPlans)
    
        const lineMaterial = new LineBasicMaterial({ color: 'black' });
        const baseMaterial = new MeshBasicMaterial({
            polygonOffset: true,
            polygonOffsetFactor: 1, // positive value pushes polygon further away
            polygonOffsetUnits: 1,
        });
        
        const plansFromViewer = viewer.plans.getAll(modelID);
        let collectedPlans = [];
    
        for (const expressID of plansFromViewer) {
          console.log(expressID)  
          // const currentPlan = viewer.plans.planLists[modelID][expressID];
          // console.log(currentPlan)
            
        
            const allPlansData = viewer.plans.planLists[modelID][expressID];
            console.log("Conseguir allplans", allPlansData);
    
            collectedPlans.push(allPlansData);
        }
    
        setAllPlans(collectedPlans);
    }
    



	
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

	// encargado de cargar Floors
	const handleLevelSelect = (expressID) =>{
		setSelectedLevel(expressID)
		const viewer = viewerRef.current;
		const viewPlans =viewer.plans.goTo(model.modelID, expressID)
		console.log(viewPlans)
		viewer.edges.toggle("example", true)
	  }



	//-----------------------------------------------------------------------------------------------
	//JSX
	//-----------------------------------------------------------------------------------------------
	return (

		<Box>
			

			<Box>
        		<Button 
        		onClick={showFloorPlans}
        		variant="contained"
        		>Floor Plans
        		</Button>
      		</Box>

      		<Box>
  				{allPlans && Array.isArray(allPlans) 
    			? allPlans.map(plan => (
        		<div key={plan.expressID}>
          			<p>{plan.name}</p>
          			<button onClick={() => handleLevelSelect(plan.expressID)}>
            		Seleccionar este nivel
          			</button>
        		</div>))
    			: <p>No Floors Available </p>}
			</Box>

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
