import React, { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import styled from "styled-components";
import { animation, GreenButton } from "styles/globals";
import tw from "twin.macro";

export default function NewGrammar() {
	const [loading, setLoading] = useState(false);

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

			{/* SECTION Grammar String */}
			<div className="flex items-center gap-4">
				<GrammarInput type="text" placeholder="Grammar String" />
				<GreenButton>Parse</GreenButton>
			</div>

			{/* SECTION Test Text */}
			<div className="flex gap-4">
				<textarea className="flex-1 p-2 border border-gray-400 rounded h-96" placeholder="Test Text" />
				<div className="flex-1">
					<p className="text-2xl font-semibold">Result</p>
				</div>
			</div>
			<div className="flex justify-end">
				<GreenButton>Save</GreenButton>
			</div>
		</div>
	);
}

const GrammarInput = styled.input(() => [tw`flex-1 px-4 py-1 text-gray-800 border border-gray-400 rounded`]);
