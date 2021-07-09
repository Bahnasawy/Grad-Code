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
	//SECTION States
	const [file, setFile] = useState<File>();
	const [entries, setEntries] = useState<JSZip>();
	const [inflated, setInflated] = useState<Inflated>();
	const [loading, setLoading] = useState<boolean>(false);

	//SECTION JSZip
	let jszip = useRef<JSZip>(new JSZip());

	//SECTION Queries
	const id = useRecoilValue(userAtom);
	const grammar = useQuery(grammarQuery, { variables: { id: 1 } });

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
		<div className="flex flex-col gap-4">
			<div className="flex flex-row items-center justify-between">
				<p className="text-2xl font-bold">New Project</p>
				{loading && (
					<p className="flex items-center gap-2">
						<VscLoading className="animate-spin" /> Loading
					</p>
				)}
			</div>

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
	);
}
