import JSZip from "jszip";
import { grammarQuery, toSet } from "providers/projects";
import React, { useEffect, useRef, useState } from "react";
import { Upload } from "styles/project";
import tw from "twin.macro";
import { VscLoading } from "react-icons/vsc";
import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { userAtom } from "atoms";

export default function NewProjects() {
	//ANCHOR States
	const [file, setFile] = useState<File>();
	const [entries, setEntries] = useState<JSZip>();
	const [inflated, setInflated] = useState<Inflated>();
	const [loading, setLoading] = useState<boolean>(false);

	//ANCHOR JSZip
	let jszip = useRef<JSZip>(new JSZip());

	//ANCHOR Queries
	const id = useRecoilValue(userAtom);
	const grammar = useQuery(grammarQuery, { skip: true });

	useEffect(() => {
		if (file) {
			jszip.current.loadAsync(file).then((zip) => {
				setEntries(zip);
			});
		}
	}, [file]);

	useEffect(() => {
		id && grammar.refetch();
	}, [id, grammar]);

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
		<div tw="flex flex-col gap-4">
			<div tw="flex flex-row items-center justify-between">
				<p tw="text-2xl font-bold">New Project</p>
				{loading && (
					<p tw="flex items-center gap-2">
						<VscLoading tw="animate-spin" /> Loading
					</p>
				)}
			</div>

			<div tw="flex items-center gap-4">
				<Upload>
					<input
						type="file"
						id="file"
						tw="absolute opacity-0 w-full h-full"
						onChange={(e) => {
							jszip.current = new JSZip();
							setFile(e.target.files?.[0]);
							setLoading(true);
						}}
					/>
					<span tw="absolute">Upload</span>
				</Upload>
				<p>{file?.name}</p>
			</div>

			<div tw="flex flex-col gap-2">
				{inflated && (
					<div>
						<p tw="text-2xl font-semibold underline">Files:</p>
						<div tw="flex flex-col h-96 overflow-y-auto gap-2">
							{Object.keys(inflated).map((author) => (
								<div key={author} tw="flex flex-col">
									<p tw="text-xl font-medium underline">{author}</p>
									<div tw="pl-4 flex flex-col gap-1 border-l border-gray-500">
										{Object.keys(inflated[author]).map((text) => (
											<p key={`${author}/${text}`} tw="text-sm">
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
	);
}
