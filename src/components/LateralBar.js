import React from "react";
import { Box, Divider } from "@mui/material";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

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
		<Box>
			<Box>
				<ManageSearchIcon />
				<LoadElements
					type={"Tree"}
					treeData={treeData}
					sectionData={sectionData}
					setSectionData={setSectionData}
					viewerRef={viewerRef}
				/>
				<Divider />
				<AccountTreeIcon />
				<LoadElements
					type={"Properties"}
					treeData={treeData}
					sectionData={sectionData}
					setSectionData={setSectionData}
					viewerRef={viewerRef}
				/>
			</Box>
		</Box>
	);
}
