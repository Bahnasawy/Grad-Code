import { gql } from "@apollo/client";

export const grammarQuery = gql`
	query ($id: Int) {
		grammars(filter: { createdBy: { equalTo: $id } }) {
			nodes {
				id
				name
				string
				createdAt
				author: userByCreatedBy {
					username
				}
			}
			totalCount
		}
	}
`;
