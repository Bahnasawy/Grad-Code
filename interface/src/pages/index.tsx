import React, { useState } from "react"
import { get } from "superagent"
import Definition from "../components/definition"
import FileExplorer from "../components/fileExplorer"
import TextViewer from "../components/textViewer"
import Header from "../components/header"

const Index = () => {
  const [{ selectedAuthor, selectedTitle }, setSelectedText] = useState({
    selectedAuthor: "",
    selectedTitle: "",
  })
  const [definition, setDefinition]: [definition, Function] = useState()
  const [hover, setHover]: [number | undefined, Function] = useState()
  const [selectedFeature, setSelectedFeature]: [
    string | undefined,
    Function
  ] = useState()

  const generateRandomString = (length = 6) =>
    Math.random().toString(20).substr(2, length)

  const files: files = {
    "Johnny Silverhand": {
      "Text 1": {
        content: "Hello, my Name is Yousef, and I an an Engineer.",
        highlight: { "Marked Theme": [4, 9], "Unmarked Theme": [0, 1] },
      },
    },
  }

  const features: features = {
    "Unmarked Theme": {
      "Johnny Silverhand": 22,
    },
    "Marked Theme": {
      "Johnny Silverhand": 23,
    },
    Disputed: {
      "Johnny Silverhand": 12,
    },
  }

  const getDefinition = async (word: string) => {
    get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(({ body }) => {
        setDefinition(body)
      })
      .catch((e) =>
        setDefinition([
          { word: "Word not in dictionary", meanings: [], phonetics: [] },
        ])
      )
  }

  return (
    <div className="grid h-screen grid-cols-10 grid-rows-20">
      {/* Header */}
      <Header />
      {/* File Preview */}
      <div className="col-span-2 p-4 bg-gray-200 row-span-19">
        <p className="font-bold">File Explorer</p>
        <FileExplorer {...{ setSelectedText, files, generateRandomString }} />
      </div>
      {/* Corpus */}
      <div className="grid col-span-6 row-span-19 grid-rows-10">
        <TextViewer
          {...{
            files,
            selectedAuthor,
            selectedTitle,
            generateRandomString,
            getDefinition,
            setHover,
            hover,
            selectedFeature,
          }}
        />
        <div className="row-span-2 p-4 bg-gray-300">
          <Definition definition={definition} />
        </div>
      </div>
      {/* Statistics */}
      <div className="col-span-2 p-4 bg-gray-200 row-span-19">
        <p className="font-bold">Statistics</p>
        <ul>
          <li>
            {Object.keys(features).map((feature: string) => {
              return (
                <div key={generateRandomString()}>
                  <p
                    className="p-1 text-sm font-semibold transition duration-100 ease-in-out cursor-pointer select-none hover:bg-gray-400 active:bg-gray-600"
                    onClick={() => setSelectedFeature(feature)}
                  >
                    {feature}
                  </p>
                  <div className="ml-1 border-l border-gray-400">
                    {Object.keys(features[feature]).map((author: string) => {
                      return (
                        <p
                          className="p-1 text-xs select-none"
                          key={generateRandomString()}
                        >
                          {author}: {features[feature][author]}%
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
    </div>
  )
}

export default Index
