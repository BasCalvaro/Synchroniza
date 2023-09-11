import React, { useEffect } from "react";

import {
	IFCWALLSTANDARDCASE,
	IFCSLAB,
	IFCDOOR,
	IFCWINDOW,
	IFCFURNISHINGELEMENT,
	IFCMEMBER,
	IFCPLATE,
} from "web-ifc";

const Filter3D = ({ filters, onFilterChange, viewer }) => {
	useEffect(() => {
		setupAllCategories();
	});

	if (!viewer) {
		return null;
	}

	const categories = {
		IFCWALLSTANDARDCASE,
		IFCSLAB,
		IFCFURNISHINGELEMENT,
		IFCDOOR,
		IFCWINDOW,
		IFCPLATE,
		IFCMEMBER,
	};

	const scene = viewer.context.getScene;

	// Gets the name of a category
	function getName(category) {
		const names = Object.keys(categories);
		return names.find((name) => categories[name] === category);
	}

	// Gets the IDs of all the items of a specific category
	async function getAll(category) {
		return viewer.IFC.loader.ifcManager.getAllItemsOfType(0, category, false);
	}

	// Creates a new subset containing all elements of a category
	async function newSubsetOfType(category) {
		const ids = await getAll(category);

		return viewer.IFC.loader.ifcManager.createSubset({
			modelID: 0,
			scene,
			ids,
			removePrevious: true,
			customID: category.toString(),
		});
	}

	// Stores the created subsets
	const subsets = {};
	async function setupAllCategories() {
		const allCategories = Object.values(categories);
		for (let i = 0; i < allCategories.length; i++) {
			const category = allCategories[i];
			await setupCategory(category);
		}
	}

	// Creates a new subset and configures the checkbox
	async function setupCategory(category) {
		subsets[category] = await newSubsetOfType(category);
		setupCheckBox(category);
	}

	// Sets up the checkbox event to hide / show elements
	function setupCheckBox(category) {
		const name = getName(category);
		const checkBox = document.getElementById(name);
		checkBox.addEventListener("change", (event) => {
			const checked = event.target.checked;
			const subset = subsets[category];
			if (checked) scene.add(subset);
			else subset.removeFromParent();
		});
	}

	const handleCheckBoxChange = (categoryName, isChecked, category) => {
		onFilterChange(categoryName, isChecked, category);
		// console.log("categoria", category, isChecked)
		// console.log(subsets)
	};
	console.log(filters);

	return (
		<div>
			{Object.entries(categories).map(([categoryName, category]) => (
				<div key={categoryName}>
					<input
						checked={filters[categoryName]}
						id={categoryName}
						type="checkbox"
						onChange={(event) =>
							handleCheckBoxChange(categoryName, event.target.checked, category)
						}
					/>
					{categoryName}
				</div>
			))}
		</div>
	);
};

export default Filter3D;
