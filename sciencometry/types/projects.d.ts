type Project = {
	name: string;
	description: string;
	createdAt: string;
	data: { [author: string]: { [text: string]: { [feature: string]: Array<any> } } };
};

type Projects = Array<Project>;
