import { gql } from "@apollo/client";

export const loginQuery = gql`
	query ($username: String, $password: String) {
		users(condition: { username: $username, password: $password }) {
			nodes {
				id
			}
		}
	}
`;
