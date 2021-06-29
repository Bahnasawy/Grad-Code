import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import React, { FunctionComponent } from "react";
import tw from "twin.macro";

import { animation } from "styles/globals";
import { Router, useRouter } from "next/router";
import { navigate } from "styles/_app";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextComponentType, NextPageContext } from "next";
import styled from "styled-components";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function switchRoute(Component: NextComponentType<NextPageContext, any, {}>, pageProps: any, router: Router) {
	switch (router.route) {
		case "/":
			return <Component {...pageProps} />;
		default:
			return (
				<MainLayout page={router.route}>
					<Component {...pageProps} />
				</MainLayout>
			);
	}
}

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>{switchRoute(Component, pageProps, router)}</QueryClientProvider>
		</RecoilRoot>
	);
}
export default MyApp;

type MainLayoutProps = {
	page: string;
};
const MainLayout: FunctionComponent<MainLayoutProps> = ({ children, page }) => {
	const router = useRouter();

	return (
		<div tw="flex h-screen">
			<div tw="flex flex-col flex-2 items-center py-12 px-4 gap-4 bg-teal-600">
				<p tw="text-gray-50 font-semibold text-2xl">Stylometry</p>
				<PageButton onClick={navigate({ page, router, path: "/home" })} active={page.includes("/home")}>
					Home
				</PageButton>
				<PageButton onClick={navigate({ page, router, path: "/projects" })} active={page.includes("/projects")}>
					Projects
				</PageButton>
				<PageButton onClick={navigate({ page, router, path: "/grammar" })} active={page.includes("/grammar")}>
					Grammar
				</PageButton>
			</div>
			<div tw="flex-8 p-12">{children}</div>
		</div>
	);
};

const PageButton = styled.button`
	${animation}
	${tw`w-full py-1 rounded text-gray-50 hover:bg-gray-100 hover:text-teal-600`}
	${({ active }: { active: boolean }) => active && tw`text-teal-600 bg-gray-50`}
`;
