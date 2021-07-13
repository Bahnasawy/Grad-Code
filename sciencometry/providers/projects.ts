import { gql } from "@apollo/client";
import JSZip from "jszip";

export const projectsQuery = gql`
	query ($id: Int) {
		projects(filter: { createdBy: { equalTo: $id } }) {
			nodes {
				id
				name
				description
				userByCreatedBy {
					id
				}
				createdAt
				data
			}
			totalCount
		}
	}
`;

export const idProjectQuery = gql`
	query ($id: Int!) {
		project(id: $id) {
			id
			name
			description
			userByCreatedBy {
				id
			}
			createdAt
			data
		}
	}
`;

export const toSet = async (items: JSZip.JSZipObject[]): Promise<Inflated> => {
	const out: Inflated = {};

	items.forEach((item) => {
		const name = item.name.split("/")[0];
		out[name] = {};
	});

	for (let i = 0; i < items.length; i++) {
		const name = items[i].name.split("/");
		out[name[0]][name[1]] = await items[i].async("string");
	}

	return out;
};

export const grammarsQuery = gql`
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
