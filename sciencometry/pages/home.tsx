import { useQuery } from "@apollo/client";
import { userAtom } from "atoms";
import Recent from "components/home/Recent";
import { homeQuery } from "providers/home";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

export default function Home() {
	const user = useRecoilValue(userAtom);

	const recent = useQuery<HomeResponse>(homeQuery, { variables: { id: user }, fetchPolicy: "network-only" });

	return (
		<Container>
			<Part>
				<Title>Recent Projects</Title>
				<Recents>
					{recent.data?.projects.nodes.length &&
						recent.data?.projects.nodes.map(({ createdAt, description, name, id }) => (
							<Recent key={id} createdAt={createdAt} description={description} name={name} id={id} project />
						))}
				</Recents>
			</Part>
			<Part>
				<Title>Recent Grammar</Title>
				<Recents>
					{recent.data?.grammars.nodes.length &&
						recent.data?.grammars.nodes.map(({ createdAt, name, id }) => (
							<Recent key={id} createdAt={createdAt} description="" name={name} id={id} />
						))}
				</Recents>
			</Part>
		</Container>
	);
}

const Title = styled.p(() => [tw`text-2xl font-semibold`]);

const Container = styled.div(() => [tw`flex flex-col h-full gap-4`]);

const Part = styled.div(() => [tw`flex flex-col gap-2`]);

const Recents = styled.div(() => [tw`flex h-40 gap-4`]);
