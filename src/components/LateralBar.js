import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import IfcTreeItem from "./IfctreeItem";

export default function MiniDrawer({ treeData, sectionData }) {
	//---------------------------------------------------------------------------------------------
	//JSX
	//---------------------------------------------------------------------------------------------
	return (
		<Box
			sx={{
				borderRight: 1,
				borderColor: "grey.300",
			}}
		>
			<Box
				sx={{
					mt: 1,
					display: "flex",
					flexDirection: "column",
					height: "94vh",
					width: "28vh",
				}}
			>
				<Divider />
				<Box
					sx={{
						flexGrow: 1,
						height: "50%",
						overflowY: "auto",
					}}
				>
					<Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
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
					<div>
						{treeData && (
							<IfcTreeItem
								node={treeData}
								sx={{
									fontFamily: "monospace",
									fontSize: 15,
									marginRight: 10,
								}}
							/>
						)}
					</div>
				</Box>

				<Divider />
				<Box
					sx={{
						flexGrow: 1,
						height: "50%",
						overflowY: "auto",
					}}
				>
					<Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
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
						<Box sx={{ m: 1 }}>
							{/* // Section 1 ------------------------------------------------------------------ */}
							<Typography
								sx={{
									my: 0.5,
									fontFamily: "monospace",
									fontSize: 14,
									color: "blue",
									fontStyle: "italic",
								}}
							>
								Name: {sectionData.name}
							</Typography>
							<Divider />
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								IFC Category: {sectionData.IfcCategory}
							</Typography>
							<Divider />
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								ExpressId: {sectionData.ExpressID}
							</Typography>
							<Divider />
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								ObjectType: {sectionData.ObjectType}
							</Typography>
							<Divider />
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								Tag: {sectionData.Tag}
							</Typography>

							{/* // Section 2 ------------------------------------------------------------------ */}
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									fontSize: 14,
									color: "blue",
									fontStyle: "italic",
								}}
							>
								Base Quantities
							</Typography>

							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								Height: {sectionData.Height?.toFixed(2) ?? "-"}
							</Typography>
							<Divider />
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								Lenght: {sectionData.Length?.toFixed(2) ?? "-"}
							</Typography>
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								Width: {sectionData.Width?.toFixed(2) ?? "-"}
							</Typography>
							<Divider />
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								Volumen: {sectionData.Volumen?.toFixed(2) ?? "-"}
							</Typography>
							<Divider />
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								Area: {sectionData.Area?.toFixed(2) ?? "-"}
							</Typography>

							{/* // Section 3 ------------------------------------------------------------------ */}
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									fontSize: 14,
									color: "blue",
									fontStyle: "italic",
								}}
							>
								Property Set
							</Typography>
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								GlobalID: {sectionData.GlobalID}
							</Typography>
							<Divider />
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								IfcLabel: {sectionData.IfcLabel}
							</Typography>
							<Typography
								sx={{
									fontFamily: "monospace",
									my: 0.5,
									ml: 2,
									fontSize: 14,
								}}
							>
								LoadBearing: {sectionData.LoadBearing}
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
}
