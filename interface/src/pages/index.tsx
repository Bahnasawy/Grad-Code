import React, { useState } from "react"
import { get } from "superagent"

const Index = () => {
  const [{ selectedAuthor, selectedTitle }, setSelectedText] = useState({
    selectedAuthor: "",
    selectedTitle: "",
  })
  const [selectedWord, setSelectedWord] = useState("")
  const [definition, setDefinition]: [definition, Function] = useState([
    {
      word: "",
    },
  ])

  const highlight = [1]

  const generateRandomString = (length = 6) =>
    Math.random().toString(20).substr(2, length)

  const files: files = {
    "Johnny Silverhand": {
      "Text 1": "Hello, World",
      "Text 2": "Bye, World",
    },
    "Geralt of Rivia": {
      "Text 3": "Some other text",
    },
  }

  const getDefinition = async (word: string) => {
    setSelectedWord(word)
    const { body } = await get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    )
    body && setDefinition(body)
  }

  return (
    <div className="grid h-screen grid-cols-10 grid-rows-20">
      {/* Header */}
      <div className="flex items-center justify-between row-span-1 px-4 col-span-full">
        <p className="text-sm font-light">Authorship Attribution System</p>
        <svg
          className="w-8 h-8 p-1 font-bold transition duration-300 ease-in-out rounded-full hover:bg-purple-500 hover:text-gray-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      {/* File Preview */}
      <div className="col-span-2 p-4 bg-gray-200 row-span-19">
        <ul>
          <li>
            {Object.keys(files).map((author: string) => {
              return (
                <div key={generateRandomString()}>
                  <p className="p-1 font-semibold select-none">{author}</p>
                  <div className="border-l border-gray-400">
                    {Object.keys(files[author]).map((title: string) => {
                      return (
                        <p
                          className="p-1 transition duration-100 ease-in-out cursor-pointer select-none hover:bg-gray-400 active:bg-gray-600"
                          key={generateRandomString()}
                          onClick={() =>
                            setSelectedText({
                              selectedAuthor: author,
                              selectedTitle: title,
                            })
                          }
                        >
                          {title}
                        </p>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </li>
        </ul>
      </div>
      {/* Corpus */}
      <div className="grid col-span-6 row-span-19 grid-rows-10">
        <p className="px-8 py-4 overflow-y-auto bg-gray-100 row-span-8">
          {/* {files?.[selectedAuthor]?.[selectedTitle] || ""} */}
          {"Hello World".split(" ").map((word: string, idx: number) => {
            return highlight.includes(idx) ? (
              <span
                className="text-red-600 transition duration-300 ease-in-out cursor-pointer hover:text-gray-100 hover:bg-red-600 p-0.5"
                onClick={() => getDefinition(word)}
                key={generateRandomString()}
              >
                {word}{" "}
              </span>
            ) : (
              <span key={generateRandomString()}>{word} </span>
            )
          })}
        </p>
        <div className="row-span-2 p-4 bg-gray-300">
          <p>{selectedWord}</p>
          <p>
            {definition &&
              definition[0].meanings &&
              definition[0].meanings[0]?.partOfSpeech}
          </p>
        </div>
      </div>
      {/* Statistics */}
      <div className="col-span-2 p-4 bg-gray-200 row-span-19">Statistics</div>
    </div>
  )
}

export default Index
