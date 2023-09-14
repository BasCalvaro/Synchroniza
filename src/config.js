const environments = {
	development: "http://localhost:8080",
	production: "",
};

const baseURL = environments[process.env.NODE_ENV] || "";

export { baseURL };
