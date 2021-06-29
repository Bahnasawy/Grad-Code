import React, { useState } from "react";
import { animation, focusRing, NewEntity } from "styles/globals";
import tw from "twin.macro";
import { BiSearchAlt2 } from "react-icons/bi";
import styled from "styled-components";
import { useRouter } from "next/router";
import { navigate } from "styles/_app";
import { useQuery } from "react-query";

export default function Grammar() {
	const router = useRouter();

	//ANCHOR Data Fetching
	const grammar = useQuery<Array<any>>("grammar");

	// ANCHOR States
	const [search, setSearch] = useState("");

	return (
		<div>
			<div tw="flex flex-row items-center justify-between">
				<p tw="text-4xl font-bold">Grammar</p>
				<NewEntity>New Grammar</NewEntity>
			</div>
			<div tw="flex flex-col gap-8">
				{/* Search */}
				<div tw="flex flex-row gap-2 mt-4">
					<Input placeholder="Search Grammar" onChange={(event) => setSearch(event.target.value)} />
					<BiSearchAlt2 tw="w-4 text-gray-600" />
				</div>

				{/* Grammar  */}
				<div tw="flex flex-col">
					{/* Headers */}
					<div tw="flex flex-row justify-between text-lg font-bold text-left">
						<div tw="flex flex-row">
							<p tw="w-32">Title</p>
							<p tw="w-32">Author</p>
						</div>
						<p>Created At</p>
					</div>
					<hr />
					{/* Data */}
					{grammar.data && (
						<div tw="flex flex-col gap-1">
							{grammar.data
								.filter((item: any) => item.title.toLowerCase().includes(search))
								.map(({ title, author, createdAt }: any) => (
									<Button
										key={title + author}
										onClick={navigate({ page: router.route, path: `/grammar/${title}`, router })}
									>
										<div tw="flex flex-row">
											<p tw="w-32">{title}</p>
											<p tw="w-32">{author.username}</p>
										</div>
										<p>{createdAt}</p>
									</Button>
								))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

const Input = styled.input(() => [
	animation,
	tw`px-2 text-sm border border-gray-200 rounded shadow-xl `,
	tw`focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`,
]);

const Button = styled.button(() => [
	animation,
	focusRing,
	tw`flex flex-row justify-between w-full text-left rounded-sm `,
	tw`hover:bg-gray-200`,
]);
