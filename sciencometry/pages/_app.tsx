import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import React from "react";

import { RecoilRoot } from "recoil";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { endpointUrl } from "providers/globals";
import MainLayout from "components/global/layout";

const client = new ApolloClient({
	uri: endpointUrl,
	cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<RecoilRoot>
			<ApolloProvider client={client}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</ApolloProvider>
		</RecoilRoot>
	);
}
export default MyApp;
