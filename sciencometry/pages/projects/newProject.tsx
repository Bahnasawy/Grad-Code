import JSZip from "jszip";
import { toSet } from "providers/projects";
import React, { useEffect, useRef, useState } from "react";
import { Upload } from "styles/project";
import { VscLoading } from "react-icons/vsc";
import { useMutation, useQuery } from "@apollo/client";
import { grammarQuery } from "providers/grammar";
import { animation, focusRing, GreenButton, Input } from "styles/globals";
import { BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/router";
import styled from "styled-components";
import tw from "twin.macro";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProject, createProjectMutation } from "providers/project";
import { useRecoilValue } from "recoil";
import { userAtom } from "atoms";

export default function NewProjects() {
	const router = useRouter();

	//SECTION States
	const [name, setName] = useState<string>("");
	const [file, setFile] = useState<File>();
	const [entries, setEntries] = useState<JSZip>();
	const [inflated, setInflated] = useState<Inflated>();
	const [loading, setLoading] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [selected, setSelected] = useState<Array<Grammar>>([]);

	const user = useRecoilValue(userAtom);

	//SECTION JSZip
	let jszip = useRef<JSZip>(new JSZip());

	//SECTION Queries
	const grammar = useQuery<Grammars>(grammarQuery);

	//SECTION Mutations
	const [addProject, { data }] = useMutation<CreateProjectResponse>(createProjectMutation);

	useEffect(() => {
		if (file) {
			jszip.current.loadAsync(file).then((zip) => {
				setEntries(zip);
			});
		}
	}, [file]);

	useEffect(() => {
		if (data?.createProject.project.id) {
			router.push(`/projects/${data?.createProject.project.id}`);
		}
	}, [data?.createProject.project.id, router]);

	useEffect(() => {
		if (entries?.files) {
			const rootName = Object.keys(entries.files)[0];
			const temp = entries
				.filter((relativePath, file) => {
					return !file.dir;
				})
				.map((item) => {
					const out = item;
					out.name = out.name.replace(rootName, "");
					return out;
				});
			toSet(temp).then((value) => setInflated(value));
			setLoading(false);
		}
	}, [entries]);

	return (
		<div className="flex flex-col gap-4">
			<ToastContainer bodyClassName="text-gray-900" />
			<div className="flex flex-row items-center justify-between">
				<p className="text-2xl font-bold">New Project</p>
				{loading && (
					<p className="flex items-center gap-2">
						<VscLoading className="animate-spin" /> Loading
					</p>
				)}
			</div>

			<input
				type="text"
				placeholder="Project Name"
				className="flex-1 px-4 py-1 text-gray-800 border border-gray-400 rounded"
				onChange={(e) => setName(e.target.value)}
			/>

			<div className="flex">
				{/* SECTION Upload */}
				<div className="flex flex-col flex-1 gap-8">
					<div className="flex items-center gap-4">
						<Upload>
							<input
								type="file"
								id="file"
								className="absolute w-full h-full opacity-0"
								onChange={(e) => {
									jszip.current = new JSZip();
									setFile(e.target.files?.[0]);
									setLoading(true);
								}}
							/>
							<span className="absolute">Upload</span>
						</Upload>
						<p>{file?.name}</p>
					</div>

					<div className="flex flex-col gap-2">
						{inflated && (
							<div>
								<p className="text-2xl font-semibold underline">Files:</p>
								<div className="flex flex-col gap-2 overflow-y-auto h-96">
									{Object.keys(inflated).map((author) => (
										<div key={author} className="flex flex-col">
											<p className="text-xl font-medium underline">{author}</p>
											<div className="flex flex-col gap-1 pl-4 border-l border-gray-500">
												{Object.keys(inflated[author]).map((text) => (
													<p key={`${author}/${text}`} className="text-sm">
														{text}
													</p>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* SECTION Grammar */}
				<div className="flex flex-col flex-1 gap-8">
					<div className="flex flex-row items-center gap-2 mt-4">
						<Input placeholder="Search Grammar" onChange={(event) => setSearch(event.target.value)} />
						<BiSearchAlt2 className="w-4 text-gray-600" />
					</div>

					<div className="flex flex-col">
						{/* SECTION Headers */}
						<div className="flex flex-row justify-between text-lg font-bold text-left">
							<div className="flex flex-row">
								<p className="w-32">Name</p>
								<p className="w-32">Author</p>
							</div>
							<p>String</p>
						</div>
						<hr />
						{/* SECTION Data */}
						{grammar.data && (
							<div className="flex flex-col h-64 gap-1 overflow-y-auto">
								{grammar.data.grammars.nodes
									.filter((item) => item.name.toLowerCase().includes(search))
									.map((item) => (
										<Button key={item.id} onClick={() => setSelected([...selected, item])}>
											<div className="flex flex-row">
												<p className="w-32">{item.name}</p>
												<p className="w-32">{item.author.username}</p>
											</div>
											<p>{item.string}</p>
										</Button>
									))}
							</div>
						)}
						<p className="mt-8 text-xl font-semibold">Selected Grammar</p>
						<div className="flex flex-col h-64 gap-2 overflow-y-auto">
							{grammar.data &&
								grammar.data.grammars.nodes
									.filter((item) => selected.map((bit) => bit.id == item.id).includes(true))
									.map(({ name, author, string, id }) => (
										<Button key={id} onClick={() => setSelected(selected.filter((bit) => bit.id != id))}>
											<div className="flex flex-row">
												<p className="w-32">{name}</p>
												<p className="w-32">{author.username}</p>
											</div>
											<p>{string}</p>
										</Button>
									))}
						</div>
					</div>
					<div className="flex justify-end">
						<GreenButton
							onClick={async () => {
								if (name && inflated && selected.length) {
									const res = await createProject(inflated, selected);
									addProject({ variables: { name, createdBy: user, data: res } });
								} else {
									toast("Please upload texts and select grammar.");
								}
							}}
						>
							Save
						</GreenButton>
					</div>
				</div>
			</div>
		</div>
	);
}

const Button = styled.button(() => [
	animation,
	focusRing,
	tw`flex flex-row justify-between w-full text-left rounded-sm `,
	tw`hover:bg-gray-200`,
]);
