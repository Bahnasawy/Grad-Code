import { endpointUrl } from "./globals";
import { gql } from "@apollo/client";

export const projectQuery = gql`
	query ($id: Int!) {
		project(id: $id) {
			name
			data
		}
	}
`;

export const chiDistance = (project: Project) => {
	Object.keys(project.data).map((author) => 0);
	return 0;
};
