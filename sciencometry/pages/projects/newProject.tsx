import JSZip from "jszip";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { animation } from "styles/globals";
import tw from "twin.macro";

export default function NewProjects() {
	const [file, setFile] = useState<File>();
	let jszip = useRef<JSZip>(new JSZip());
	const [entries, setEntries] = useState<JSZip>();
	const [inflated, setInflated] = useState<Inflated>();

	useEffect(() => {
		if (file) {
			jszip.current.loadAsync(file).then((zip) => {
				setEntries(zip);
			});
		}
	}, [file]);

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
			setInflated(toSet(temp));
		}
	}, [entries]);

	return (
		<div tw="flex flex-col gap-4">
			<div tw="flex flex-row items-center justify-between">
				<p tw="text-2xl font-bold">New Project</p>
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
						}}
					/>
					<span tw="absolute">Upload</span>
				</Upload>
				<p>{file?.name}</p>
			</div>

			<div tw="flex flex-col gap-2">
				<p tw="text-xl font-semibold">Files:</p>
				<div tw="flex flex-col h-96 overflow-y-auto">
					{inflated &&
						Object.keys(inflated).map((author) => (
							<div key={author} tw="flex flex-col gap-2">
								<p tw="text-xl">{author}</p>
								<div tw="ml-4 flex flex-col gap-1">
									{Object.keys(inflated[author]).map((text) => (
										<p key={`${author}/${text}`}>{text}</p>
									))}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

const Upload = styled.label(() => [
	animation,
	tw`relative flex items-center justify-center w-64 font-bold bg-gray-200 border rounded-sm cursor-pointer h-9`,
	tw`hover:bg-gray-300`,
]);

const toSet = (items: JSZip.JSZipObject[]): Inflated => {
	const out: Inflated = {};
	items.forEach((item) => {
		const name = item.name.split("/")[0];
		out[name] = {};
	});
	items.forEach((item) => {
		const name = item.name.split("/");
		item.async("string").then((value) => {
			out[name[0]][name[1]] = value;
		});
	});
	return out;
};
