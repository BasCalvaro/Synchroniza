import React, { createContext, useContext, useEffect, useState } from "react";

export const DimensionContext = createContext();

export const useDimension = () => {
	const context = useContext(DimensionContext);
	if (!context) {
		throw new Error("useDimension debe estar dentro de un DimensionProvider");
	}
	return context;
};

export const DimensionProvider = ({ children, viewerRef }) => {
	const [isDimensionActive, setDimensionActive] = useState(false);
	const [isPreviewActive, setPreviewActive] = useState(false);

	useEffect(() => {
		if (viewerRef.current && isDimensionActive) {
			viewerRef.dimensions.active = true;

			window.ondblclick = () => {
				viewerRef.dimensions.create();
			};

			window.onkeydown = (e) => {
				if (e.code === "Delete") {
					viewerRef.dimensions.delete();
				}
			};
		}
	}, [viewerRef, isDimensionActive]);

	useEffect(() => {
		if (viewerRef.current && isPreviewActive) {
			viewerRef.dimensions.previewActive = true;
		}
	}, [viewerRef, isPreviewActive]);

	return (
		<DimensionContext.Provider
			value={{
				isDimensionActive,
				setDimensionActive,
				isPreviewActive,
				setPreviewActive,
			}}
		>
			{children}
		</DimensionContext.Provider>
	);
};
