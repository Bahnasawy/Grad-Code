import { gql } from "@apollo/client";

export const homeQuery = gql`
	query ($id: Int) {
		projects(filter: { createdBy: { equalTo: $id } }) {
			nodes {
				id
				name
				createdAt
				description
			}
		}

		grammars(filter: { createdBy: { equalTo: $id } }) {
			nodes {
				id
				name
				createdAt
			}
		}
	}
`;
