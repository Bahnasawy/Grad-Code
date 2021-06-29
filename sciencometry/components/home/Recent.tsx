import React from "react";
import styled from "styled-components";

import { animation, focusRing } from "styles/globals";
import tw from "twin.macro";

/** Recent Entity Button */
export default function Recent({ createdAt, description, name, id }: RecentType) {
	return (
		<Container>
			<div tw="flex flex-col items-start w-full p-4">
				<p tw="text-xl font-bold text-gray-900">{name}</p>
				<p tw="text-gray-700 truncate">{description}</p>
			</div>
			<div tw="flex flex-col items-start w-full px-4 py-2 bg-gray-100 rounded-b-lg ">
				<p tw="text-gray-700">{new Date(createdAt).toUTCString()}</p>
			</div>
		</Container>
	);
}

const Container = styled.button(() => [
	animation,
	focusRing,
	tw`flex flex-col justify-between w-64 h-32 m-1 bg-gray-200 border border-gray-300 rounded-lg`,
	tw`hover:shadow-xl hover:border-transparent`,
]);
