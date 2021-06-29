import React from "react";
import tw from "twin.macro";

export default function GrammarC() {
	return (
		<div tw="flex flex-col gap-8">
			<div tw="flex flex-row items-center justify-between">
				<input type="text" tw="text-4xl font-bold" v-model="title" />
				<button tw="flex flex-row items-center gap-2 px-4 py-1 text-lg font-bold bg-teal-600 rounded  focus-ring animated text-gray-50">
					Save
					{/* <check-icon tw="w-6" /> */}
				</button>
			</div>
			<input
				type="text"
				tw="px-2 py-1 text-base border border-gray-300 rounded shadow-lg  focus-ring animated"
				placeholder="Grammar Regex"
			/>
			<div tw="flex flex-row justify-end gap-2 divide-x-2 divide-gray-900 h-192">
				<div tw="flex flex-col flex-1 gap-2">
					<div tw="flex flex-row items-center justify-between">
						<p tw="mb-1 font-bold">Test text</p>
						<button tw="px-4 py-1 bg-teal-600 border border-transparent rounded  animated focus:border-gray-50 focus-ring text-gray-50 hover:bg-teal-700 focus:bg-teal-800">
							Parse
						</button>
					</div>
					<textarea
						//   :rows="20"
						tw="h-full px-2 py-1 border border-gray-300 rounded  animated focus-ring"
					/>
				</div>
				<div tw="h-full px-2 overflow-y-auto w-96">
					<p tw="text-2xl font-bold underline">Penn treebank tags</p>
					<div tw="flex flex-col gap-1 divide-y-2">
						<div
							//    v-for="item in tags"
							//     :key="item[0]"
							tw="flex flex-row"
						>
							<p tw="w-12">{item[0]}</p>
							<p tw="flex-1">{item[1]}</p>
						</div>
					</div>
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
