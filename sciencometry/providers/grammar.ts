import { gql } from "@apollo/client";

export const parse = (grammar: string, test: string) => {
	if (grammar && test) {
		console.log(`${grammar}, ${test}`);
	}
};

export const save = (grammar: string, test: string) => {
	if (grammar && test) {
		console.log(`${grammar}, ${test}`);
	}
};

export const createGrammarMutation = gql`
	mutation ($name: String, $createdBy: Int, $string: String) {
		createGrammar(input: { grammar: { name: $name, createdBy: $createdBy, string: $string } }) {
			grammar {
				id
			}
		}
	}
`;

export const updateGrammarMutation = gql`
	mutation ($id: Int!, $name: String, $string: String) {
		updateGrammar(input: { id: $id, patch: { name: $name, string: $string } }) {
			grammar {
				id
			}
		}
	}
`;

export const grammarQuery = gql`
	query {
		grammars {
			nodes {
				id
				name
				string
				createdAt
				author: userByCreatedBy {
					username
				}
			}
		}
	}
`;

export const idGrammarQuery = gql`
	query ($id: Int!) {
		grammar(id: $id) {
			id
			name
			string
			createdAt
			author: userByCreatedBy {
				username
			}
		}
	}
`;
