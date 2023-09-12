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
					</div>
				)}
			</Paper>
		</Popper>
	);
};

export default OpenModal;
