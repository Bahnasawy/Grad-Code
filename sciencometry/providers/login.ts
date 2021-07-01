import request, { gql } from "graphql-request";
import { NextRouter } from "next/router";
import { endpointUrl } from "./globals";

export const loginQuery = async (router: NextRouter, username: string, password: string) => {
	const response = await request<LoginResponse>(
		endpointUrl,
		gql`
			query ($username: String, $password: String) {
				users(condition: { username: $username, password: $password }) {
					nodes {
						id
					}
				}
			}
		`,
		{ username, password }
	);

	// router.push("/home");
	return response.data.users.nodes[0].id;
};
