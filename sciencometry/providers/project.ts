import { request, gql } from "graphql-request";
import { endpointUrl } from "./globals";

export const getProject = (id: any) => {
	const {} = request(
		endpointUrl,
		gql`
			query ($id: Int!) {
				project(id: $id) {
					name
					data
				}
			}
		`,
		{ id }
	);
};
