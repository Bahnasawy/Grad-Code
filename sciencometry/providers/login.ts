import { NextRouter } from "next/router";

export function loginQuery(router: NextRouter, username: string, password: string) {
	console.log(username);
	console.log(password);

	// router.push("/home");
	return true;
}
