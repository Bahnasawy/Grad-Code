import React from "react"

const TextViewer = ({
  analysis,
  selectedAuthor,
  selectedTitle,
  generateRandomString,
  getDefinition,
  setHover,
  hover,
  selectedFeature,
}: any) => {
  return (
    <p className="px-8 py-4 overflow-y-auto bg-gray-100 row-span-8">
      {analysis?.[selectedAuthor]?.[selectedTitle].content.map(
        (word: any, idx: number) => {
          return analysis?.[selectedAuthor]?.[selectedTitle].highlight?.[
            selectedFeature
          ]?.includes(idx) ? (
            <span key={generateRandomString()}>
              {/* <span
                className="relative text-red-600 transition duration-300 ease-in-out cursor-pointer hover:text-gray-100 hover:bg-red-600"
                onClick={() => getDefinition(word)}
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover()}
              >
                {word.join(" ")}
                {hover === idx && (
                  <span className="absolute left-0 mt-0.5 bg-gray-600 top-full text-gray-100 px-2 whitespace-nowrap">
                    {selectedFeature}
                  </span>
                )}
              </span>{" "} */}
            </span>
          ) : (
            // <span></span>
            <span key={generateRandomString()}>{word[0][0]} </span>
          )
        }
      )}
    </p>
  )
}

export default TextViewer
