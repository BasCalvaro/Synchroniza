import { useContext } from "react";
import { userContext } from "../App";

const Hijo = () => {
	const user = useContext(userContext);

	return (
		<div>
			<h2>Load File fron App</h2>
			{user && <p> Load {user.name + " " + user.lastname}</p>}
		</div>
	);
};

export default Hijo;
