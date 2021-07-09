import React, { useState } from "react";
import { animation, focusRing, NewEntity } from "styles/globals";
import tw from "twin.macro";
import { BiSearchAlt2 } from "react-icons/bi";
import styled from "styled-components";
import { useRouter } from "next/router";
import { navigate } from "styles/_app";
import { useQuery } from "@apollo/client";
import { grammarQuery } from "providers/grammar";

export default function Grammar() {
	const router = useRouter();

	// const user =

	//ANCHOR Data Fetching
	const grammar = useQuery<Grammars>(grammarQuery, { variables: { id: 1 } });

	// ANCHOR States
	const [search, setSearch] = useState("");

	return (
		<div>
			<div className="flex flex-row items-center justify-between">
				<p className="text-4xl font-bold">Grammar</p>
				<NewEntity>New Grammar</NewEntity>
			</div>
			<div className="flex flex-col gap-8">
				{/* ANCHOR Search */}
				<div className="flex flex-row gap-2 mt-4">
					<Input placeholder="Search Grammar" onChange={(event) => setSearch(event.target.value)} />
					<BiSearchAlt2 className="w-4 text-gray-600" />
				</div>

				{/* ANCHOR Grammar  */}
				<div className="flex flex-col">
					{/* Headers */}
					<div className="flex flex-row justify-between text-lg font-bold text-left">
						<div className="flex flex-row">
							<p className="w-32">Title</p>
							<p className="w-32">Author</p>
						</div>
						<p>Created At</p>
					</div>
					<hr />
					{/* ANCHOR Data */}
					{grammar.data && (
						<div className="flex flex-col gap-1">
							{grammar.data.grammars.nodes
								.filter((item) => item.name.toLowerCase().includes(search))
								.map(({ name, author, createdAt }) => (
									<Button
										key={name + author}
										onClick={navigate({ page: router.route, path: `/grammar/${name}`, router })}
									>
										<div className="flex flex-row">
											<p className="w-32">{name}</p>
											<p className="w-32">{author.username}</p>
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
