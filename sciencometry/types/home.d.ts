/** Recently opened and/or edited project */
type RecentType = { name: string; createdAt: number; description: string; id: number; project?: boolean };

/** All recently opened projects */
type RecentsType = Array<RecentType>;

type HomeProject = { id: number; name: string; createdAt: number; description: string };

type HomeGrammar = { id: number; name: string; createdAt: number };

type HomeResponse = { projects: { nodes: Array<HomeProject> }; grammars: { nodes: Array<HomeGrammar> } };
