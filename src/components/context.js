import React, { createContext, useContext, useState, useRef } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const viewerRef = useRef();
	const fileInputRef = useRef(null);
	const [model, setModel] = useState();
	const [treeData, setTreeData] = useState(null);
	const [sectionData, setSectionData] = useState();
	const [selectedLevel, setSelectedLevel] = useState(null);
	const [selectedFileName, setSelectedFileName] = useState(null);
	const [isDimensionActive, setDimensionActive] = useState(false);
	const [isMeasureActive, setMeasureActive] = useState(false);
	const [isClippingActive, setClippingActive] = useState(false);

	return (
		<DataContext.Provider
			value={{
				viewerRef,
				fileInputRef,
				selectedLevel,
				setSelectedLevel,
				selectedFileName,
				setSelectedFileName,
				model,
				setModel,
				treeData,
				setTreeData,
				sectionData,
				setSectionData,
				isDimensionActive,
				setDimensionActive,
				isMeasureActive,
				setMeasureActive,
				isClippingActive,
				setClippingActive,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useDataContext = () => useContext(DataContext);
