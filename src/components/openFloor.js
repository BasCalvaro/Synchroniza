import React, { useState } from "react";
import { Button, Box, Popper, Paper, Typography } from "@mui/material";

const OpenFloor = ({ setSelectedLevel, viewerRef, model }) => {
	const [popperOpen, setPopperOpen] = useState(false);
	const [popperAnchorEl, setPopperAnchorEl] = useState(null);
	const [allPlans, setAllPlans] = useState([]);

	//-------------------------------------------------------------------------
	// FLOOR PLANS
	//-------------------------------------------------------------------------

	const handleFloorPlansClick = (event) => {
		// console.log(popperOpen);
		// console.log(popperAnchorEl);
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

	// reestablecer la vista 3D
	const handleExitFloorPlan = () => {
		const viewer = viewerRef.current;

		// Restablecer la vista 3D
		const existFloorPlans = viewer.plans.exitPlanView(model.modelID);
		console.log(existFloorPlans);
		// viewer.render();
	};

	//-------------------------------------------------------------------------
	// FLOOR PLANTS
	//-------------------------------------------------------------------------

	const showFloorPlans = async () => {
		const viewer = viewerRef.current;
		const modelID = model.modelID;

		const viewerPlans = await viewer.plans.computeAllPlanViews(modelID);
		// console.log("vista de planos ", viewerPlans);

		const plansFromViewer = viewer.plans.getAll(modelID);
		let collectedPlans = [];

		for (const expressID of plansFromViewer) {
			// console.log(expressID);
			const currentPlan = viewer.plans.planLists[modelID][expressID];
			// console.log(currentPlan)

			const allPlansData = viewer.plans.planLists[modelID][expressID];
			// console.log("Conseguir allplans", allPlansData);

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
					sx={{ fontFamily: "monospace" }}
					onClick={handleFloorPlansClick}
					variant="contained"
					aria-describedby={popperOpen ? "floor-plans-popper" : undefined}
				>
					Floor Plans
				</Button>
			</Box>

			<Button
				sx={{ fontFamily: "monospace" }}
				onClick={handleExitFloorPlan}
				variant="contained"
			>
				Exit Floor Plan
			</Button>
			<Popper open={popperOpen}>
				<Paper
					sx={{
						position: "fixed",
						bottom: "15%",
						right: "4%",
						bgcolor: "white",
						boxShadow: 6,
						py: 3,
						px: 3,
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
						<Typography
							sx={{ fontFamily: "monospace" }}
							variant="h6"
							component="h2"
						>
							Floor Plans Filters
						</Typography>
					</Box>
					<div>
						{allPlans ? (
							allPlans.map((plan, index) => (
								<div key={index}>
									<Button
										sx={{ fontFamily: "monospace" }}
										onClick={() => handleLevelSelect(plan.expressID)}
									>
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
