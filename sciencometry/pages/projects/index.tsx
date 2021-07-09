import React, { useState } from "react";
import styled from "styled-components";

import { animation, focusRing, NewEntity } from "styles/globals";
import tw from "twin.macro";

import { BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { projectsQuery } from "providers/projects";
import { useRecoilValue } from "recoil";
import { userAtom } from "atoms";

export default function Projects() {
	const router = useRouter();

	//ANCHOR States
	const [search, setSearch] = useState("");
	const user = useRecoilValue(userAtom);

	//ANCHOR Data Fetching
	const projects = useQuery<Projects>(projectsQuery, { variables: { id: 1 } });

	return (
		<div>
			<div className="flex flex-row items-center justify-between">
				<p className="text-2xl font-bold">Projects</p>
				<NewEntity onClick={() => router.push("/projects/newProject")}>New Project</NewEntity>
			</div>
			<div className="flex flex-col gap-8">
				{/* ANCHOR Search */}
				<div className="flex flex-row gap-2 mt-4">
					<Input placeholder="Search Projects" onChange={(event) => setSearch(event.target.value)} />
					<BiSearchAlt2 className="w-4 text-gray-600" />
				</div>

				{/* ANCHOR Projects */}
				<div className="flex flex-col">
					{/* ANCHOR Headers */}
					<div className="flex flex-row justify-between text-lg font-bold text-left">
						<div className="flex flex-row">
							<p className="w-32">Name</p>
							<p className="w-32">Description</p>
						</div>
						<p>Created At</p>
					</div>
					<hr />
					{/* ANCHOR Data */}
					<div className="flex flex-col gap-1">
						{/* {projects.data &&
							projects.data
								.filter((item) => item.name.toLowerCase().includes(search))
								.map((project: any) => (
									<Project
										key={project.name}
										// "$router.push('/projects/' + project.id)"
										onClick={() => navigate({ page: router.route, path: `/projects/${project.id}`, router })}
									>
										<div className="flex flex-row">
											<p className="w-32">{project.name}</p>
											<p className="w-32">{project.description}</p>
										</div>
										<p>{project.createdAt}</p>
									</Project>
								))} */}
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
