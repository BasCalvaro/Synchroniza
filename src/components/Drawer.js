import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
	Box,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

import LoadButton from "./LoadButton";
import LoadElements from "./LoadElements";

const drawerWidth = 360;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function MiniDrawer(
{	treeData,
	sectionData,
	setSectionData,
	viewerRef}
) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState(null);

	//---------------------------------------------------------------------------------------------
	//HANDLERS - CARGA DEL MODELO - CARGA DE SPACIALSTRUCTURE
	//---------------------------------------------------------------------------------------------

	const handleTabClick = (tab) => {
		if (activeTab === tab) {
			setActiveTab(null); // Si se hace clic en el mismo ícono, oculta el contenido
		} else {
			setActiveTab(tab); // Si se hace clic en un ícono diferente, muestra el contenido correspondiente
		}
	};
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

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
		<Box sx={{ display: "flex" }}>
			<AppBar position="fixed" open={open}>
				<Toolbar sx={{ p: 2.5 }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						Synchroniza 3D - IFC
					</Typography>

					<IconButton onClick={handleDimensionClick}>
						<SquareFootIcon sx={{ color: "white" }} />
					</IconButton>

					<LoadButton />
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader sx={{ p: 2.5 }}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{["Element Tree", "Properties"].map((text, index) => (
						<ListItem key={text} disablePadding sx={{ display: "block" }}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{index % 2 === 0 ? (
										<AccountTreeIcon
											onClick={() => handleTabClick("Element Tree")}
										/>
									) : (
										<ManageSearchIcon
											onClick={() => handleTabClick("Properties")}
										/>
									)}
								</ListItemIcon>
								<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				{console.log(treeData)}
				{activeTab === "Element Tree" && (
					<LoadElements
						type={"Tree"}
						treeData={treeData}
						sectionData={sectionData}
						setSectionData={setSectionData}
						viewerRef={viewerRef}
					/>
				)}
				{activeTab === "Properties" && (
					<LoadElements
						type={"Properties"}
						treeData={treeData}
						sectionData={sectionData}
						setSectionData={setSectionData}
						viewerRef={viewerRef}
					/>
				)}
				<Divider />

				{/* {viewerRef.current && (
					<Filter3D
						filters={filters}
						onFilterChange={handleFilterChange}
						viewer={viewerRef.current}
					/>
				)}
				<Divider /> */}
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1 }}>
				<DrawerHeader />
				<Typography paragraph></Typography>
				<Typography paragraph></Typography>
			</Box>
		</Box>
	);
}
