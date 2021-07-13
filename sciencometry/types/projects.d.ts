type Project = {
	name: string;
	description: string;
	createdAt: string;
	data: { [author: string]: { [text: string]: { [feature: string]: Array<Array<Array<[Array<string>, boolean]>>> } } };
};

type Projects = { projects: { nodes: Array<Project> } };

type Inflated = {
	[author: string]: { [text: string]: string };
};

type CreateProjectResponse = { createProject: { project: { id: number } } };

type CountsObject = { [author: string]: { [text: string]: { [feature: string]: number } } };
