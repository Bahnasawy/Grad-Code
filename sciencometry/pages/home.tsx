import Recent from "components/home/Recent";
import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export default function Home() {
	const [recentProjects, setRecentProjects] = useState<RecentsType>([
		{ name: "Temp", createdAt: Date.now(), description: "This is a test project", id: 1 },
		{ name: "Temp", createdAt: Date.now(), description: "This is a test project", id: 2 },
		{ name: "Temp", createdAt: Date.now(), description: "This is a test project", id: 3 },
	]);

	const [recentGrammar, setRecentGrammar] = useState<RecentsType>([
		{ name: "Temp", createdAt: Date.now(), description: "This is a test grammar", id: 1 },
		{ name: "Temp", createdAt: Date.now(), description: "This is a test grammar", id: 2 },
		{ name: "Temp", createdAt: Date.now(), description: "This is a test grammar", id: 3 },
	]);

	return (
		<Container>
			<Part>
				<Title>Recent Projects</Title>
				<Recents>
					{recentProjects.length &&
						recentProjects.map(({ createdAt, description, name, id }) => (
							<Recent key={id} createdAt={createdAt} description={description} name={name} id={id} />
						))}
				</Recents>
			</Part>
			<Part>
				<Title>Recent Grammar</Title>
				<Recents>
					{recentGrammar.length &&
						recentGrammar.map(({ createdAt, description, name, id }) => (
							<Recent key={id} createdAt={createdAt} description={description} name={name} id={id} />
						))}
				</Recents>
			</Part>
		</Container>
	);
}

const Title = styled.p(() => [tw`text-2xl font-semibold`]);

const Container = styled.div(() => [tw`flex flex-col gap-4`]);

const Part = styled.div(() => [tw`flex flex-col gap-2`]);

const Recents = styled.div(() => [tw`flex h-40 gap-4 overflow-auto`]);
