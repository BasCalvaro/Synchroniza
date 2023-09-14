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
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useDataContext = () => useContext(DataContext);
