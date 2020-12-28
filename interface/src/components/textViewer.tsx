import React from "react"

const TextViewer = ({
  files,
  selectedAuthor,
  selectedTitle,
  generateRandomString,
  getDefinition,
  selectedFeature,
}: any) => {
  const ret = () => {
    return (
      <p className="px-8 py-4 overflow-y-auto text-lg font-semibold leading-relaxed bg-gray-100 row-span-8">
        {selectedFeature &&
          selectedFeature !== "Disputed" &&
          files?.[selectedAuthor]?.[selectedTitle]?.content[
            selectedFeature
          ].map((text: any, textIdx: number) => (
            <span>
              {text.map((token: any, tokenIdx: number) => {
                if (typeof token[0] === "string") {
                  return <span key={generateRandomString()}>{token[0]} </span>
                } else {
                  return (
                    <span
                      key={generateRandomString()}
                      className="relative group"
                    >
                      <span className="relative text-blue-700 transition duration-300 ease-in-out cursor-pointer group-hover:text-gray-100 group-hover:bg-blue-700">
                        {token[0].join(" ")}
                      </span>{" "}
                      <span className="absolute left-0 z-10 group-hover:flex px-1 bg-gray-700 opacity-0 top-full text-gray-50 group-hover:opacity-100 mt-0.5 hidden whitespace-nowrap">
                        {selectedFeature}
                      </span>
                    </span>
                  )
                }
              })}
              {"."}
              <br />
            </span>
          ))}
      </p>
    )
  }

  return ret()
}

export default TextViewer
