import React, { useState, useEffect } from "react"
import { get } from "superagent"
import Definition from "../components/definition"
import FileExplorer from "../components/fileExplorer"
import TextViewer from "../components/textViewer"
import Header from "../components/header"
import Statistics from "../components/statistics"

const Index = () => {
  const [{ selectedAuthor, selectedTitle }, setSelectedText] = useState({
    selectedAuthor: "",
    selectedTitle: "",
  })
  const [definition, setDefinition]: [definition, Function] = useState()
  const [analysis, setAnalysis]: [files, Function] = useState(undefined)
  const [hover, setHover]: [number | undefined, Function] = useState()
  const [selectedFeature, setSelectedFeature]: [
    string | undefined,
    Function
  ] = useState()

  useEffect(() => {
    ;(async () => {
      const res = await get("http://localhost:5000")
      console.log(JSON.parse(res.text))
      setAnalysis(JSON.parse(res.text))
    })()
  }, [])

  const generateRandomString = (length = 6) =>
    Math.random().toString(20).substr(2, length)

  const features: features = {
    "Unmarked Theme": {
      "Johnny Silverhand": 22,
      "William Shakespeare": 26,
    },
    "Marked Theme": {
      "Johnny Silverhand": 23,
      "William Shakespeare": 32,
    },
    Disputed: {
      "Johnny Silverhand": 12,
      "William Shakespeare": 36,
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

  if (analysis && analysis["Johnny Silverhand"]) {
    return (
      <div className="grid h-screen grid-cols-10 grid-rows-20">
        <Header />
        <div className="col-span-2 p-4 bg-gray-200 row-span-19">
          <p className="font-bold">File Explorer</p>
          <FileExplorer
            {...{ setSelectedText, analysis, generateRandomString }}
          />
        </div>
        <div className="grid col-span-6 row-span-19 grid-rows-10">
          <TextViewer
            {...{
              analysis,
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
        <div className="col-span-2 p-4 bg-gray-200 row-span-19">
          <p className="font-bold">Statistics</p>
          <Statistics
            {...{
              features,
              generateRandomString,
              setSelectedFeature,
            }}
          />
        </div>
      </div>
    )
  } else {
    return <p></p>
  }
}

export default Index
