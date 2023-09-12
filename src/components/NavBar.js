import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, Typography, IconButton } from "@mui/material";

import MuiAppBar from "@mui/material/AppBar";

import SquareFootIcon from "@mui/icons-material/SquareFoot";

import LoadButton from "./LoadButton";

const drawerWidth = 360;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

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
		<Box>
			<AppBar>
				<Toolbar sx={{ p: 2.5 }}>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Synchroniza 3D - IFC
					</Typography>

					<IconButton onClick={handleDimensionClick}>
						<SquareFootIcon sx={{ color: "white" }} />
					</IconButton>

					<LoadButton />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
