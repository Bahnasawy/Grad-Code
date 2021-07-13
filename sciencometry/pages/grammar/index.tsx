import React, { useState } from "react";
import { animation, focusRing, GreenButton } from "styles/globals";
import tw from "twin.macro";
import { BiSearchAlt2 } from "react-icons/bi";
import styled from "styled-components";
import { useRouter } from "next/router";
import { navigate } from "styles/_app";
import { useQuery } from "@apollo/client";
import { grammarsQuery } from "providers/projects";
import { useRecoilValue } from "recoil";
import { userAtom } from "atoms";

export default function Grammar() {
	const router = useRouter();

	const user = useRecoilValue(userAtom);

	//SECTION Data Fetching
	const grammars = useQuery<Grammars>(grammarsQuery, { variables: { id: user } });

	// SECTION States
	const [search, setSearch] = useState("");

	return (
		<div>
			<div className="flex flex-row items-center justify-between">
				<p className="text-2xl font-bold">Grammar</p>
				<GreenButton onClick={() => router.push("/grammar/newGrammar")}>New Grammar</GreenButton>
			</div>
			<div className="flex flex-col gap-8">
				{/* SECTION Search */}
				<div className="flex flex-row gap-2 mt-4">
					<Input placeholder="Search Grammar" onChange={(event) => setSearch(event.target.value)} />
					<BiSearchAlt2 className="w-4 text-gray-600" />
				</div>

				{/* SECTION Grammar  */}
				<div className="flex flex-col">
					{/* SECTION Headers */}
					<div className="flex flex-row justify-between text-lg font-bold text-left">
						<div className="flex flex-row">
							<p className="w-96">Name</p>
							<p className="w-96">Author</p>
						</div>
						<p>Created At</p>
					</div>
					<hr />
					{/* SECTION Data */}
					{grammars.data && (
						<div className="flex flex-col gap-1">
							{grammars.data.grammars.nodes
								.filter((item) => item.name.toLowerCase().includes(search))
								.map(({ name, author, createdAt, id }) => (
									<Button key={name + author} onClick={() => router.push(`/grammar/${id}`)}>
										<div className="flex flex-row">
											<p className="w-96">{name}</p>
											<p className="w-96">{author.username}</p>
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
