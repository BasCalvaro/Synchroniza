import React, { useState } from "react";
import { Button, Box, Popper, Paper, Typography } from "@mui/material";

const OpenFloor = ({setSelectedLevel, viewerRef, model}) => {
	const [popperOpen, setPopperOpen] = useState(false);
	const [popperAnchorEl, setPopperAnchorEl] = useState(null);
	const [allPlans, setAllPlans] = useState([]);

	console.log(model);

	//-------------------------------------------------------------------------
	// FLOOR PLANS
	//-------------------------------------------------------------------------

	const handleFloorPlansClick = (event) => {
		console.log(popperOpen);
		console.log(popperAnchorEl);
		showFloorPlans();
		setPopperOpen(!popperOpen);
		setPopperAnchorEl(popperOpen ? null : event.currentTarget);
	};

	// encargado de cargar Floors
	const handleLevelSelect = (expressID) => {
		setSelectedLevel(expressID);
		const viewer = viewerRef.current;
		const viewPlans = viewer.plans.goTo(model.modelID, expressID);
		console.log(viewPlans);
		viewer.edges.toggle("example", true);
	};

	//-------------------------------------------------------------------------
	// FLOOR PLANTS
	//-------------------------------------------------------------------------

	const showFloorPlans = async () => {
		const viewer = viewerRef.current;
		const modelID = model.modelID;

		const viewerPlans = await viewer.plans.computeAllPlanViews(modelID);
		console.log("vista de planos ", viewerPlans);

		const plansFromViewer = viewer.plans.getAll(modelID);
		let collectedPlans = [];

		for (const expressID of plansFromViewer) {
			console.log(expressID);
			// const currentPlan = viewer.plans.planLists[modelID][expressID];
			// console.log(currentPlan)

			const allPlansData = viewer.plans.planLists[modelID][expressID];
			console.log("Conseguir allplans", allPlansData);

			collectedPlans.push(allPlansData);
		}

		setAllPlans(collectedPlans);
	};

	//-----------------------------------------------------------------------------------------------
	//JSX
	//-----------------------------------------------------------------------------------------------
	return (
		<Box sx={{ display: "flex" }}>
			<Box sx={{ px: 1 }}>
				<Button
					onClick={handleFloorPlansClick}
					variant="contained"
					aria-describedby={popperOpen ? "floor-plans-popper" : undefined}
				>
					Floor Plans
				</Button>
			</Box>

			<Popper open={popperOpen}>
				<Paper
					sx={{
						position: "fixed",
						top: "80%",
						left: "80%",
						transform: "translate(-50%, -50%)",
						bgcolor: "white",
						boxShadow: 6,
						py: 3,
						px: 5
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							pb: 2,
						}}
					>
						<Typography variant="h6" component="h2">
							Floor Plans Filters
						</Typography>
					</Box>
					<div>
						{allPlans && Array.isArray(allPlans) ? (
							allPlans.map((plan) => (
								<div key={plan.expressID}>
									<Button onClick={() => handleLevelSelect(plan.expressID)}>
									{plan.name}
									</Button>
								</div>
							))
						) : (
							<p>No Floors Available </p>
						)}
					</div>
				</Paper>
			</Popper>
		</Box>
	);
};

export default OpenFloor;
