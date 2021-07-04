import { getProjects } from "providers/projects";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { animation, focusRing, NewEntity } from "styles/globals";
import tw from "twin.macro";

import { BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/router";
import { navigate } from "styles/_app";

export default function Projects() {
	const router = useRouter();

	//ANCHOR Data Fetching
	const projects = useQuery<Array<any>>("projects", getProjects);

	//ANCHOR States
	const [search, setSearch] = useState("");

	return (
		<div>
			<div tw="flex flex-row items-center justify-between">
				<p tw="text-2xl font-bold">Projects</p>
				<NewEntity onClick={() => router.push("/projects/newProject")}>New Project</NewEntity>
			</div>
			<div tw="flex flex-col gap-8">
				{/* Search */}
				<div tw="flex flex-row gap-2 mt-4">
					<Input placeholder="Search Projects" onChange={(event) => setSearch(event.target.value)} />
					<BiSearchAlt2 tw="w-4 text-gray-600" />
				</div>

				{/* Projects */}
				<div tw="flex flex-col">
					{/* Headers */}
					<div tw="flex flex-row justify-between text-lg font-bold text-left">
						<div tw="flex flex-row">
							<p tw="w-32">Name</p>
							<p tw="w-32">Description</p>
						</div>
						<p>Created At</p>
					</div>
					<hr />
					{/* Data */}
					<div tw="flex flex-col gap-1">
						{projects.data &&
							projects.data
								.filter((item) => item.name.toLowerCase().includes(search))
								.map((project: any) => (
									<Project
										key={project.name}
										// "$router.push('/projects/' + project.id)"
										onClick={() => navigate({ page: router.route, path: `/projects/${project.id}`, router })}
									>
										<div tw="flex flex-row">
											<p tw="w-32">{project.name}</p>
											<p tw="w-32">{project.description}</p>
										</div>
										<p>{project.createdAt}</p>
									</Project>
								))}
					</div>
				</div>
			</div>
		</div>
	);
}

const Project = styled.button(() => [
	animation,
	focusRing,
	tw`flex flex-row justify-between w-full text-left rounded-sm`,
	tw`hover:bg-gray-200`,
]);

const Input = styled.input(() => [
	animation,
	tw`px-2 text-sm border border-gray-200 rounded shadow-xl `,
	tw`focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`,
]);
