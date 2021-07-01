/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NewEntity } from "styles/globals";
import tw from "twin.macro";
import { AiOutlineLoading, AiOutlineCheck } from "react-icons/ai";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getProject } from "providers/project";
import { useRouter } from "next/router";

export default function Project() {
	//ANCHOR Data Fetch
	const router = useRouter();
	const { id } = router.query;
	const project = useQuery<Project>("project", () => getProject(id), { enabled: false });

	//ANCHOR States
	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");
	const [feature, setFeature] = useState("");

	//ANCHOR Effects
	useEffect(() => {
		id && project.refetch();
	}, [id]);

	useEffect(() => {
		if (project.data) {
		}
	}, [project.data]);

	return (
		<div>
			{project != null ? (
				<div tw="flex flex-col gap-8" v-if="project != null">
					<div tw="flex flex-row items-center justify-between">
						<input
							type="text"
							tw="px-1 text-4xl font-bold"
							// v-model="project.name"
						/>
						<NewEntity>
							{project.data?.name}
							<AiOutlineCheck tw="w-6" />
						</NewEntity>
					</div>
					{/* Text Selector */}
					<div tw="flex flex-row items-center justify-between">
						<div tw="flex flex-row gap-4">
							<div>
								<label htmlFor="author" tw="mr-1">
									Author:
								</label>
								<select name="author" onChange={(event) => setAuthor(event.target.value)} tw="w-48 px-2 py-1 rounded">
									{project.data &&
										Object.keys(project.data.data).map((textsAuthor) => (
											<option key={textsAuthor} value={textsAuthor} selected={textsAuthor == author}>
												{textsAuthor}
											</option>
										))}
								</select>
							</div>
							<div>
								<label htmlFor="text" tw="mr-1">
									Text:
								</label>
								<Select name="text" onChange={(event) => setText(event.target.value)} tw="w-48 px-2 py-1 rounded">
									{project.data &&
										Object.keys(project.data.data[author]).map((textsText) => (
											<option key={textsText} value={textsText}>
												{textsText}
											</option>
										))}
								</Select>
							</div>
						</div>
						<div>
							<label htmlFor="freature" tw="mr-1">
								Feature:
							</label>
							<Select name="feature" onChange={(event) => setFeature(event.target.value)}>
								{project.data &&
									Object.keys(project.data.data[author][text]).map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
							</Select>
						</div>
					</div>
					{/* Text */}
					<div tw="flex flex-wrap w-full gap-8 overflow-y-auto divide-y-2 divide-gray-900  max-h-192">
						{project.data &&
							project.data.data[author][text][feature].map((item: any, index: number) => (
								<div
									key={item[0][0].join(" ") + index.toString() + Math.random().toString()}
									tw="flex flex-row flex-wrap items-center gap-4 pt-8"
								>
									{item.map((word: any, index: number) => (
										<Word active={word[2]} key={word[0].join(" ") + index.toString() + Math.random().toString()}>
											<p tw="text-lg font-bold">{word[0].join(" ")}</p>
											<p>{word[1]}</p>
										</Word>
									))}
								</div>
							))}
					</div>
				</div>
			) : (
				<div tw="flex items-center justify-center">
					<AiOutlineLoading tw="w-32 h-32 animate-spin-slow" />
				</div>
			)}
		</div>
	);
}

const Word = styled.div(({ active }: { active: boolean }) => [
	tw`flex flex-col items-center px-2 transition duration-300 ease-in-out rounded cursor-pointer`,
	tw`hover:bg-teal-500`,
	active && tw`bg-green-600 text-gray-50`,
]);

const Select = styled.select`
	${tw`w-48 px-2 py-1 rounded`}
`;
