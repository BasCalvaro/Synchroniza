import React from "react";
import Typography from "@mui/material/Typography";
import { Divider, Paper, Button, Box, Popper } from "@mui/material";

const OpenModal = ({ isOpen, handleClose, sectionData }) => {
	return (
		<Popper open={isOpen}>
			<Paper
				sx={{
					position: "fixed",
					top: "80%",
					left: "80%",
					transform: "translate(-50%, -50%)",
					bgcolor: "white",
					boxShadow: 6,
					p: 3,
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
						IFC Properties
					</Typography>
					<Button onClick={handleClose} variant="text" size="small">
						x
					</Button>
				</Box>
				{sectionData && (
					<div>
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

						<Typography
							sx={{ fontSize: 14, color: "blue", fontStyle: "italic" }}
						>
							Base Quantities
						</Typography>

						<Typography sx={{ fontSize: 14 }}>
							Height: {sectionData.Height?.toFixed(2) ?? "-"} 
						</Typography>
						<Divider />
						<Typography sx={{ fontSize: 14 }}>
							Lenght: {sectionData.Length?.toFixed(2) ?? "-"}
						</Typography>
						<Typography sx={{ fontSize: 14 }}>
							Width: {sectionData.Width?.toFixed(2) ?? "-"}
						</Typography>
						<Divider />
						<Typography sx={{ fontSize: 14 }}>
							Volumen: {sectionData.Volumen?.toFixed(2) ?? "-"}
						</Typography>
						<Divider />
						<Typography sx={{ fontSize: 14 }}>
							Area: {sectionData.Area?.toFixed(2) ?? "-"}
						</Typography>

						<Typography
							sx={{ fontSize: 14, color: "blue", fontStyle: "italic" }}
						>
							Property Set
						</Typography>
						<Typography sx={{ fontSize: 14 }}>
							GlobalID: {sectionData.GlobalID}
						</Typography>
						<Divider />
						<Typography sx={{ fontSize: 14 }}>
							IfcLabel: {sectionData.IfcLabel}
						</Typography>
						<Typography sx={{ fontSize: 14 }}>
							LoadBearing: {sectionData.LoadBearing}
						</Typography>

					</div>
				)}
			</Paper>
		</Popper>
	);
};

export default OpenModal;
