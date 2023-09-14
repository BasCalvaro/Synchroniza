import React from "react";

import { Box, Toolbar, Typography, AppBar } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

import LoadButton from "./LoadButton";

export default function MiniDrawer() {
	//---------------------------------------------------------------------------------------------
	//HANDLERS - CARGA DEL MODELO - CARGA DE SPACIALSTRUCTURE
	//---------------------------------------------------------------------------------------------

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
					<LoadButton />
				</Box>
			</Toolbar>
		</AppBar>
	);
}
