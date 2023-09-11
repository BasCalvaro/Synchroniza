import React, { useEffect, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Button, Box } from "@mui/material";
import { Color } from "three";

import OpenFloor from "./openFloor";

const LoadButtons = () => {
	const viewerRef = useRef();
	const fileInputRef = useRef(null);
	const [sectionData, setSectionData] = useState();
	const [treeData, setTreeData] = useState(null);
	const [model, setModel] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [allPlans, setAllPlans] = useState([]);
	const [selectedLevel, setSelectedLevel] = useState(null);
	const [clippingPlane, setClippingPlane ] = useState(false)

	// const viewer = viewerRef.current;

	const initializeViewer = async () => {
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
	};

	useEffect(() => {
		initializeViewer();
	}, []);

	//--------------------------------------------------------------------------
	//CLIPPING PLANE
	//--------------------------------------------------------------------------

	

		
	

		const createClippingPlane = () => {
			const viewer = viewerRef.current;
			viewer.clipper.createPlane();
			setClippingPlane(false);
		};
	
		const deleteClippingPlane = () => {
			const viewer = viewerRef.current;
			viewer.clipper.createPlane();
			setClippingPlane(false);
		};

		
		// const toggleClipping = () => {
		// 	IfcViewerAPI.clipper.toggle();
		// 	setClippingPlane((prev) => !prev);
		// };


		// const toggleClippingPlanes = () => {
		// 	const viewer = viewerRef.current;
		// 	if (viewer) {
		// 	  viewer.clipper.createPlane();
		// 	  if (viewer.clipper.active) {
		// 		setClippingPlane(true);
		// 	  } else {
		// 		setClippingPlane(false);
		// 	  }
		// 	}
		//   };
	






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
				setModel(model);
				console.log("Model loaded:", model);
				console.log("Model name:", selectedFile.name);

				// Obtener la estructura espacial
				const spatialStructure =
					await viewerRef.current.IFC.getSpatialStructure(model.modelID);
				setModel(model);
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
		<Box sx={{ display: "flex" }}>
			<OpenFloor
				selectedLevel={selectedLevel}
				setSelectedLevel={setSelectedLevel}
				viewerRef={viewerRef}
				model={model}
			/>

		<Box>
			
			<Box>
				
			{ !clippingPlane ?
                <Button onClick={createClippingPlane} variant="contained">
                    Create Clipping Plane
                </Button> :
                <Button onClick={deleteClippingPlane} variant="contained">
                    Delete Clipping Plane
                </Button>
            } 

        
                {/* <Button onClick={toggleClippingPlanes} variant="contained">
                    Toggle Clipping
                </Button> */}
         

				


			</Box>



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
