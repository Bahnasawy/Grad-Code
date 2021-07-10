import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { createGrammarMutation, parse, save } from "providers/grammar";
import React, { useState } from "react";
import { useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import styled from "styled-components";
import { animation, GreenButton } from "styles/globals";
import tw from "twin.macro";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrammarInput } from "styles/grammar";

export default function NewGrammar() {
	const router = useRouter();

	// SECTION States
	const [string, setString] = useState<string>("");
	const [test, setTest] = useState<string>("");
	const [name, setName] = useState<string>("");

	// SECTION Mutation
	const [addGrammar, { data, loading }] = useMutation<CreateGrammarResponse>(createGrammarMutation, {
		variables: { createdBy: 1, name, string },
	});

	useEffect(() => {
		if (data?.createGrammar.grammar.id) {
			router.push("/grammar");
		}
	}, [data, router]);

	return (
		<div className="flex gap-8">
			<ToastContainer bodyClassName="text-gray-700" />
			<div className="flex flex-col flex-1 gap-4">
				<div className="flex flex-row items-center justify-between">
					<p className="text-2xl font-bold">New Grammar</p>
					{loading && (
						<p className="flex items-center gap-2">
							<VscLoading className="animate-spin" /> Loading
						</p>
					)}
				</div>

				{/* SECTION Grammar Name */}
				<GrammarInput type="text" placeholder="Grammar Name" onChange={(e) => setName(e.target.value)} />

				{/* SECTION Grammar String */}
				<div className="flex items-center gap-4">
					<textarea
						className="flex-1 p-2 border border-gray-400 rounded h-96"
						placeholder="Grammar String"
						onChange={(e) => setString(e.target.value)}
					/>
					<GreenButton onClick={() => parse(string, test)}>Parse</GreenButton>
				</div>

				{/* SECTION Test Text */}
				<div className="flex gap-4">
					<textarea
						className="flex-1 p-2 border border-gray-400 rounded h-96"
						placeholder="Test Text"
						onChange={(e) => setTest(e.target.value)}
					/>
					<div className="flex-1">
						<p className="text-2xl font-semibold">Result</p>
					</div>
				</div>
				<div className="flex justify-end">
					<GreenButton
						onClick={() => {
							if (name && string) {
								addGrammar();
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

const tags: Array<[string, string]> = [
	["<CC>", "Coordinating conjunction"],
	["<CD>", "Cardinal number"],
	["<DT>", "Determiner"],
	["<EX>", "Existential there"],
	["<FW>", "Foreign word"],
	["<IN>", "Preposition or subordinating conjunction"],
	["<JJ>", "Adjective"],
	["<JJR>", "Adjective, comparative"],
	["<JJS>", "Adjective, superlative"],
	["<LS>", "List item marker"],
	["<MD>", "Modal"],
	["<NN>", "Noun, singular or mass"],
	["<NNS>", "Noun, plural"],
	["<NNP>", "Proper noun, singular"],
	["<NNPS>", "Proper noun, plural"],
	["<PDT>", "Predeterminer"],
	["<POS>", "Possessive ending"],
	["<PRP>", "Personal pronoun"],
	["<PRP$>", "Possessive pronoun"],
	["<RB>", "Adverb"],
	["<RBR>", "Adverb, comparative"],
	["<RBS>", "Adverb, superlative"],
	["<RP>", "Particle"],
	["<SYM>", "Symbol"],
	["<TO>", "to"],
	["<UH>", "Interjection"],
	["<VB>", "Verb, base form"],
	["<VBD>", "Verb, past tense"],
	["<VBG>", "Verb, gerund or present participle"],
	["<VBN>", "Verb, past participle"],
	["<VBP>", "Verb, non-3rd person singular present"],
	["<VBZ>", "Verb, 3rd person singular present"],
	["<WDT>", "Wh-determiner"],
	["<WP>", "Wh-pronoun"],
	["<WP$>", "Possessive wh-pronoun"],
	["<WRB>", "Wh-adverb"],
];
