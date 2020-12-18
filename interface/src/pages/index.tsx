import React from "react"
import { LoremIpsum } from "lorem-ipsum"

const index = () => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  })

  return (
    <div className="grid h-screen grid-cols-10 grid-rows-20">
      {/* Header */}
      <div className="row-span-1 col-span-full">Header</div>
      {/* File Preview */}
      <div className="col-span-2 p-4 bg-red-500 row-span-19">File Preview</div>
      {/* Corpus */}
      <div className="grid col-span-6 row-span-19 grid-rows-10">
        <p className="p-8 overflow-y-auto bg-gray-500 row-span-8">
          {lorem.generateParagraphs(20)}
        </p>
        <div className="row-span-2 px-4 bg-purple-500">Definitions</div>
      </div>
      {/* Statistics */}
      <div className="col-span-2 p-4 bg-blue-500 row-span-19">Statistics</div>
    </div>
  )
}

export default index
