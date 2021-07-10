import React, { useState } from "react";
import styled from "styled-components";

import { animation, focusRing, GreenButton, Input } from "styles/globals";
import tw from "twin.macro";

import { BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { projectsQuery } from "providers/projects";
import { useRecoilValue } from "recoil";
import { userAtom } from "atoms";

export default function Projects() {
	const router = useRouter();

	//SECTION States
	const [search, setSearch] = useState("");
	const user = useRecoilValue(userAtom);

	//SECTION Data Fetching
	const projects = useQuery<Projects>(projectsQuery, { variables: { id: 1 } });

	return (
		<div>
			<div className="flex flex-row items-center justify-between">
				<p className="text-2xl font-bold">Projects</p>
				<GreenButton onClick={() => router.push("/projects/newProject")}>New Project</GreenButton>
			</div>
			<div className="flex flex-col gap-8">
				{/* SECTION Search */}
				<div className="flex flex-row items-center gap-2 mt-4">
					<Input placeholder="Search Projects" onChange={(event) => setSearch(event.target.value)} />
					<BiSearchAlt2 className="w-4 text-gray-600" />
				</div>

				{/* SECTION Projects */}
				<div className="flex flex-col">
					{/* SECTION Headers */}
					<div className="flex flex-row justify-between text-lg font-bold text-left">
						<div className="flex flex-row">
							<p className="w-32">Name</p>
							<p className="w-32">Description</p>
						</div>
						<p>Created At</p>
					</div>
					<hr />
					{/* SECTION Data */}
					<div className="flex flex-col gap-1">
						{projects.data &&
							projects.data.projects.nodes
								.filter((item) => item.name.toLowerCase().includes(search))
								.map((project: any) => (
									<Project
										key={project.name}
										// "$router.push('/projects/' + project.id)"
										onClick={() => router.push(`/projects/${project.id}`)}
									>
										<div className="flex flex-row">
											<p className="w-32">{project.name}</p>
											<p className="w-32">{project.description}</p>
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
