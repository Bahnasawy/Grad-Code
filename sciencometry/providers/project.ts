import { request, gql } from "graphql-request";
import { endpointUrl } from "./globals";

export const getProject = async (id: any) => {
	console.log(id);

	const { project: data } = await request(
		endpointUrl,
		gql`
			query ($id: Int!) {
				project(id: $id) {
					name
					data
				}
			}
		`,
		{ id: parseInt(id) }
	);
	return data;
};

export const chiDistance = (project: Project) => {
	Object.keys(project.data).map((author) => 0);
	return 0;
};
