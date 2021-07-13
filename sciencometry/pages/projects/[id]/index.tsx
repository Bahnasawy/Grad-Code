import React, { useEffect, useState } from "react";
import { GreenButton } from "styles/globals";
import tw from "twin.macro";
import { AiOutlineLoading, AiOutlineCheck } from "react-icons/ai";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { idProjectQuery } from "providers/projects";
import { chiDistance } from "providers/project";

export default function Project() {
	//SECTION Data Fetch
	const router = useRouter();
	const [getProject, project] = useLazyQuery<{ project: Project }>(idProjectQuery, { fetchPolicy: "network-only" });

	//SECTION States
	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");
	const [feature, setFeature] = useState("");
	const [id, setId] = useState<number>();

	//SECTION Effects
	useEffect(() => {
		if (id && !project.called) {
			getProject({ variables: { id } });
		}
	}, [getProject, id, project.called]);

	useEffect(() => {
		if (router.isReady && typeof router.query.id == "string" && !id) {
			setId(parseInt(router.query.id));
		}
	}, [id, router]);

	useEffect(() => {
		if (project.data) {
			chiDistance(project.data.project);
		}
	}, [project.data]);

	if (project.loading)
		return (
			<div className="flex items-center justify-center">
				<AiOutlineLoading className="w-32 h-32 animate-spin" />
			</div>
		);

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-row items-center justify-between">
				<p className="text-2xl font-semibold">{project.data?.project.name}</p>
			</div>
			{/* SECTION Text Selector */}
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row gap-4">
					{/* SECTION Author */}
					<div>
						<label htmlFor="author" className="mr-1">
							Author:
						</label>
						<select
							name="author"
							onChange={(event) => {
								setText("");
								setFeature("");
								setAuthor(event.target.value);
							}}
							className="w-48 px-2 py-1 rounded"
						>
							<option value=""></option>
							{project.data?.project &&
								Object.keys(project.data?.project.data).map((textsAuthor) => (
									<option key={textsAuthor} value={textsAuthor} selected={textsAuthor == author}>
										{textsAuthor}
									</option>
								))}
						</select>
					</div>

					{/* SECTION Text */}
					<div>
						<label htmlFor="text" className="mr-1">
							Text:
						</label>
						<Select
							name="text"
							onChange={(event) => {
								setText(event.target.value);
								setFeature("");
							}}
							className="w-48 px-2 py-1 rounded"
							value={text}
						>
							<option value=""></option>

							{project.data?.project &&
								author &&
								Object.keys(project.data?.project.data[author]).map((textsText) => (
									<option key={textsText} value={textsText}>
										{textsText}
									</option>
								))}
						</Select>
					</div>
				</div>

				{/* SECTION Feature */}
				<div>
					<label htmlFor="freature" className="mr-1">
						Feature:
					</label>
					<Select name="feature" onChange={(event) => setFeature(event.target.value)} value={feature}>
						<option value=""></option>

						{project.data?.project &&
							author &&
							text &&
							Object.keys(project.data?.project.data[author][text]).map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
					</Select>
				</div>
			</div>
			{/* SECTION Text */}
			<div className="flex flex-wrap w-full gap-8 overflow-y-auto divide-y-2 divide-gray-900 max-h-192">
				{project.data?.project &&
					author &&
					text &&
					feature &&
					project.data?.project.data[author][text][feature].map((item: any, index: number) => (
						<div
							key={item[0][0].join(" ") + index.toString() + Math.random().toString()}
							className="flex flex-row flex-wrap items-center gap-4 pt-8"
						>
							{item.map((word: any, index: number) => (
								<Word active={word[2]} key={word[0].join(" ") + index.toString() + Math.random().toString()}>
									<p className="text-lg font-bold">{word[0].join(" ")}</p>
									<p>{word[1]}</p>
								</Word>
							))}
						</div>
					))}
			</div>
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
