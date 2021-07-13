import { endpointUrl } from "./globals";
import { gql } from "@apollo/client";
import axios from "axios";

export const projectQuery = gql`
	query ($id: Int!) {
		project(id: $id) {
			name
			data
		}
	}
`;

export const createProjectMutation = gql`
	mutation ($name: String, $createdBy: Int, $data: JSON) {
		createProject(input: { project: { name: $name, createdBy: $createdBy, data: $data } }) {
			project {
				id
			}
		}
	}
`;

export const chiDistance = (project: Project) => {
	const counts: CountsObject = {};
	let jointCounts: { [author: string]: { [feature: string]: number } } = {};
	const authorCounts: { [author: string]: { [feature: string]: number } } = {};
	Object.entries(project.data).forEach(([author, texts]) => {
		counts[author] = {};
		authorCounts[author] = {};
		Object.entries(texts).forEach(([text, grammar]) => {
			counts[author][text] = {};
			Object.entries(grammar).forEach(([name, sentences]) => {
				counts[author][text][name] = 0;
				authorCounts[author][name] = 0;
				sentences.forEach((sentence) =>
					sentence.forEach((tag) => {
						tag.forEach((word) => {
							authorCounts[author][name]++;
							counts[author][text][name] += word ? 1 : 0;
						});
					})
				);
			});
		});
	});

	Object.entries(authorCounts).forEach(([author, features]) => {
		jointCounts[author] = {};
		Object.entries(features).forEach(([feature, count]) => {
			jointCounts[author][feature] = authorCounts["disputed"][feature] + count;
		});
	});
	delete jointCounts["disputed"];

	const chiDistances: { [author: string]: { [feature: string]: number } } = {};

	Object.entries(jointCounts).forEach(([author, features]) => {
		chiDistances[author] = {};
		Object.entries(features).forEach(([feature, count]) => {
			const authorShare = authorCounts[author][feature] / count;
			const expectedAuthorCount = count * authorShare;
			const expectedDisputedCount = count * (1 - authorShare);

			// console.log(authorShare);

			chiDistances[author][feature] = 0;

			chiDistances[author][feature] +=
				(authorCounts[author][feature] - expectedAuthorCount) *
				((authorCounts[author][feature] - expectedAuthorCount) / expectedAuthorCount);

			chiDistances[author][feature] +=
				(authorCounts["disputed"][feature] - expectedDisputedCount) *
				((authorCounts["disputed"][feature] - expectedDisputedCount) / expectedDisputedCount);
		});
	});

	// console.log(chiDistances);

	return 0;
};

export const createProject = async (texts: any, grammar: Array<Grammar>) => {
	const res = await axios.post("http://localhost:5000", { texts, grammar });
	return res.data;
};
