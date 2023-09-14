import React, { useState } from "react";

import {
	Box,
	Toolbar,
	Typography,
	IconButton,
	AppBar,
	Container,
} from "@mui/material";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BusinessIcon from "@mui/icons-material/Business";

import LoadButton from "./LoadButton";

export default function MiniDrawer({ viewerRef }) {
	//---------------------------------------------------------------------------------------------
	//HANDLERS - CARGA DEL MODELO - CARGA DE SPACIALSTRUCTURE
	//---------------------------------------------------------------------------------------------

	const [isDimensionActive, setDimensionActive] = useState(false);

	const handleDimensionClick = () => {
		const viewer = viewerRef.current;
		if (!isDimensionActive) {
			viewer.dimensions.active = true;
			viewer.dimensions.previewActive = true;
		} else {
			viewer.dimensions.active = false;
			viewer.dimensions.previewActive = false;
		}
		setDimensionActive(!isDimensionActive);
	};

	//---------------------------------------------------------------------------------------------
	//JSX
	//---------------------------------------------------------------------------------------------
	return (
		<AppBar position="static">
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<BusinessIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Synchroniza 3D - IFC
					</Typography>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton onClick={handleDimensionClick}>
						<SquareFootIcon sx={{ color: "white" }} />
					</IconButton>
					<LoadButton />
				</Box>
			</Toolbar>
		</AppBar>
	);
}
