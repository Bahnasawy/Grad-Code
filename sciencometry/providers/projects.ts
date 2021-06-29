import { request, gql } from "graphql-request";
import { endpointUrl } from "./globals";

export const getProjects = async () => {
	const {
		projects: {
			nodes: { data },
		},
	} = await request(
		endpointUrl,
		gql`
			query projects {
				nodes {
					id
					name
					description
					userByCreatedBy {
						id
					}
					createdAt
				}
				totalCount
			}
		`
	);
	return data;
};
