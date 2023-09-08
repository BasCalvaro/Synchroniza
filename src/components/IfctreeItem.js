import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

const IfcTreeItem = ({ node, level }) => {
	const [isOpen, setIsOpen] = useState(false);

	const nodeInfo = {
		ExpressID: node?.expressID,
		name: node?.type,
		// ObjectType:node.ObjectType.value,
		// Tag:node.Tag.value,
	};

	const toggleOpen = () => {
		console.log(node);
		setIsOpen(!isOpen);
	};

	return (
		<div style={{}}>
			<List
				// sx={{ width: "100%", marginLeft: 0, marginTop: 0 }}
				component="nav"
				aria-labelledby="nested-list-subheader"
			>
				<ListItemButton onClick={toggleOpen}>
					<ListItemText
						primary={nodeInfo.ExpressID + "   -     " + nodeInfo.name}
						primaryTypographyProps={{
							fontSize: 12,
							lineHeight: "10px",
							color: "black",
						}}
					/>
					<Divider />
					{node.children && node.children.length ? (
						isOpen ? (
							<ExpandLess />
						) : (
							<ExpandMore />
						)
					) : null}
				</ListItemButton>
				{node.children && node.children.length ? (
					<Collapse in={isOpen} timeout="auto" unmountOnExit>
						<List component="div">
							{node.children.map((child) => {
								return (
									<IfcTreeItem
										key={child.expressID}
										node={child}
										level={(level || 0) + 1}
									/>
								);
							})}
						</List>
					</Collapse>
				) : null}
			</List>
		</div>
	);
};

export default IfcTreeItem;
