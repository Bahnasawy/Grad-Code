type Grammar = {
	id: string;
	name: string;
	author: { username: string };
	createdAt: string;
	string: string;
};

type Grammars = { grammars: { nodes: Array<Grammar>; totalCount: number } };

type CreateGrammarResponse = { createGrammar: { grammar: { id: number } } };

type UpdateGrammarResponse = { updateGrammar: { grammar: { id: number } } };
