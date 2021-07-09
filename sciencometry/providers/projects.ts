import { gql } from "@apollo/client";
import JSZip from "jszip";

export const projectsQuery = gql`
	query ($id: Int) {
		projects(filter: { id: { equalTo: $id } }) {
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
