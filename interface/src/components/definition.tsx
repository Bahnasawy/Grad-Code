import React from "react"

const Definition = ({ definition }: { definition: definition }) => {
  if (definition) {
    const { word, phonetics, meanings } = definition[0]
    return (
      <div className="grid grid-flow-row grid-cols-1 gap-2 divide-y-2 divide-gray-600 divide-dashed">
        <div>
          <p className="text-lg text-gray-900 underline">{word}</p>
          <div className="flex space-x-2 text-sm text-gray-600 divide-x divide-current divide-solid">
            <p>{meanings[0]?.partOfSpeech}</p>
            <p className="px-2">{phonetics[0]?.text}</p>
          </div>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-900">
            {meanings[0]?.definitions[0]?.definition}
          </p>
          <p className="text-xs text-gray-600">
            "{meanings[0]?.definitions[0]?.example}"
          </p>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Definition
