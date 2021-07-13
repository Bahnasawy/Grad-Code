import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { idGrammarQuery, parse, updateGrammarMutation } from "providers/grammar";
import React, { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { GreenButton } from "styles/globals";
import { GrammarInput } from "styles/grammar";
import tw from "twin.macro";

export default function GrammarC() {
	const router = useRouter();

	// SECTION States
	const [string, setString] = useState<string>("");
	const [test, setTest] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [id, setId] = useState<number>();
	const [result, setResult] = useState<any>();

	// SECTION Data Fetching
	const [getGrammar, grammar] = useLazyQuery<{ grammar: Grammar }>(idGrammarQuery, {
		fetchPolicy: "no-cache",
	});

	const [updateGrammar, { data, loading }] = useMutation<UpdateGrammarResponse>(updateGrammarMutation);

	useEffect(() => {
		if (data?.updateGrammar.grammar.id) {
			router.push("/grammar");
		}
	}, [data, router]);

	useEffect(() => {
		if (grammar.data?.grammar?.id) {
			setString(grammar.data.grammar.string);
			setName(grammar.data.grammar.name);
		}
	}, [grammar.data]);

	useEffect(() => {
		if (router.isReady && typeof router.query.id == "string") {
			setId(parseInt(router.query.id));
		}
	}, [router]);

	useEffect(() => {
		id && !grammar.called && getGrammar({ variables: { id } });
	}, [getGrammar, grammar.called, id]);

	return (
		<div className="flex gap-8">
			<ToastContainer bodyClassName="text-gray-700" />
			<div className="flex flex-col flex-1 gap-4">
				<div className="flex flex-row items-center justify-between">
					<p className="text-2xl font-bold">Update Grammar</p>
					{loading && (
						<p className="flex items-center gap-2">
							<VscLoading className="animate-spin" /> Loading
						</p>
					)}
				</div>

				{/* SECTION Grammar Name */}
				<GrammarInput value={name} type="text" placeholder="Grammar Name" onChange={(e) => setName(e.target.value)} />

				{/* SECTION Grammar String */}
				<div className="flex items-center gap-4">
					<textarea
						value={string}
						placeholder="Grammar String"
						onChange={(e) => setString(e.target.value)}
						rows={6}
						className="w-full p-1 border border-gray-400 rounded"
					/>
					<GreenButton
						onClick={async () =>
							grammar.data?.grammar.name && setResult(await parse(string, test, grammar.data?.grammar.name))
						}
					>
						Parse
					</GreenButton>
				</div>

				{/* SECTION Test Text */}
				<div className="flex gap-4">
					<textarea
						className="flex-1 p-2 border border-gray-400 rounded h-96"
						placeholder="Test Text"
						onChange={(e) => setTest(e.target.value)}
					/>
					<div className="flex flex-col flex-1 gap-1 ">
						<p className="text-2xl font-semibold">Result</p>
						<div>
							{result &&
								grammar.data?.grammar.name &&
								result[grammar.data?.grammar.name].map((item: any, index: number) => (
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
				</div>
				<div className="flex justify-end">
					<GreenButton
						onClick={() => {
							if (name && grammar) {
								updateGrammar({ variables: { id, name, string } });
							} else {
								toast("Please fill both name and grammar");
							}
						}}
					>
						Save
					</GreenButton>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<p className="text-2xl font-semibold">Penn treebank tags:</p>
				<div className="flex flex-col gap-2 overflow-y-auto h-96">
					{tags.map((tag) => (
						<div className="flex gap-2" key={tag[0]}>
							<p className="font-semibold w-14">{tag[0]}</p>
							<p className="flex-1">{tag[1]}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

const tags = [
	["CC", "Coordinating conjunction"],
	["CD", "Cardinal number"],
	["DT", "Determiner"],
	["EX", "Existential there"],
	["FW", "Foreign word"],
	["IN", "Preposition or subordinating conjunction"],
	["JJ", "Adjective"],
	["JJR", "Adjective, comparative"],
	["JJS", "Adjective, superlative"],
	["LS", "List item marker"],
	["MD", "Modal"],
	["NN", "Noun, singular or mass"],
	["NNS", "Noun, plural"],
	["NNP", "Proper noun, singular"],
	["NNPS", "Proper noun, plural"],
	["PDT", "Predeterminer"],
	["POS", "Possessive ending"],
	["PRP", "Personal pronoun"],
	["PRP$", "Possessive pronoun"],
	["RB", "Adverb"],
	["RBR", "Adverb, comparative"],
	["RBS", "Adverb, superlative"],
	["RP", "Particle"],
	["SYM", "Symbol"],
	["TO", "to"],
	["UH", "Interjection"],
	["VB", "Verb, base form"],
	["VBD", "Verb, past tense"],
	["VBG", "Verb, gerund or present participle"],
	["VBN", "Verb, past participle"],
	["VBP", "Verb, non-3rd person singular present"],
	["VBZ", "Verb, 3rd person singular present"],
	["WDT", "Wh-determiner"],
	["WP", "Wh-pronoun"],
	["WP$", "Possessive wh-pronoun"],
	["WRB", "Wh-adverb"],
];

const Word = styled.div(({ active }: { active: boolean }) => [
	tw`flex flex-col items-center px-2 transition duration-300 ease-in-out rounded cursor-pointer`,
	tw`hover:bg-teal-500`,
	active && tw`bg-green-600 text-gray-50`,
]);
