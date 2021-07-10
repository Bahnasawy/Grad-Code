import { endpointUrl } from "./globals";
import { gql } from "@apollo/client";
import axios from "axios";

export const projectQuery = gql`
	query ($id: Int!) {
		project(id: $id) {
			name
			data
		}
	}
`;

export const createProjectMutation = gql`
	mutation ($name: String, $createdBy: Int, $data: JSON) {
		createProject(input: { project: { name: $name, createdBy: $createdBy, data: $data } }) {
			project {
				id
			}
		}
	}
`;

export const chiDistance = (project: Project) => {
	Object.keys(project.data).map((author) => 0);
	return 0;
};

export const createProject = async (texts: any, grammar: Array<Grammar>) => {
	const res = await axios.post("http://localhost:5000", { texts, grammar });
	return res.data;
};
