import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import IfcTreeItem from "./IfctreeItem";

import LoadElements from "./LoadElements";

export default function MiniDrawer({
	treeData,
	sectionData,
	setSectionData,
	viewerRef,
}) {
	//---------------------------------------------------------------------------------------------
	//JSX
	//---------------------------------------------------------------------------------------------
	return (
		<Box sx={{
			borderRight: 1,
			borderColor: "grey.300",
		}}>
			<Box
				sx={{
					mt: 1,
					display: "flex",
					flexDirection: "column",
					height: "100vh",
				}}
			>
				<Divider />
				<Box
					sx={{
						flexGrow: 1,
						height: "50%"
					}}
				>
					<Box sx={{ my:1, display: "flex", alignItems: "center" }}>
						<AccountTreeIcon />
						<Typography
							variant="h7"
							sx={{
								ml: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 600,
								letterSpacing: ".2rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Planos Cargados
						</Typography>
					</Box>

					<Divider />
					<div
						style={{
							width: "22vh",
						}}
					>
						{treeData && (
							<IfcTreeItem
								node={treeData}
								sx={{ fontSize: 15, marginRight: 10 }}
							/>
						)}
					</div>
				</Box>

				<Divider />
				<Box
					sx={{
						flexGrow: 1,
						height: "50%"
					}}
				>
					<Box sx={{ my:1, display: "flex", alignItems: "center" }}>
						<ManageSearchIcon />
						<Typography
							variant="h7"
							sx={{
								ml: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 600,
								letterSpacing: ".2rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Propiedades
						</Typography>
					</Box>
					<Divider />
					{sectionData && (
						<Box sx={{m:1}}>
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
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
}
