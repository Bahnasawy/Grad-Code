import { NextRouter } from "next/router";

export function navigate({ page, path, router }: { page: string; path: string; router: NextRouter }) {
	return () => page != path && router.push(path);
}
